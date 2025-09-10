import { BinParser, TSDataFormat } from "./BinReader";

abstract class Sheet<T> {
    protected _rows: T[];
    constructor(rows: T[]) {
        this._rows = rows || [];
    }

    forEach(each: (value: T, index: number, array: T[]) => void) {
        this._rows.forEach(each);
    }
}

class UniqueSheet<T> extends Sheet<T> implements IUniqueSheet<T> {
    private _map: KeyMap<T>;

    constructor(rows: T[], keyName: string) {
        super(rows);
        this._map = {};

        rows.sort((a, b) => a[keyName] - b[keyName]);
        rows.forEach(row => (this._map[row[keyName]] = row));
    }

    get(id: string | number) { return this._map[id]; }
    find(id: string | number) { return this._map[id]; }
}

class NoKeySheet<T> extends Sheet<T> implements INoKeySheet<T> { }

class GroupSheet<T> extends Sheet<T> implements IGroupSheet<T> {
    private _groups: KeyMap<T[]>;

    constructor(rows: T[], keyName: string) {
        super(rows);
        this._groups = {};

        this._rows.forEach(row => {
            const key = row[keyName];
            if (!this._groups[key])
                this._groups[key] = [];
            const group = this._groups[key];
            group.push(row);
        });
    }

    getGroup(id: string | number) { return this._groups[id]; }
    findGroup(id: string | number) { return this._groups[id]; }
    forEachGroup(eachGroup: (values: T[], groupKey: number | string) => void) {
        Object.keys(this._groups).forEach((key) => {
            eachGroup(this._groups[key], key);
        });
    }
}

export class ConfigManager implements ICfgManager {
    //#region tables
    readonly ab_match: Table_AbMatch;
    readonly achievement: Table_Achievement;
    readonly activity: Table_Activity;
    readonly amulet: Table_Amulet;
    readonly animation: Table_Animation;
    readonly audio: Table_Audio;
    readonly character: Table_Character;
    readonly chest: Table_Chest;
    readonly compose: Table_Compose;
    readonly contest: Table_Contest;
    readonly desktop: Table_Desktop;
    readonly events: Table_Events;
    readonly exchange: Table_Exchange;
    readonly fan: Table_Fan;
    readonly fandesc: Table_Fandesc;
    readonly game_live: Table_GameLive;
    readonly global: Table_Global;
    readonly info: Table_Info;
    readonly item_definition: Table_ItemDefinition;
    readonly leaderboard: Table_Leaderboard;
    readonly level_definition: Table_LevelDefinition;
    readonly mail: Table_Mail;
    readonly mall: Table_Mall;
    readonly match_shilian: Table_MatchShilian;
    readonly misc_function: Table_MiscFunction;
    readonly outfit_config: Table_OutfitConfig;
    readonly rank_introduce: Table_RankIntroduce;
    readonly season: Table_Season;
    readonly shoot: Table_Shoot;
    readonly shops: Table_Shops;
    readonly simulation: Table_Simulation;
    readonly spot: Table_Spot;
    readonly str: Table_Str;
    readonly tournament: Table_Tournament;
    readonly tutorial: Table_Tutorial;
    readonly vip: Table_Vip;
    readonly voice: Table_Voice;
    //#endregion

    async loadCfg() {
        const tblPbCfg = await loadMgr.fetch(ResPath.ConfigPath.Tbl_pbConfig, "text");
        const lqcBin = await loadMgr.fetch(ResPath.ConfigPath.Lqc, "arraybuffer");

        const bytes = new Laya.Byte();
        bytes.writeArrayBuffer(lqcBin);

        const parser = new BinParser();
        parser.parseSync(tblPbCfg, bytes.readUint8Array(0, bytes.length));

        const format = new TSDataFormat(parser.exportSchema(), parser.exportData());
        format.toFormat().forEach(sheet => {
            if (!this[sheet.table])
                this[sheet.table] = {};

            const rows = [];
            sheet.rows.forEach(row => {
                const tsrow = {};
                sheet.header.forEach(field => {
                    tsrow[field.field_name] = row[field.field_name];
                });
                rows.push(tsrow);
            });

            let configSheet = null;
            switch (sheet.meta.category) {
                case 'unique':
                    configSheet = new UniqueSheet(rows, sheet.meta.key);
                    break;
                case 'nokey':
                    configSheet = new NoKeySheet(rows);
                    break;
                case 'group':
                    configSheet = new GroupSheet(rows, sheet.meta.key);
                    break;
                case 'kv':
                    configSheet = {};
                    rows.forEach(row => {
                        let key = row[sheet.meta.key];
                        configSheet[key] = row;
                    });
                    break;
            }

            if (configSheet)
                this[sheet.table][sheet.sheet] = configSheet;
        });
    }
}