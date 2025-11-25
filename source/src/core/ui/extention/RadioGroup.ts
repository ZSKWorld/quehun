type RadioItem = fgui.GObject & { selected: boolean };
export class RadioGroup {
	private _selectIndex = -1;
	private _items: RadioItem[] = [];
	private _onValueChanged: Laya.Handler;

	get selectIndex() {
		return this._selectIndex;
	}
	set selectIndex(value: number) {
		this._selectIndex = value;
		this._items.forEach((item, index) => {
			item.selected = index == value;
		});
		this._onValueChanged && this._onValueChanged.runWith(value);
	}

	init(items: RadioItem[], onValueChanged?: Laya.Handler) {
		if (!items || items.length == 0) return;
		items.forEach(item => {
			const index = this._items.indexOf(item);
			if (index != -1) return;
			this._items.push(item);
			item.onClick(this, this.onItemClick, [item]);
		});
		this.selectIndex = 0;
		this._onValueChanged = onValueChanged;
	}

	clear() {
		this._items.forEach(item => {
			item.offClick(this, this.onItemClick);
		});
		this._items.length = 0;
		this._onValueChanged?.recover();
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