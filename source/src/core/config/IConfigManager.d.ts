declare interface IConfigManager {
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
	init(): Promise<void>;
}


type CfgFieldType<T> = { [P in keyof T]: T[P] }[keyof T];
interface CfgExtension<T> {
	rows: CfgFieldType<T>[];
	forEach(callbackfn: (value: CfgFieldType<T>, index: number, array: CfgFieldType<T>[]) => void, thisArg?: any): void;
	filter(predicate: (value: CfgFieldType<T>, index: number, array: CfgFieldType<T>[]) => boolean, thisArg?: any): CfgFieldType<T>[];
	find(predicate: (value: CfgFieldType<T>, index: number, array: CfgFieldType<T>[]) => boolean, thisArg?: any): CfgFieldType<T>;
	every(predicate: (value: CfgFieldType<T>, index: number, array: CfgFieldType<T>[]) => boolean, thisArg?: any): boolean;
	findIndex(predicate: (value: CfgFieldType<T>, index: number, obj: CfgFieldType<T>[]) => boolean, thisArg?: any): number;
	includes(searchElement: CfgFieldType<T>, fromIndex?: number): boolean;
	indexOf(searchElement: CfgFieldType<T>, fromIndex?: number): number;
	lastIndexOf(searchElement: CfgFieldType<T>, fromIndex?: number): number;
	map<U>(callbackfn: (value: CfgFieldType<T>, index: number, array: CfgFieldType<T>[]) => U, thisArg?: any): U[];
	reduce<U>(callbackfn: (previousValue: U, currentValue: CfgFieldType<T>, currentIndex: number, array: CfgFieldType<T>[]) => U, initialValue: U): U;
	slice(start?: number, end?: number): CfgFieldType<T>[];
	some(predicate: (value: CfgFieldType<T>, index: number, array: CfgFieldType<T>[]) => boolean, thisArg?: any): boolean;
}
type CfgExt<T> = { [P in keyof T]: T[P] } & CfgExtension<T>;