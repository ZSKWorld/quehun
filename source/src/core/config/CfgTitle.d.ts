/** This script is generated automatically, Please do not any modify! */
declare interface CfgTitle {
	readonly [key: string]: CfgTitleData;
	/** 无名小卒 */
	readonly 101: CfgTitleData;
	/** 大名鼎鼎 */
	readonly 102: CfgTitleData;
}

declare interface CfgTitleData {
	readonly id: number;
	/** 名字 */
	readonly name: string;
	/** 加成 */
	readonly addition: CfgTitleData1[];
}

declare interface CfgTitleData1 {
	readonly type: number;
	readonly value: number;
}

