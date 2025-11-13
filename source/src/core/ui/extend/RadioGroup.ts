const ValueChanged = "RadioGroup_ValueChanged";
export class RadioGroup extends Laya.Script {
	private _curSelectIndex = 0;
	private _items: fgui.GObject[] = [];

	override onAdded() {

	}

	initItems(items: fgui.GObject[]) {

	}

	onValueChanged(caller: any, listener: Function) {
		this.owner.on(ValueChanged, caller, listener);
	}

	offValueChanged(caller: any, listener: Function) {
		this.owner.off(ValueChanged, caller, listener);
	}

	private onItemClick() {

	}
}