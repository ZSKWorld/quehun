import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { ComBackView, EComBackMsg } from "../../view/coms/ComBackView";

export interface IComBackData {

}

export class ComBackMediator extends MediatorBase<ComBackView, IComBackData> {
	private originPosX = 10;
	private originPosY = 22;

	override onAwake() {
		this.view.setXY(this.originPosX, this.originPosY);
	}

	override onOpenAni() {
		return new Promise<void>(resolve => {
			this.view.y = this.originPosY - 180;
			this.view.tweenMoveY(this.originPosY, 0.2).onComplete(resolve);
		});
	}

	override onCloseAni() {
		return new Promise<void>(resolve => {
			this.view.tweenMoveY(this.originPosY - 180, 0.2).onComplete(resolve);
		});
	}

}