import UIChooseBattle from "../../../ui/PkgBattle/UIChooseBattle";

export const enum UIChooseBattleMsg {
	OnBtnBackClick = "UIChooseBattle_OnBtnBackClick",
}

export class UIChooseBattleView extends ExtensionClass<IView, UIChooseBattle>(UIChooseBattle) implements IView {

	override onCreate() {
		const { btn_back } = this;
		btn_back.onClick(this, this.sendEvent, [UIChooseBattleMsg.OnBtnBackClick]);
	}

	setBattleType(type: number) {
		this.ctrl_openType.selectedIndex = type;
	}

}
