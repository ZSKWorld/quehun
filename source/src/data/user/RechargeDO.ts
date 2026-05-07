import { BaseDO } from "./BaseDO";

export class RechargeDO extends BaseDO implements DO.IRechargeDO {

	/** 欠款订单列表 */
	private _orders: ProtoObject<IResFetchRefundOrder_OrderInfo>[] = [];
	/** 最后补款时间 */
	private _clearDeadline: number = 0;
	/** 提示消息 */
	private _message: ProtoObject<II18nContext>[] = [];
	// private _paymentSetting: ProtoObject<IPaymentSetting> = {};
	private _paymentSettingV2: ProtoObject<IPaymentSettingV2> = { open_payment: 0, payment_platforms: [] };
	private _paymentSettingMap: Record<string, ProtoObject<IPaymentSettingV2_PaymentSettingUnit>> = {};

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