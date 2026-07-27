import { BaseDO } from "./BaseDO";

export class RechargeDO extends BaseDO implements DO.IRechargeDO {

	private _vipExp: number = 0;
	/** 以及充值过的人民币档位 */
	private _rechargedList: number[] = [];
	private _gainedVipLevels: number[] = [];
	// private _paymentSetting: ProtoObject<IPaymentSetting> = {};
	private _paymentSettingV2: ProtoObject<IPaymentSettingV2> = { open_payment: 0, payment_platforms: [] };
	private _paymentSettingMap: Record<EPaymentPlatform, ProtoObject<IPaymentSettingV2_PaymentSettingUnit>> = {} as any;

	get vipExp() { return this._vipExp; }
	private set vipExp(value) {
		this._vipExp = value;
		this.dispatch(EUserEvent.OnRechargeVipExpChanged);
	}
	get vipLevel() {
		let level = 1;
		const vipExp = this._vipExp;
		$cfgMgr.vip.vip.forEach(v => {
			if (vipExp >= v.charge)
				level = v.id;
		});
		return level;
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
	get payOpen() {
		return this._paymentSettingV2?.open_payment == 1;
	}
	get paymentTypes() {
		return this._paymentSettingV2?.payment_platforms.map(e => e.platform) || [];
	}

	isFirstRecharge(id: number) {
		return this._rechargedList.includes(id) == false;
	}

	gainedVipLevelReward(level: number) {
		return this._gainedVipLevels.includes(level - 1);
	}

	@InjectNetEvent(ENetMessage.login)
	@InjectNetEvent(ENetMessage.oauth2Login)
	private onLogin(res: IResLogin) {
		if (!res.account) return;
		this.vipExp = res.account.vip;
	}

	@InjectNetEvent(ENetMessage.fetchMisc)
	private onFetchMisc(res: IResMisc) {
		this._rechargedList = res.recharged_list.slice();
		this.dispatch(EUserEvent.OnRechargeRechargedListChanged);
	}

	@InjectNetEvent(ENetMessage.fetchVipReward)
	private onFetchVipReward(res: IResVipReward) {
		this._gainedVipLevels = res.gained_vip_levels.slice();
		this.dispatch(EUserEvent.OnRechargeGainVipLevelChanged);
	}

	@InjectNetEvent(ENetMessage.fetchServerSettings)
	private onFetchServerSetting(res: IResServerSettings) {
		this.onNotifyServerSetting(res);
	}

	@InjectNetEvent(ENetNotify.NotifyAccountUpdate)
	private onNotifyAccountUpdate(data: INotifyAccountUpdate) {
		if (!data.update) return;
		const { numerical, new_recharged_list } = data.update;
		if (numerical && numerical.length) {
			const vipExpData = numerical.find(v => v.id == 100099);
			if (vipExpData) this._vipExp = vipExpData.final;
		}

		if (new_recharged_list && new_recharged_list.length) {
			this._rechargedList = [...new Set([...this._rechargedList, ...new_recharged_list])];
			this.dispatch(EUserEvent.OnRechargeRechargedListChanged);
		}
	}

	@InjectNetEvent(ENetNotify.NotifyServerSetting)
	private onNotifyServerSetting(data: INotifyServerSetting) {
		if (!data.settings) return;
		const setting = $decodeProtoData(data.settings);
		// this._paymentSetting = setting.payment_setting;
		this._paymentSettingV2 = setting.payment_setting_v2;
		this._paymentSettingMap = {} as any;
		for (const e of setting.payment_setting_v2.payment_platforms) {
			this._paymentSettingMap[e.platform] = e;
		}
	}
}