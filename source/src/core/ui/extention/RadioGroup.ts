type RadioItem = fgui.GObject & { selected: boolean };
export class RadioGroup {
	private _selectIndex = -1;
	private _items: RadioItem[] = [];
	private _valueChangedCaller: any;
	private _onValueChanged: (index: number) => void;

	get selectIndex() { return this._selectIndex; }
	set selectIndex(v) {
		if (v == this._selectIndex) return;
		const items = this._items;
		if (v < 0 || v >= items.length) return;
		this.setSelection(v);
		this._onValueChanged?.apply(this._valueChangedCaller, [v]);
	}

	init(items: RadioItem[], caller?: any, onValueChanged?: (index: number) => void) {
		this.reset();
		items = items || [];
		this._items = [...items];
		items.forEach((v, index) => {
			v.onClick(this, this.onItemClick, [index]);
		});
		this._valueChangedCaller = caller;
		this._onValueChanged = onValueChanged;
		this.clearSelection();
	}

	clearSelection() { this.setSelection(-1); }

	reset() {
		this.clearSelection();
		this._items.forEach(item => item.offClick(this, this.onItemClick));
		this._items.length = 0;
		this._valueChangedCaller = null;
		this._onValueChanged = null;
	}

	private setSelection(v: number) {
		this._selectIndex = v;
		const items = this._items;
		for (let i = items.length - 1; i >= 0; i--) {
			items[i].selected = v == i;
		}
	}

	private onItemClick(index: number) {
		this.selectIndex = index;
	}
}