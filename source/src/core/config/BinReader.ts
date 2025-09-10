type SheetCategory = 'unique' // 主键唯一
    | 'nokey' // 无主键
    | 'group' // 分组
    | 'kv'; // key-value对



interface ISheetSchemaMeta {
    key: string; // 主键名字
    category: SheetCategory; // sheet的类别
}
interface ISheetSchemaField {
    field_name: string;
    pb_type: string;
    array_length: number;
    comment: string;
}
interface ISheetSchemaMiniField {
    field_name: string;
    pb_type: string;
    array_length: number;
}

class SheetSchema {
    table: string; // 表名
    sheet: string;
    meta: ISheetSchemaMeta;
    fields: ISheetSchemaField[];
    kvs: string[]; // key-value 的 key值列表

    mini_info() {
        return {
            table: this.table,
            sheet: this.sheet,
            meta: this.meta,
            fields: this.fields.map(f => {
                return { field_name: f.field_name, pb_type: f.pb_type, array_length: f.array_length }
            }),
            kvs: this.kvs
        }
    }
}



class TableSchema {
    name: string;
    sheets: SheetSchema[];
    constructor(name: string) {
        this.name = name;
        this.sheets = [];
    }
}

type SheetData = any[];

class TableData {
    name: string;
    sheets: { [name: string]: SheetData }
    constructor(name: string) {
        this.name = name;
        this.sheets = {};
    }
}


export class BinParser {
    private root: protobuf.Root;
    private schemas: TableSchema[];
    private datas: TableData[];

    constructor() {
        this.root = new protobuf.Root();
        this.schemas = [];
        this.datas = [];
    }

    static pb_classname(table, sheet) {
        return `${ table }_${ sheet }`;
    }

    /**
     * 解析bin文件接口
     * @param protoContent proto内容
     * @param bindata bin内容
     */
    parseSync(protoContent: string, bindata) {
        this.root = protobuf.parse(protoContent, { keepCase: true }).root;

        // this.root.resolveAll();

        const ConfigTables = this.root.lookupType('lq.config.ConfigTables');

        let configTables: any = ConfigTables.decode(bindata);

        let tableSchemas: any = configTables.schemas;

        // console.log(JSON.stringify(configTables, null, 2));

        // 根据sheet类名查找sheetSchema对象
        let sheetSchemaByClassname: any = {};

        // 解析Protobuf结构
        for (let tableSchema of tableSchemas) {
            let tablename = tableSchema.name;

            for (let sheetSchema of tableSchema.sheets) {
                let sheetname = sheetSchema.name;

                // protobuf Message Class
                let classname = BinParser.pb_classname(tablename, sheetname);
                sheetSchemaByClassname[classname] = sheetSchema;

                const MessageClass = new protobuf.Type(classname);

                for (let field of sheetSchema.fields) {
                    let rule = field.array_length > 0 ? 'repeated' : 'optional';
                    const FieldClass = new protobuf.Field(field.field_name, field.pb_index, field.pb_type, rule);
                    MessageClass.add(FieldClass);
                }

                this.root.add(MessageClass);
            }
        }

        let dataByClassname: any = {};
        for (let sheetData of configTables.datas) {
            let tablename = sheetData.table;
            let sheetname = sheetData.sheet;
            let classname = BinParser.pb_classname(tablename, sheetname);

            const MessageClass = this.root.lookupType(classname);
            if (!MessageClass)
                continue;

            let binSheetSchema = sheetSchemaByClassname[classname];
            if (!binSheetSchema)
                continue;

            if (!dataByClassname[classname])
                dataByClassname[classname] = [];

            for (let data of sheetData.data) {
                dataByClassname[classname].push(MessageClass.decode(data));
            }

        }

        // 解析 TableSchema

        for (let tableSchema of tableSchemas) {
            let tablename = tableSchema.name;

            let table = new TableSchema(tablename);
            this.schemas.push(table);

            for (let sheetSchema of tableSchema.sheets) {
                let sheetname = sheetSchema.name;
                let classname = BinParser.pb_classname(tablename, sheetname);

                // SheetSchema
                let sheet = new SheetSchema();
                sheet.table = tablename;
                sheet.sheet = sheetname;
                sheet.meta = sheetSchema.meta;
                sheet.fields = sheetSchema.fields.map(f => {
                    return {
                        field_name: f.field_name,
                        array_length: f.array_length,
                        pb_type: f.pb_type,
                        comment: null
                    };
                });

                if (sheet.meta.category === 'kv') {
                    let kvdata: any[] = dataByClassname[classname];
                    if (kvdata) {
                        sheet.kvs = kvdata.map(d => d[sheet.meta.key]);
                    }
                }

                table.sheets.push(sheet);
            }
        }

        // console.log(JSON.stringify(this.schemas, null, 2));

        // 解析 TableData

        for (let tableSchema of tableSchemas) {
            let tablename = tableSchema.name;

            let table = new TableData(tablename);
            this.datas.push(table);

            for (let sheetSchema of tableSchema.sheets) {
                let sheetname = sheetSchema.name;
                let classname = BinParser.pb_classname(tablename, sheetname);

                table[sheetname] = dataByClassname[classname];
            }
        }

        // console.log(JSON.stringify(this.datas, null, 2));
    }

    exportSchema() {
        return this.schemas;
    }

    exportData() {
        return this.datas;
    }
}


export class TSDataFormat {
    private schema: KeyMap<TableSchema>;
    private data: KeyMap<TableData>;

    constructor(tables: TableSchema[], datas: TableData[]) {
        this.schema = {};
        this.data = {};
        tables.forEach(t => { this.schema[t.name] = t; });
        datas.forEach(d => { this.data[d.name] = d; });
    }

    toFormat() {
        const self = this;
        const sheetRawData: SheetRawData[] = [];
        Object.keys(this.schema).forEach(name => {
            const tableSchema = self.schema[name];
            const tableData = self.data[name];
            if (!tableData) return;
            tableSchema.sheets.forEach(sheetSchema => {
                const rawData = {
                    table: sheetSchema.table,
                    sheet: sheetSchema.sheet,
                    meta: sheetSchema.meta,
                    header: sheetSchema.fields.map(f => {
                        return {
                            field_name: f.field_name,
                            array_length: f.array_length,
                            pb_type: f.pb_type
                        }
                    }),
                    rows: tableData[sheetSchema.sheet]
                };
                sheetRawData.push(rawData);
            });
        });
        return sheetRawData;
    }
}
