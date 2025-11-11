import UILiaoShe from "../../../ui/PkgMain/UILiaoShe";

export const enum EUILiaoSheMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
}

export class UILiaoSheView extends ExtensionClass<IView, UILiaoShe>(UILiaoShe) implements IView {

	override onCreate() {
		const { com_back } = this;
		com_back.btn_back.onClick(this, this.sendEvent, [EUILiaoSheMsg.OnComBackClick]);
	}

}
