import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { UITestView } from "../../view/uis/UITestView";

export interface IUITestData {

}

export class UITestMediator extends MediatorBase<UITestView, IUITestData> {
	override onAwake() {
		
	}
}

class TestSpine extends Laya.Script {
	private _mouseDown = false;
	private _lastPoint = new Laya.Point();
	private _spine: ISpineController;

	override onEnable() {
		const spineId = 40012203;
		$spineMgr.load([spineId]).then(() => {
			const spine = this._spine = $spineMgr.create(spineId, this.gowner);
			spine.gowner.setScale(0.15, 0.15);
			spine.gowner.setXY(Laya.stage.width / 2, Laya.stage.height / 2);
		});
	}

	override onMouseDown() {
		this._mouseDown = true;
		this._lastPoint.setTo(Laya.stage.mouseX, Laya.stage.mouseY);
	}

	override onMouseUp() {
		this._mouseDown = false;
	}

	override onMouseMove(evt: Laya.Event) {
		if (!this._mouseDown) return;
		if (!this._spine) return;
		const gowner = this._spine.gowner;
		gowner.x += Laya.stage.mouseX - this._lastPoint.x;
		gowner.y += Laya.stage.mouseY - this._lastPoint.y;
		this._lastPoint.setTo(Laya.stage.mouseX, Laya.stage.mouseY);
	}

	@InjectViewMouseEvent(EMouseEvent.MouseWheel)
	private onMouseWheel(e: Laya.Event) {
		if (!this._spine) return;
		const gowner = this._spine.gowner;
		const scaleX = $mathUtil.clamp(gowner.scaleX + e.delta * 0.01, 0.1, 2);
		const scaleY = $mathUtil.clamp(gowner.scaleY + e.delta * 0.01, 0.1, 2);
		gowner.setScale(scaleX, scaleY);
	}

	override onDisable() {
		if (this._spine) {
			$spineMgr.dispose(this._spine.spineId);
			this._spine = null;
		}
	}
}