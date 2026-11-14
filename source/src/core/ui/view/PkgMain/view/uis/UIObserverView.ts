import UIObserver from "../../../../ui/PkgMain/UIObserver";
import { RenderObserverItemView } from "../renders/RenderObserverItemView";

export const enum EUIObserverMsg {
	OnBtnOnlyFriendClick = "UIObserver_OnBtnOnlyFriendClick",
	OnBtnRefreshClick = "UIObserver_OnBtnRefreshClick",
	OnCmbModelSelectedChanged = "UIObserver_OnCmbModelSelectedChanged",
	OnCmbTypeSelectedChanged = "UIObserver_OnCmbTypeSelectedChanged",
	OnObListItemClick = "UIObserver_OnObListItemClick"
}

export class UIObserverView extends UIObserver {
	private _modelName: string;
	private _siMa: boolean;

	override onCreate() {
		const { com_back, btn_onlyFriend, btn_refresh, list_ob } = this;
		com_back.onBackClick(this, this.closeSelf);
		btn_onlyFriend.onClick(this, () => {
			this.event(EUIObserverMsg.OnBtnOnlyFriendClick, btn_onlyFriend.selected);
		});
		btn_refresh.onClick(this, () => {
			this.event(EUIObserverMsg.OnBtnRefreshClick);
			btn_refresh.enabled = false;
			Laya.timer.once(2000, btn_refresh, () => (btn_refresh.enabled = true));
		});
		$uiUtil.initList<RenderObserverItemView>(
			list_ob, true, this,
			(index, item) => item.refresh(list_ob.data[index], this._modelName, this._siMa),
			(item, e, index) => {
				e = e.nativeEvent as any;
				const playerIndex = item.getPlayerIndexByPoint(e.stageX, e.stageY);
				this.event(EUIObserverMsg.OnObListItemClick, [list_ob.data[index], playerIndex]);
			},
		);
	}

	protected override onDisable() {
		this.list_ob.scrollPane.setPosY(0);
	}

	initCmbModel(items: string[], values: any[], index: number) {
		$uiUtil.initCombox(this.cmb_model, items, values, this, this.onCmbModelSelectedChanged);
		this.cmb_model.selectedIndex = index;
	}

	initCmbType(items: string[], values: any[], index: number) {
		$uiUtil.initCombox(this.cmb_type, items, values, this, this.onCmbTypeSelectedChanged);
		this.cmb_type.selectedIndex = index;
	}

	setListData(data: IGameLiveHead[], modelName: string, siMa: boolean) {
		this._modelName = modelName;
		this._siMa = siMa;
		const { list_ob } = this;
		list_ob.data = data;
		list_ob.numItems = data.length;
		list_ob.scrollPane.setPosY(0);
	}

	private onCmbModelSelectedChanged() {
		this.event(EUIObserverMsg.OnCmbModelSelectedChanged, this.cmb_model.selectedIndex);
	}

	private onCmbTypeSelectedChanged() {
		this.event(EUIObserverMsg.OnCmbTypeSelectedChanged, this.cmb_type.selectedIndex);
	}

	override onOpenAni() {
		$uiUtil.playTrans(this.trans_show, false);
		return this.com_back.onOpenAni();
	}

	override onCloseAni() {
		$uiUtil.playTrans(this.trans_show, true);
		return this.com_back.onCloseAni();
	}
}
