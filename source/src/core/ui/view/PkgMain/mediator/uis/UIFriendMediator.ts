import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { RadioGroup } from "../../../../extention/RadioGroup";
import { RenderFriendApplyView } from "../../view/renders/RenderFriendApplyView";
import { EUIFriendMsg, UIFriendView } from "../../view/uis/UIFriendView";

export interface IUIFriendData {

}

export class UIFriendMediator extends MediatorBase<UIFriendView, IUIFriendData> {
	private _tabGroup = new RadioGroup();

	override onAwake() {
		this.addEvent(EUIFriendMsg.OnComBackClick, this.onComBackClick);
		const { view, _tabGroup } = this;
		_tabGroup.init(view.tabBtns, new Laya.Handler(view, view.refreshPage));
		$uiUtil.setList(view.listApply, true, this, this.onListApplyRender);
	}

	override onEnable() {
		this._tabGroup.selectIndex = 0;
		this.view.refreshView();
	}

	private async onComBackClick() {
		this.closeSelf();
	}

	private onListApplyRender(index: number, item: RenderFriendApplyView) {
		item.refresh($userData.friend.applies[index]);
	}

	override onOpenAni() {
		return this.view.onOpenAni();
	}

	override onCloseAni() {
		return this.view.onCloseAni();
	}
}