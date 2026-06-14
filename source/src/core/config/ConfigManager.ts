interface ISheetRawData {
	/** excel 名字 */
	table: string;
	/** sheet 名字 */
	sheet: string;
	/** sheet meta 信息 */
	meta: {
		/** 四种类型：唯一、无键、分组、KV对 */
		category: "unique" | "nokey" | "group" | "kv";
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

const ARRAY_METHODS = [
	"forEach", "filter", "find", "every", "findIndex", "includes",
	"indexOf", "lastIndexOf", "map", "reduce", "slice", "some",
];

@SingletonClass
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
	readonly marathon: ITable_Marathon;
	readonly match_shilian: ITable_MatchShilian;
	readonly misc_function: ITable_MiscFunction;
	readonly mmo: ITable_Mmo;
	readonly outfit_config: ITable_OutfitConfig;
	readonly quest_crew: ITable_QuestCrew;
	readonly rank_introduce: ITable_RankIntroduce;
	readonly season: ITable_Season;
	readonly shoot: ITable_Shoot;
	readonly shops: ITable_Shops;
	readonly simulation: ITable_Simulation;
	readonly snowball: ITable_Snowball;
	readonly spot: ITable_Spot;
	readonly str: ITable_Str;
	readonly tournament: ITable_Tournament;
	readonly tutorial: ITable_Tutorial;
	readonly vip: ITable_Vip;
	readonly voice: ITable_Voice;
	//#endregion

	async init() {
		const [tblPbCfg, lqcBin] = await Promise.all([
			$loadMgr.fetch(ResPath.EConfigPath.Tbl_pbConfig, Laya.Loader.TEXT),
			$loadMgr.fetch(ResPath.EConfigPath.Lqc, Laya.Loader.BUFFER)
		]);

		const bytes = new Laya.Byte(lqcBin);
		const rawData = this.parseConfig(tblPbCfg, bytes.readUint8Array(0, bytes.length));

		const sheetProto = {};
		for (const method of ARRAY_METHODS) {
			sheetProto[method] = function (...args: any[]) {
				return (this.groups || this.rows)[method](...args);
			};
		}
		$gameUtil.freeze(sheetProto);

		for (const sheet of rawData) {
			const { table, sheet: sheetName, meta, rows } = sheet;
			const { category, key } = meta;

			// 确保表对象存在
			const tableObj = this[table] || (this[table] = {});

			// 创建原型对象，承载 Array 方法和原始 rows
			const proto: any = Object.create(sheetProto);
			proto.rows = rows;
			const groups: any[][] = category === "group" ? (proto.groups = []) : null;

			const configSheet = Object.create(proto);

			// 索引逻辑优化
			switch (category) {
				case "unique":
					// 如果 key 是数字，排序后再索引
					rows.sort((a, b) => (a[key] || 0) - (b[key] || 0));
					for (const row of rows) configSheet[row[key]] = row;
					break;
				case "group":
					for (const row of rows) {
						const groupKey = row[key];
						if (!configSheet[groupKey]) {
							configSheet[groupKey] = [];
							groups.push(configSheet[groupKey]);
						}
						configSheet[groupKey].push(row);
					}
					break;
				case "kv":
				case "nokey":
					for (const row of rows) {
						const rowKey = row[key];
						if (rowKey !== undefined) configSheet[rowKey] = row;
					}
					break;
			}

			tableObj[sheetName] = configSheet;

			$gameUtil.freeze(proto);
		}
		$gameUtil.freeze(this);
	}

	private parseConfig(protoContent: string, bindata: Uint8Array) {
		const dataProto = $gameUtil.freeze({
			langField(name) {
				return this[name + "_" + $gameMgr.language];
			},
		}) as ISheetDataBase;

		const root = protobuf.parse(protoContent, { keepCase: true }).root;
		const ConfigTables = root.lookupType("lq.config.ConfigTables");
		const configTables = ConfigTables.decode(bindata) as any;

		// 1. 建立数据查询 Map，避免嵌套循环查询
		const dataMap = new Map<string, any[]>();
		for (const d of configTables.datas) {
			dataMap.set(`${ d.table }_${ d.sheet }`, d.data);
		}

		const result: ISheetRawData[] = [];

		// 2. 遍历 Schema 一次性完成类型注册和解析
		for (const tableSchema of configTables.schemas) {
			const tableName = tableSchema.name;

			for (const sheetSchema of tableSchema.sheets) {
				const sheetName = sheetSchema.name;
				const className = `${ tableName }_${ sheetName }`;

				// 动态构建 Protobuf 类型
				const MessageClass = new protobuf.Type(className);
				for (const field of sheetSchema.fields) {
					MessageClass.add(new protobuf.Field(
						field.field_name,
						field.pb_index,
						field.pb_type,
						field.array_length > 0 ? "repeated" : "optional"
					));
				}
				root.add(MessageClass);

				// 解码数据
				const rawBinRows = dataMap.get(className) || [];
				const decodedRows = rawBinRows.map(bin => {
					const d = $decodeProtoData(MessageClass.decode(bin));
					Object.setPrototypeOf(d, dataProto);
					return d;
				});

				// 组装最终结构
				result.push({
					table: tableName,
					sheet: sheetName,
					meta: sheetSchema.meta,
					header: sheetSchema.fields.map((f: any) => ({
						field_name: f.field_name,
						array_length: f.array_length,
						pb_type: f.pb_type
					})),
					rows: decodedRows
				});
			}
		}

		return result;
	}
}