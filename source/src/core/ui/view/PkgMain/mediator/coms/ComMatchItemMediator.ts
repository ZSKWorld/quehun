import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EComMatchItemMsg, ComMatchItemView } from "../../view/coms/ComMatchItemView";

export interface IComMatchItemData {

}

export class ComMatchItemMediator extends MediatorBase<ComMatchItemView, IComMatchItemData> {

	override onAwake() {
		this.addEvent(EComMatchItemMsg.OnBtnBgClick, this.onBtnBgClick);
		this.addEvent(EComMatchItemMsg.OnBtnInfoClick, this.onBtnInfoClick);
	}
	
	private onBtnBgClick() {
		Logger.error("bg click")
	}

	private onBtnInfoClick() {
		Logger.error("info click")
	}

}