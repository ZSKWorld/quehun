import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { ComRankItemView } from "../view/coms/ComRankItemView";
import { EUIRankMsg, UIRankView } from "../view/UIRankView";

export interface IUIRankData {

}

export class UIRankMediator extends MediatorBase<UIRankView, IUIRankData> {
	private _curLevelType: number = -1;

	override onAwake() {
		this.addEvent(EUIRankMsg.OnBtnCloseClick, this.onBtnCloseClick);
		this.addEvent(EUIRankMsg.OnBtnSiMaClick, this.setLevelType, [4]);
		this.addEvent(EUIRankMsg.OnBtnSanMaClick, this.setLevelType, [3]);
		$uiUtil.setList(this.view.list_level, true, this, this.onListLevelRender, this.onListLevelItemClick);
	}

	override onEnable() {
		this.setLevelType(4);
	}

	private onBtnCloseClick() {
		this.closeSelf();
	}

	private setLevelType(type: 3 | 4) {
		if (this._curLevelType == type) return;
		this._curLevelType = type;
		this.view.refreshLevelType(type);
		this.view.refreshList([null, null, null, null, null, null, null, null, null, null, null, null]);
	}

	private onListLevelRender(index: number, item: ComRankItemView) {
		item.refresh();
	}

	private onListLevelItemClick(item: ComRankItemView) {

	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this.view); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this.view); }
}