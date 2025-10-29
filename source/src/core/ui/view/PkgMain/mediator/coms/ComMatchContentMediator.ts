import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { ComMatchContentView, EComMatchContentMsg } from "../../view/coms/ComMatchContentView";

export interface IComMatchContentData {

}

export class ComMatchContentMediator extends MediatorBase<ComMatchContentView, IComMatchContentData> {

	override onAwake() {
		this.addEvent(EComMatchContentMsg.OnItemClick, this.onItemClick);
	}

	private onItemClick(index: number) {
		Logger.error("item", index);
	}
}