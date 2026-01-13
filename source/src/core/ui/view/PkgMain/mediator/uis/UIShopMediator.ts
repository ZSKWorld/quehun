import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIShopMsg, UIShopView } from "../../view/uis/UIShopView";

export interface IUIShopData {

}

export class UIShopMediator extends MediatorBase<UIShopView, IUIShopData> {

	override onAwake() {
		this.addEvent(EUIShopMsg.OnComBackClick, this.onComBackClick);
	}

	private async onComBackClick() {
		this.closeSelf();
	}
}