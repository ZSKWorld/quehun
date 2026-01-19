type RadioItem = fgui.GObject & { selected: boolean };
export class RadioGroup {
	private _selectIndex = -1;
	private _items: RadioItem[] = [];
	private _valueChangedCaller: any;
	private _onValueChanged: (index: number) => void;

	get selectIndex() { return this._selectIndex; }
	set selectIndex(value: number) {
		this._selectIndex = value;
		this._items.forEach((item, index) => {
			item.selected = index == value;
		});
		this._onValueChanged && this._onValueChanged.apply(this._valueChangedCaller, [value]);
	}

	init(items: RadioItem[], caller?: any, onValueChanged?: (index: number) => void) {
		if (!items || items.length == 0) return;
		items.forEach(item => {
			const index = this._items.indexOf(item);
			if (index != -1) return;
			this._items.push(item);
			item.onClick(this, this.onItemClick, [item]);
		});
		this.selectIndex = 0;
		this._valueChangedCaller = caller;
		this._onValueChanged = onValueChanged;
	}

	clear() {
		this._items.forEach(item => {
			item.offClick(this, this.onItemClick);
		});
		this._items.length = 0;
		this._valueChangedCaller = null;
		this._onValueChanged = null;
		this._selectIndex = -1;
	}

	private onItemClick(item: RadioItem) {
		const index = this._items.indexOf(item);
		if (index == -1) return;
		if (index == this.selectIndex) return;
		this.selectIndex = index;
	}
}