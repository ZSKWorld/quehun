import ComBack from "../../../../ui/PkgCommon/ComBack";

const OriginPosX = 10;
const OriginPosY = 22;
export class ComBackView extends ExtensionClass<IView, ComBack>(ComBack) implements IView {

	override onAwake() {
		this.setXY(OriginPosX, OriginPosY);
	}

	onBackClick(thisObj: any, listener: Function, args?: any[]) {
		this.btn_back.onClick(thisObj, listener, args);
	}

	override onOpenAni() {
		return new Promise<void>(resolve => {
			this.y = OriginPosY - 180;
			this.tweenMoveY(OriginPosY, 0.2).onComplete(resolve);
		});
	}

	override onCloseAni() {
		return new Promise<void>(resolve => {
			this.tweenMoveY(OriginPosY - 180, 0.2).onComplete(resolve);
		});
	}
}
