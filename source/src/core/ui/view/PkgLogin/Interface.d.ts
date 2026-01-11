declare interface ILoginInfo {
	loginType: ELoginType;
	accountType: 0 | 1;
	account?: string;
	password?: string;
	access_token?: string;
}