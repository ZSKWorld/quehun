declare namespace VO {
	interface IServerSettingVO {
		get payment_setting(): ProtoObject<IPaymentSetting>;
		get payment_setting_v2(): ProtoObject<IPaymentSettingV2>;
		get nickname_setting(): ProtoObject<INicknameSetting>;
	}
}