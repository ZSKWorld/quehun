/** This script is generated automatically, Please do not any modify! */

declare interface ITable_Mail {
	/** 邮件模板  ---  unique */
	readonly mail_template: CfgExt<ISheet_Mail_MailTemplate>;
}

//#region mail_template
declare interface ISheet_Mail_MailTemplate {
	readonly [key: string]: ISheetData_Mail_MailTemplate;
	readonly 101: ISheetData_Mail_MailTemplate;
	readonly 102: ISheetData_Mail_MailTemplate;
	readonly 103: ISheetData_Mail_MailTemplate;
	readonly 104: ISheetData_Mail_MailTemplate;
	readonly 105: ISheetData_Mail_MailTemplate;
	readonly 106: ISheetData_Mail_MailTemplate;
	readonly 107: ISheetData_Mail_MailTemplate;
	readonly 108: ISheetData_Mail_MailTemplate;
	readonly 109: ISheetData_Mail_MailTemplate;
	readonly 110: ISheetData_Mail_MailTemplate;
	readonly 111: ISheetData_Mail_MailTemplate;
	readonly 112: ISheetData_Mail_MailTemplate;
	readonly 113: ISheetData_Mail_MailTemplate;
	readonly 114: ISheetData_Mail_MailTemplate;
	readonly 115: ISheetData_Mail_MailTemplate;
	readonly 116: ISheetData_Mail_MailTemplate;
	readonly 117: ISheetData_Mail_MailTemplate;
	readonly 118: ISheetData_Mail_MailTemplate;
	readonly 119: ISheetData_Mail_MailTemplate;
	readonly 120: ISheetData_Mail_MailTemplate;
	readonly 121: ISheetData_Mail_MailTemplate;
	readonly 122: ISheetData_Mail_MailTemplate;
	readonly 123: ISheetData_Mail_MailTemplate;
	readonly 124: ISheetData_Mail_MailTemplate;
	readonly 125: ISheetData_Mail_MailTemplate;
	readonly 126: ISheetData_Mail_MailTemplate;
	readonly 127: ISheetData_Mail_MailTemplate;
	readonly 128: ISheetData_Mail_MailTemplate;
	readonly 129: ISheetData_Mail_MailTemplate;
	readonly 130: ISheetData_Mail_MailTemplate;
	readonly 131: ISheetData_Mail_MailTemplate;
	readonly 132: ISheetData_Mail_MailTemplate;
	readonly 133: ISheetData_Mail_MailTemplate;
	readonly 134: ISheetData_Mail_MailTemplate;
	readonly 135: ISheetData_Mail_MailTemplate;
	readonly 136: ISheetData_Mail_MailTemplate;
	readonly 137: ISheetData_Mail_MailTemplate;
	readonly 138: ISheetData_Mail_MailTemplate;
	readonly 139: ISheetData_Mail_MailTemplate;
	readonly 140: ISheetData_Mail_MailTemplate;
	readonly 141: ISheetData_Mail_MailTemplate;
	readonly 142: ISheetData_Mail_MailTemplate;
	readonly 143: ISheetData_Mail_MailTemplate;
	readonly 144: ISheetData_Mail_MailTemplate;
	readonly 145: ISheetData_Mail_MailTemplate;
	readonly 10001: ISheetData_Mail_MailTemplate;
	readonly 10002: ISheetData_Mail_MailTemplate;
	readonly 10003: ISheetData_Mail_MailTemplate;
	readonly 10004: ISheetData_Mail_MailTemplate;
	readonly 10005: ISheetData_Mail_MailTemplate;
	readonly 10006: ISheetData_Mail_MailTemplate;
	readonly 10007: ISheetData_Mail_MailTemplate;
	readonly 10008: ISheetData_Mail_MailTemplate;
	readonly 10009: ISheetData_Mail_MailTemplate;
	readonly 10010: ISheetData_Mail_MailTemplate;
}
declare interface ISheetData_Mail_MailTemplate extends ISheetDataBase {
	/** 邮件模板ID */
	readonly id: number;
	/** 标题 */
	readonly title: string;
	readonly title_chs: string;
	readonly title_chs_t: string;
	readonly title_jp: string;
	readonly title_en: string;
	readonly title_kr: string;
	/** 正文模板 */
	readonly content_template: string;
	readonly content_template_chs: string;
	readonly content_template_chs_t: string;
	readonly content_template_jp: string;
	readonly content_template_en: string;
	readonly content_template_kr: string;
	/** 过期类型 */
	readonly expire_type: number;
	/** 过期参数 */
	readonly expire_param: string;
	/** 附件列表 */
	readonly attachments: string[];
}
//#endregion