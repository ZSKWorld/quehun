import { RadioGroup } from "../../../../extention/RadioGroup";
import UIRecharge from "../../../../ui/PkgCommon/UIRecharge";
import { EUIRechargeTabType } from "../../../PkgMain/Definition";
import { ComRechargeItemView } from "../coms/ComRechargeItemView";

export const enum EUIRechargeMsg {
	OnTabSelectChanged = "UIRecharge_OnTabSelectChanged",
}

export class UIRechargeView extends ExtensionClass<IView, UIRecharge>(UIRecharge) implements IView {
	private _tabGroup = new RadioGroup();
	private _itemIds: number[];

	get tabIndex() { return this._tabGroup.selectIndex; }

	override onCreate() {
		const {
			com_back, btn_tab0, btn_tab1, btn_tab2, btn_tab3, btn_tab4, list_item
		} = this;
		com_back.onBackClick(this, this.closeSelf);

		this._tabGroup.init([
			btn_tab0, btn_tab1, btn_tab2, btn_tab3, btn_tab4
		], this, this.onTabChanged, "#d9b263", "#8cb65f");
		$uiUtil.setList(list_item, true, this, this.onListItemRender);
	}

	refreshTab(type: EUIRechargeTabType, enables: Record<EUIRechargeTabType, boolean>) {
		this.btn_tab0.visible = !!enables[EUIRechargeTabType.HY];
		this.btn_tab1.visible = !!enables[EUIRechargeTabType.FSQ];
		this.btn_tab2.visible = !!enables[EUIRechargeTabType.TB];
		this.btn_tab3.visible = !!enables[EUIRechargeTabType.QYDJ];
		this.btn_tab4.visible = !!enables[EUIRechargeTabType.HS];
		this._tabGroup.clearSelection();
		this._tabGroup.selectIndex = type;
	}

	refreshItems(itemIds: number[]) {
		this._itemIds = itemIds;
		this.list_item.numItems = itemIds.length;
	}

	/** 契约等级 */
	refreshQYDJ() {

	}

	private onTabChanged(type: EUIRechargeTabType) {
		this.sendEvent(EUIRechargeMsg.OnTabSelectChanged, type);
	}

	private onListItemRender(index: number, item: ComRechargeItemView) {
		item.refresh(this._tabGroup.selectIndex, this._itemIds[index], index);
	}

	override onOpenAni() {
		$uiUtil.playTrans(this.trans_show);
		return this.com_back.onOpenAni();
	}

	override onCloseAni() {
		$uiUtil.playTrans(this.trans_show, true);
		return this.com_back.onCloseAni();
	}

	override onDisable() {
		const anis = [this.trans_show];
		anis.forEach(v => {
			v.playing && v.stop(true, true);
		});
		this._tabGroup.clearSelection();
	}
}
