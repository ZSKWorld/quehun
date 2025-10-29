import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { ComMatchItemView, EComMatchItemMsg } from "../../view/coms/ComMatchItemView";

export interface IComMatchItemData {

}

export class ComMatchItemMediator extends MediatorBase<ComMatchItemView, IComMatchItemData> {

	override onAwake() {
		this.addEvent(EComMatchItemMsg.OnBtnInfoClick, this.onBtnInfoClick);
	}

	private onBtnInfoClick() {

	}

}