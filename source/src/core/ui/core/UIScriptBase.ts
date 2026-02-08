
export class UIScriptBase extends Laya.Script implements IObserver {
	override owner: Laya.Sprite;

	dispatch(eventName: string, data?: any): void {
		$facade.dispatch(eventName, data);
	}

	override onReset() {
		super.onReset();
		$facade.setNotifyDecoaratorEnable(this, false);
	}

	protected override _onAdded() {
		super._onAdded();
		$facade.setNotifyDecoaratorEnable(this, true);

	}
}
