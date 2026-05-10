import { BaseDO } from "./BaseDO";

export class RechargeDO extends BaseDO implements DO.IRechargeDO {

	private _vipExp: number = 0;
	private _vipLevel: number = 1;
	/** 以及充值过的人民币档位 */
	private _rechargedList: number[] = [];
	private _gainedVipLevels: number[] = [];
	/** 欠款订单列表 */
	private _orders: ProtoObject<IResFetchRefundOrder_OrderInfo>[] = [];
	/** 最后补款时间 */
	private _clearDeadline: number = 0;
	/** 提示消息 */
	private _message: ProtoObject<II18nContext>[] = [];
	// private _paymentSetting: ProtoObject<IPaymentSetting> = {};
	private _paymentSettingV2: ProtoObject<IPaymentSettingV2> = { open_payment: 0, payment_platforms: [] };
	private _paymentSettingMap: Record<string, ProtoObject<IPaymentSettingV2_PaymentSettingUnit>> = {};

	get vipExp() { return this._vipExp; }
	get vipLevel() { return this._vipLevel; }
	get paymentOpen() {
		return this._paymentSettingV2 && this._paymentSettingV2.open_payment == 1;
	}
	get shelevesId() {
		let goods_sheleve_id = '';
		let info = $cfgMgr.mall.channel_config[$gameMgr.payChannelId];
		if (info) {
			goods_sheleve_id = info.shelves_id;
		} else if ($gameMgr.inDmm) {
			goods_sheleve_id = 'shelves_005';
		} else if ($gameMgr.clientType == EClientType.CHS) {
			goods_sheleve_id = 'shelves_001';
		} else if ($gameMgr.clientType == EClientType.JP) {
			goods_sheleve_id = 'shelves_002';
		} else if ($gameMgr.clientType == EClientType.EN) {
			goods_sheleve_id = 'shelves_003';
		} else if ($gameMgr.clientType == EClientType.CHST) {
			goods_sheleve_id = 'shelves_004';
		} else if ($gameMgr.clientType == EClientType.KR) {
			goods_sheleve_id = 'shelves_007';
		}
		return goods_sheleve_id;
	}

	isFirstRecharge(id: number) {
		return this._rechargedList.includes(id) == false;
	}

	gainedVipLevelReward(level: number) {
		return this._gainedVipLevels.includes(level);
	}

	@InterestMessage(ENetMessage.login)
	@InterestMessage(ENetMessage.oauth2Login)
	private onLogin(res: IResLogin) {
		if (!res.account) return;
		const vipExp = this._vipExp = res.account.vip;
		let level = 1;
		$cfgMgr.vip.vip.forEach(v => {
			if (vipExp >= v.charge)
				level = v.id;
		});
		this._vipLevel = level;
		this.dispatch(EUserEvent.OnRechargeVipExpChanged);
		this.dispatch(EUserEvent.OnRechargeVipLevelChanged);
	}

	@InterestMessage(ENetMessage.fetchMisc)
	private onFetchMisc(res: IResMisc) {
		this._rechargedList = [...res.recharged_list];
		this.dispatch(EUserEvent.OnRechargeRechargedListChanged);
	}

	@InterestMessage(ENetMessage.fetchVipReward)
	private onFetchVipReward(res: IResVipReward) {
		this._gainedVipLevels = [...res.gained_vip_levels];
		this.dispatch(EUserEvent.OnRechargeGainVipLevelChanged);
	}

	@InterestMessage(ENetMessage.fetchServerSettings)
	private onFetchServerSetting(res: IResServerSettings) {
		this.onNotifyServerSetting(res);
	}

	@InterestMessage(ENetMessage.fetchRefundOrder)
	private onFetchRefundOrder(res: IResFetchRefundOrder) {
		this._orders = res.orders.map($decodeProtoData);
		this._clearDeadline = res.clear_deadline;
		this._message = res.message.map($decodeProtoData);
	}

	@InterestMessage(ENetNotify.NotifyAccountUpdate)
	private onNotifyAccountUpdate(data: INotifyAccountUpdate) {
		if (!data.update) return;
		const new_recharged_list = data.update.new_recharged_list;
		if (new_recharged_list && new_recharged_list.length) {
			this._rechargedList = [...new Set([...this._rechargedList, ...new_recharged_list])];
			this.dispatch(EUserEvent.OnRechargeRechargedListChanged);
		}
	}

	@InterestMessage(ENetNotify.NotifyServerSetting)
	private onNotifyServerSetting(data: INotifyServerSetting) {
		if (!data.settings) return;
		const setting = $decodeProtoData(data.settings);
		// this._paymentSetting = setting.payment_setting;
		this._paymentSettingV2 = setting.payment_setting_v2;
		this._paymentSettingMap = {};
		for (const e of setting.payment_setting_v2.payment_platforms) {
			this._paymentSettingMap[e.platform] = e;
		}
	}
}