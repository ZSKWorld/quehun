interface SheetRawData {
    /** excel 名字 */
    table: string;
    /** sheet 名字 */
    sheet: string;
    /** sheet meta 信息 */
    meta: {
        /** 四种类型：唯一、无键、分组、KV对 */
        category: 'unique' | 'nokey' | 'group' | 'kv';
        key: string;
    };
    /** sheet 结构信息 */
    header: {
        field_name: string;
        array_length: number;
        pb_type: string;
    }[];
    /** sheet 行数据 */
    rows: any[];
}

export class ConfigManager implements IConfigManager {
    //#region tables
    readonly ab_match: ITable_AbMatch;
    readonly achievement: ITable_Achievement;
    readonly activity: ITable_Activity;
    readonly amulet: ITable_Amulet;
    readonly animation: ITable_Animation;
    readonly audio: ITable_Audio;
    readonly character: ITable_Character;
    readonly chest: ITable_Chest;
    readonly compose: ITable_Compose;
    readonly contest: ITable_Contest;
    readonly desktop: ITable_Desktop;
    readonly events: ITable_Events;
    readonly exchange: ITable_Exchange;
    readonly fan: ITable_Fan;
    readonly fandesc: ITable_Fandesc;
    readonly game_live: ITable_GameLive;
    readonly global: ITable_Global;
    readonly info: ITable_Info;
    readonly item_definition: ITable_ItemDefinition;
    readonly leaderboard: ITable_Leaderboard;
    readonly level_definition: ITable_LevelDefinition;
    readonly mail: ITable_Mail;
    readonly mall: ITable_Mall;
    readonly match_shilian: ITable_MatchShilian;
    readonly misc_function: ITable_MiscFunction;
    readonly outfit_config: ITable_OutfitConfig;
    readonly rank_introduce: ITable_RankIntroduce;
    readonly season: ITable_Season;
    readonly shops: ITable_Shops;
    readonly simulation: ITable_Simulation;
    readonly spot: ITable_Spot;
    readonly str: ITable_Str;
    readonly tournament: ITable_Tournament;
    readonly tutorial: ITable_Tutorial;
    readonly vip: ITable_Vip;
    readonly voice: ITable_Voice;
    //#endregion

    async init() {
        const tblPbCfg = await loadMgr.fetch(ResPath.ConfigPath.Tbl_pbConfig, "text");
        const lqcBin = await loadMgr.fetch(ResPath.ConfigPath.Lqc, "arraybuffer");

        const bytes = new Laya.Byte(lqcBin);
        const rawData = this.parseConfig(tblPbCfg, bytes.readUint8Array(0, bytes.length))
        rawData.forEach(sheet => {
            if (!this[sheet.table]) this[sheet.table] = {};

            const rows = [];
            sheet.rows.forEach(row => {
                const tsrow = {};
                sheet.header.forEach(field => {
                    tsrow[field.field_name] = row[field.field_name];
                });
                rows.push(tsrow);
            });

            const keyName = sheet.meta.key;

            const configSheet = {};
            switch (sheet.meta.category) {
                case 'unique':
                    rows.sort((a, b) => a[keyName] - b[keyName]);
                    rows.forEach(row => (configSheet[row[keyName]] = row));
                    break;
                case 'nokey': break;
                case 'group':
                    rows.forEach(row => {
                        const key = row[keyName];
                        if (!configSheet[key]) configSheet[key] = [];
                        const group = configSheet[key];
                        group.push(row);
                    });
                    break;
                case 'kv':
                    rows.forEach(row => (configSheet[row[sheet.meta.key]] = row));
                    break;
            }

            this[sheet.table][sheet.sheet] = configSheet;

            
            const proto = configSheet["__proto__"] = { rows };
            const defineFun = (funName: string) => {
                Object.defineProperty(proto, funName, {
                    value: function (...args) { return this.rows[funName](...args); },
                    enumerable: false,
                    configurable: false,
                });
            };
            [
                "forEach", "filter", "find", "every", "findIndex", "includes",
                "indexOf", "lastIndexOf", "map", "reduce", "slice", "some",
            ].forEach(v => defineFun(v));
        });
    }


    parseConfig(protoContent: string, bindata: Uint8Array) {
        const root = protobuf.parse(protoContent, { keepCase: true }).root;
        const ConfigTables = root.lookupType('lq.config.ConfigTables');
        const configTables: any = ConfigTables.decode(bindata);
        const tableSchemas: any = configTables.schemas;
        const sheetSchemaByClassname: any = {};
        for (const tableSchema of tableSchemas) {
            const tablename = tableSchema.name;
            for (const sheetSchema of tableSchema.sheets) {
                const sheetname = sheetSchema.name;
                const classname = `${ tablename }_${ sheetname }`;
                sheetSchemaByClassname[classname] = sheetSchema;
                const MessageClass = new protobuf.Type(classname);
                for (const field of sheetSchema.fields) {
                    const rule = field.array_length > 0 ? 'repeated' : 'optional';
                    const FieldClass = new protobuf.Field(field.field_name, field.pb_index, field.pb_type, rule);
                    MessageClass.add(FieldClass);
                }
                root.add(MessageClass);
            }
        }

        const dataByClassname: any = {};
        for (const sheetData of configTables.datas) {
            const tablename = sheetData.table;
            const sheetname = sheetData.sheet;
            const classname = `${ tablename }_${ sheetname }`;
            const MessageClass = root.lookupType(classname);
            if (!MessageClass) continue;
            const binSheetSchema = sheetSchemaByClassname[classname];
            if (!binSheetSchema) continue;
            if (!dataByClassname[classname]) dataByClassname[classname] = [];
            for (const data of sheetData.data) {
                dataByClassname[classname].push(MessageClass.decode(data));
            }
        }

        const schemas = [];
        for (const tableSchema of tableSchemas) {
            const tablename = tableSchema.name;
            const table = { name: tablename, sheets: [] };
            schemas.push(table);
            for (const sheetSchema of tableSchema.sheets) {
                const sheetname = sheetSchema.name;
                const classname = `${ tablename }_${ sheetname }`;
                const sheet = {
                    table: tablename,
                    sheet: sheetname,
                    meta: sheetSchema.meta,
                    fields: sheetSchema.fields.map(f => {
                        return {
                            field_name: f.field_name,
                            array_length: f.array_length,
                            pb_type: f.pb_type,
                            comment: null
                        };
                    }),
                    kvs: null,
                };
                if (sheet.meta.category === 'kv') {
                    const kvdata: any[] = dataByClassname[classname];
                    if (kvdata) {
                        sheet.kvs = kvdata.map(d => d[sheet.meta.key]);
                    }
                }
                table.sheets.push(sheet);
            }
        }

        const datas = [];
        for (const tableSchema of tableSchemas) {
            const tablename = tableSchema.name;
            const table = { name: tablename, sheets: null, };
            datas.push(table);
            for (const sheetSchema of tableSchema.sheets) {
                const sheetname = sheetSchema.name;
                const classname = `${ tablename }_${ sheetname }`;
                table[sheetname] = dataByClassname[classname];
            }
        }


        const schema = {};
        const data = {};
        schemas.forEach(t => { schema[t.name] = t; });
        datas.forEach(d => { data[d.name] = d; });
        const sheetRawData: SheetRawData[] = [];
        Object.keys(schema).forEach(name => {
            const tableSchema = schema[name];
            const tableData = data[name];
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