import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { ComMatchItemView, EComMatchItemMsg } from "../../view/coms/ComMatchItemView";

export class ComMatchItemMediator extends MediatorBase<ComMatchItemView, IComMatchItemData> {

	override onAwake() {
		this.addEvent(EComMatchItemMsg.OnBtnBgClick, this.onBtnBgClick);
		this.addEvent(EComMatchItemMsg.OnBtnInfoClick, this.onBtnInfoClick);
	}

	private onBtnBgClick() {
		$logger.error("bg click");
	}

	private onBtnInfoClick() {
		$logger.error("info click");
	}

}