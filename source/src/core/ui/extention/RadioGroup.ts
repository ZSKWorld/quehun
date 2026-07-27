export class RadioGroup {
	private _selectIndex = -1;
	private _items: fgui.GButton[] = [];
	private _valueChangedCaller: any;
	private _onValueChanged: (index: number) => void;
	private _selectedColor: EColorString;
	private _deselectedColor: EColorString;

	get selectIndex() { return this._selectIndex; }
	set selectIndex(v) {
		if (v == this._selectIndex) return;
		const items = this._items;
		if (v < 0 || v >= items.length) return;
		this.setSelection(v);
		this._onValueChanged?.apply(this._valueChangedCaller, [v]);
	}

	init(
		items: fgui.GButton[],
		caller?: any,
		onValueChanged?: (index: number) => void,
		selectedColor: EColorString = EColorString._ebb661,
		deselectedColor: EColorString = EColorString._8cb65f
	) {
		this.reset();
		items = items || [];
		this._items = items.slice();
		onValueChanged && items.forEach((v, index) => {
			v.mode = fgui.ButtonMode.Radio;
			v.onClick(this, this.onItemClick, [index]);
		});
		this._valueChangedCaller = caller;
		this._onValueChanged = onValueChanged;
		this._selectedColor = selectedColor;
		this._deselectedColor = deselectedColor;
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
			const selected = v == i;
			items[i].selected = selected;
			items[i].titleColor = selected ? this._selectedColor : this._deselectedColor;
		}
	}

	private onItemClick(index: number) {
		this.selectIndex = index;
	}
}