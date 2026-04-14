import ComMainPlayerInfo from "../../../../ui/PkgMain/ComMainPlayerInfo";

export const enum EComMainPlayerInfoMsg {
	OnBtnLevelClick = "ComMainPlayerInfo_OnBtnLevelClick",
	OnBtnInfoClick = "ComMainPlayerInfo_OnBtnInfoClick",
}

export class ComMainPlayerInfoView extends ExtensionClass<IView, ComMainPlayerInfo>(ComMainPlayerInfo) implements IView {

	override onCreate() {
		const { btn_level, btn_info } = this;
		btn_level.onClick(this, this.sendEvent, [EComMainPlayerInfoMsg.OnBtnLevelClick]);
		btn_info.onClick(this, this.sendEvent, [EComMainPlayerInfoMsg.OnBtnInfoClick]);
	}

}
