import { BaseDO } from "./BaseDO";

export class ServerSettingDO extends BaseDO implements DO.IServerSettingDO {
	private _nickname_setting: ProtoObject<INicknameSetting>;

	get nickname_setting() { return this._nickname_setting; }

	@InjectNetEvent(ENetNotify.NotifyServerSetting)
	private onNotifyServerSetting(data: INotifyServerSetting) {
		if (!data.settings) return;
		const setting = $decodeProtoData(data.settings);
		this._nickname_setting = setting.nickname_setting;
	}
}