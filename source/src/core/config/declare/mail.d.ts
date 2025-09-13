declare interface ITable_Mail {
	mail_template: ISheet_Mail_MailTemplate;
}

//#region mail_template --- unique
declare interface ISheet_Mail_MailTemplate {
	rows: ISheetData_Mail_MailTemplate[];
	101: ISheetData_Mail_MailTemplate;
	102: ISheetData_Mail_MailTemplate;
	103: ISheetData_Mail_MailTemplate;
	104: ISheetData_Mail_MailTemplate;
	105: ISheetData_Mail_MailTemplate;
	106: ISheetData_Mail_MailTemplate;
	107: ISheetData_Mail_MailTemplate;
	108: ISheetData_Mail_MailTemplate;
	109: ISheetData_Mail_MailTemplate;
	110: ISheetData_Mail_MailTemplate;
	111: ISheetData_Mail_MailTemplate;
	112: ISheetData_Mail_MailTemplate;
	113: ISheetData_Mail_MailTemplate;
	114: ISheetData_Mail_MailTemplate;
	115: ISheetData_Mail_MailTemplate;
	116: ISheetData_Mail_MailTemplate;
	117: ISheetData_Mail_MailTemplate;
	118: ISheetData_Mail_MailTemplate;
	119: ISheetData_Mail_MailTemplate;
	120: ISheetData_Mail_MailTemplate;
	121: ISheetData_Mail_MailTemplate;
	122: ISheetData_Mail_MailTemplate;
	123: ISheetData_Mail_MailTemplate;
	124: ISheetData_Mail_MailTemplate;
	125: ISheetData_Mail_MailTemplate;
	126: ISheetData_Mail_MailTemplate;
	127: ISheetData_Mail_MailTemplate;
	128: ISheetData_Mail_MailTemplate;
	129: ISheetData_Mail_MailTemplate;
	130: ISheetData_Mail_MailTemplate;
	131: ISheetData_Mail_MailTemplate;
}
declare interface ISheetData_Mail_MailTemplate {
	/** 邮件模板ID */
	id: number;
	/** 标题 */
	title: string;
	title_chs: string;
	title_chs_t: string;
	title_jp: string;
	title_en: string;
	title_kr: string;
	/** 正文模板 */
	content_template: string;
	content_template_chs: string;
	content_template_chs_t: string;
	content_template_jp: string;
	content_template_en: string;
	content_template_kr: string;
	/** 过期类型 */
	expire_type: number;
	/** 过期参数 */
	expire_param: string;
	/** 附件列表 */
	attachments: string[];
}
//#endregion