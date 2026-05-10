declare namespace DO {
	interface IRechargeDO {
		/** vip经验 */
		get vipExp(): number;
		/** vip等级 */
		get vipLevel(): number;
		/** 支付是否开启 */
		get paymentOpen(): boolean;
		get shelevesId(): string;
		/** 是否是首充 */
		isFirstRecharge(id: number): boolean;
		/** 是否领取过对应等级的vip奖励 */
		gainedVipLevelReward(level: number): boolean;
	}
}