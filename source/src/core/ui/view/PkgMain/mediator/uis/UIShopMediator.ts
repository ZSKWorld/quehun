import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { RadioGroup } from "../../../../extention/RadioGroup";
import { EUIShopTabType } from "../../Definition";
import { EUIShopMsg, UIShopView } from "../../view/uis/UIShopView";

export class UIShopMediator extends MediatorBase<UIShopView, IUIShopData> {
	private _tabGroup = new RadioGroup();

	override onAwake() {
		this.addEvent(EUIShopMsg.OnBtnZhwRefreshClick, this.onBtnZhwRefreshClick);
		this._tabGroup.init(this.view.tabBtns, this, this.onTabChanged, "#d9b263", "#8cb65f");
	}

	override onEnable() {
		this._tabGroup.selectIndex = 0;
	}

	override onDisable() {
		this._tabGroup.clearSelection();
	}

	private onTabChanged(type?: EUIShopTabType) {
		type = type ?? this._tabGroup.selectIndex;
		switch (type) {
			case EUIShopTabType.ZHW: this.view.refreshZHW(); break;
			case EUIShopTabType.BJW: this.view.refreshBJW(); break;
			case EUIShopTabType.QYW: this.view.refreshQYW(); break;
			case EUIShopTabType.XZW: this.view.refreshXZW(); break;
			case EUIShopTabType.CHW: this.view.refreshCHW(); break;
			case EUIShopTabType.FDW: this.view.refreshFDW(); break;
		}
	}

	private onBtnZhwRefreshClick() {

	}

}