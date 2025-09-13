declare interface ITable_Animation {
	animation: ISheet_Animation_Animation;
}

//#region animation --- unique
declare interface ISheet_Animation_Animation {
	rows: ISheetData_Animation_Animation[];
	1000101: ISheetData_Animation_Animation;
	1000102: ISheetData_Animation_Animation;
	1000103: ISheetData_Animation_Animation;
	1000104: ISheetData_Animation_Animation;
	1000105: ISheetData_Animation_Animation;
	1000201: ISheetData_Animation_Animation;
	1000202: ISheetData_Animation_Animation;
	1000203: ISheetData_Animation_Animation;
	1000204: ISheetData_Animation_Animation;
	1000205: ISheetData_Animation_Animation;
	1000301: ISheetData_Animation_Animation;
	1000302: ISheetData_Animation_Animation;
	1000303: ISheetData_Animation_Animation;
	1000304: ISheetData_Animation_Animation;
	1000305: ISheetData_Animation_Animation;
	1000401: ISheetData_Animation_Animation;
	1000402: ISheetData_Animation_Animation;
	1000403: ISheetData_Animation_Animation;
	1000404: ISheetData_Animation_Animation;
	1000405: ISheetData_Animation_Animation;
	1000501: ISheetData_Animation_Animation;
	1000502: ISheetData_Animation_Animation;
	1000503: ISheetData_Animation_Animation;
	1000504: ISheetData_Animation_Animation;
	1000505: ISheetData_Animation_Animation;
	1000601: ISheetData_Animation_Animation;
	1000602: ISheetData_Animation_Animation;
	1000603: ISheetData_Animation_Animation;
	1000604: ISheetData_Animation_Animation;
	1000605: ISheetData_Animation_Animation;
	1000701: ISheetData_Animation_Animation;
	1000702: ISheetData_Animation_Animation;
	1000703: ISheetData_Animation_Animation;
	1000704: ISheetData_Animation_Animation;
	1000705: ISheetData_Animation_Animation;
	1000801: ISheetData_Animation_Animation;
	1000802: ISheetData_Animation_Animation;
	1000803: ISheetData_Animation_Animation;
	1000804: ISheetData_Animation_Animation;
	1000805: ISheetData_Animation_Animation;
	1000901: ISheetData_Animation_Animation;
	1000902: ISheetData_Animation_Animation;
	1000903: ISheetData_Animation_Animation;
	1000904: ISheetData_Animation_Animation;
	1000905: ISheetData_Animation_Animation;
	1001001: ISheetData_Animation_Animation;
	1001002: ISheetData_Animation_Animation;
	1001003: ISheetData_Animation_Animation;
	1001004: ISheetData_Animation_Animation;
	1001005: ISheetData_Animation_Animation;
	1001101: ISheetData_Animation_Animation;
	1001102: ISheetData_Animation_Animation;
	1001103: ISheetData_Animation_Animation;
	1001104: ISheetData_Animation_Animation;
	1001105: ISheetData_Animation_Animation;
	1001201: ISheetData_Animation_Animation;
	1001202: ISheetData_Animation_Animation;
	1001203: ISheetData_Animation_Animation;
	1001204: ISheetData_Animation_Animation;
	1001205: ISheetData_Animation_Animation;
	1001301: ISheetData_Animation_Animation;
	1001302: ISheetData_Animation_Animation;
	1001303: ISheetData_Animation_Animation;
	1001304: ISheetData_Animation_Animation;
	1001305: ISheetData_Animation_Animation;
	1001401: ISheetData_Animation_Animation;
	1001402: ISheetData_Animation_Animation;
	1001403: ISheetData_Animation_Animation;
	1001404: ISheetData_Animation_Animation;
	1001405: ISheetData_Animation_Animation;
	1001501: ISheetData_Animation_Animation;
	1001502: ISheetData_Animation_Animation;
	1001503: ISheetData_Animation_Animation;
	1001504: ISheetData_Animation_Animation;
	1001505: ISheetData_Animation_Animation;
	1001601: ISheetData_Animation_Animation;
	1001602: ISheetData_Animation_Animation;
	1001603: ISheetData_Animation_Animation;
	1001604: ISheetData_Animation_Animation;
	1001605: ISheetData_Animation_Animation;
	1001701: ISheetData_Animation_Animation;
	1001702: ISheetData_Animation_Animation;
	1001703: ISheetData_Animation_Animation;
	1001704: ISheetData_Animation_Animation;
	1001705: ISheetData_Animation_Animation;
	1001801: ISheetData_Animation_Animation;
	1001802: ISheetData_Animation_Animation;
	1001803: ISheetData_Animation_Animation;
	1001804: ISheetData_Animation_Animation;
	1001805: ISheetData_Animation_Animation;
	1001901: ISheetData_Animation_Animation;
	1001902: ISheetData_Animation_Animation;
	1001903: ISheetData_Animation_Animation;
	1001904: ISheetData_Animation_Animation;
	1001905: ISheetData_Animation_Animation;
}
declare interface ISheetData_Animation_Animation {
	id: number;
	name: string;
	type: string;
	/** 总时长 */
	lifetime: number;
	/** 播放速度 */
	speed: number;
	/** 关键帧的时间 */
	keypoint: number[];
}
//#endregion