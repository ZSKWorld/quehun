import { BaseDO } from "./BaseDO";

export class ServerSettingDO extends BaseDO implements DO.IServerSettingDO {
	private _payment_setting: ProtoObject<IPaymentSetting>;
	private _payment_setting_v2: ProtoObject<IPaymentSettingV2>;
	private _nickname_setting: ProtoObject<INicknameSetting>;

	get payment_setting() { return this._payment_setting; }
	get payment_setting_v2() { return this._payment_setting_v2; }
	get nickname_setting() { return this._nickname_setting; }

	@InterestMessage(ENetNotify.NotifyServerSetting)
	private onNotifyServerSetting(data: INotifyServerSetting) {
		if (!data.settings) return;
		const setting = $decodeProtoData(data.settings);
		this._payment_setting = setting.payment_setting;
		this._payment_setting_v2 = setting.payment_setting_v2;
		this._nickname_setting = setting.nickname_setting;
	}
}