import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIShopTabType } from "../../Definition";
import { EUIShopMsg, UIShopView } from "../../view/uis/UIShopView";

export class UIShopMediator extends MediatorBase<UIShopView, IUIShopData> {

	override onAdded() {
		this.addEvent(EUIShopMsg.OnTabSelectChanged, this.onTabSelectChanged);
		this.addEvent(EUIShopMsg.OnBtnZhwRefreshClick, this.onBtnZhwRefreshClick);
	}

	protected override onDataChanged(data: IUIShopData) {
		let type = this.view.tabIndex;
		switch (data?.currencyType) {
			case ECurrencyType.SeekTicket: type = EUIShopTabType.FDW; break;
			default:
				if (type < 0)
					type = EUIShopTabType.ZHW;
				break;
		}
		this.view.refreshTab(type);
	}

	private onTabSelectChanged(type: EUIShopTabType) {
		switch (type) {
			case EUIShopTabType.FSW: this.view.refreshFSW(); break;
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