import ComBack from "../../../../ui/PkgCommon/ComBack";

const OriginPosX = 10;
const OriginPosY = 22;
export class ComBackView extends ComBack {

	override onAwake() {
		this.setXY(OriginPosX, OriginPosY);
	}

	onBackClick(thisObj: any, listener: Function, args?: any[]) {
		this.btn_back.onClick(thisObj, listener, args);
	}

	override onOpenAni() {
		return new Promise<void>(resolve => {
			this.alpha = 0;
			this.y = OriginPosY - 50;
			this.tweenFade(1, 0.2);
			this.tweenMoveY(OriginPosY, 0.2).onComplete(resolve);
		});
	}

	override onCloseAni() {
		return new Promise<void>(resolve => {
			this.tweenFade(0, 0.2);
			this.tweenMoveY(OriginPosY - 50, 0.2).onComplete(resolve);
		});
	}
}
