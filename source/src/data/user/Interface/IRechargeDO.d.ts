declare namespace DO {
	interface IRechargeDO {
		/** 支付是否开启 */
		get paymentOpen(): boolean;
		get shelevesId(): string;
	}
}