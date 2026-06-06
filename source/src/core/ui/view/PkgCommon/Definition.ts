export const enum EUIRechargeTabType {
	/** 辉玉 */
	HY,
	/** 服饰券 */
	FSQ,
	/** 铜币 */
	TB,
	/** 契约等级 */
	QYDJ,
	/** 辉石 */
	HS = 4,
}

export const enum EUIRechargeEvent {
	OnTabSelectChanged = "UIRecharge_OnTabSelectChanged",
	/** 充值魂玉 or 服饰券 */
	OnRecharge = "EUIRechargeEvent_OnRecharge",
	/** 服饰券充值辉玉 */
	OnRechargeHY = "EUIRechargeEvent_OnRechargeHY",
	/** 充值铜币 */
	OnRechargeTB = "EUIRechargeEvent_OnRechargeTB",
	/** 充值辉石 */
	OnRechargeHS = "EUIRechargeEvent_OnRechargeHS",
}