import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { RadioGroup } from "../../../../extention/RadioGroup";
import { EUIFriendMsg, UIFriendView } from "../../view/uis/UIFriendView";

export interface IUIFriendData {

}

export class UIFriendMediator extends MediatorBase<UIFriendView, IUIFriendData> {
	private _tabGroup = new RadioGroup();

	override onAwake() {
		this.addEvent(EUIFriendMsg.OnComBackClick, this.onComBackClick);
		const { view, _tabGroup } = this;
		_tabGroup.init(view.tabBtns, new Laya.Handler(view, view.refreshPage));
	}

	override onEnable() {
		this._tabGroup.selectIndex = 0;
	}

	private async onComBackClick() {
		this.closeSelf();
	}

	override onOpenAni() {
		return this.view.onOpenAni();
	}

	override onCloseAni() {
		return this.view.onCloseAni();
	}
}