import { ComContextMenuView } from "../../ui/view/PkgCommon/view/coms/ComContextMenuView";

const TempV2 = new Laya.Vector2();
const TempPoint = new Laya.Point();
export class ContextMenu implements IContextMenu {
	private _data: IMenuItemData[];
	private _panel: ComContextMenuView;
	private _parentMenu: ContextMenu;
	private _parentItem: fgui.GButton;
	private _subMenu: ContextMenu;

	constructor() {
		const panel = this._panel = $facade.createView(EViewID.ComContextMenuView) as ComContextMenuView;

		panel.on(Laya.Event.MOUSE_DOWN, this, this.onMouseStopPropagation);
		panel.on(Laya.Event.RIGHT_MOUSE_DOWN, this, this.onMouseStopPropagation);
		$uiUtil.setList(panel.list, true, this, this.onListRender, this.onListClick);

		Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.close);
		Laya.stage.on(Laya.Event.RIGHT_MOUSE_DOWN, this, this.close);
	}

	init(root: fgui.GComponent, data: IMenuItemData[], parent?: IContextMenu, parentItem?: fgui.GButton) {
		this._data = data;
		this._parentMenu = parent as ContextMenu;
		this._parentItem = parentItem;
		let panel = this._panel;
		panel.list.numItems = data.length;
		const itemHeight = panel.list.getChildAt(0)?.height || 0;
		panel.height = Math.min(data.length * itemHeight, 1000);
		panel.visible = false;
		root.addChild(panel);
	}

	show(x: number, y: number) {
		const panel = this._panel;
		const { width, height } = panel;
		const tx = x + width > Laya.stage.width ? Laya.stage.width - width : x;
		const ty = y + height > Laya.stage.height ? Laya.stage.height - height : y;

		panel.setXY(tx, ty);
		panel.list.clearSelection();
		panel.visible = true;
	}

	close() {
		Laya.timer.clearAll(this);
		this._subMenu?.close();
		this._panel.visible = false;
	}

	recover() {
		Laya.timer.clearAll(this);
		this._panel.visible = false;
		this._data = null;
		this._panel.removeFromParent();
		if (this._parentMenu) {
			this._parentMenu._subMenu = null;
			this._parentMenu = null;
		}
		if (this._subMenu) {
			this._subMenu.recover();
			this._subMenu = null;
		}
		Laya.Pool.recover(EUIPoolKey.ContextMenu, this);
	}

	private onListRender(index: number, item: fgui.GButton) {
		const data = this._data[index];
		item.title = data.title;
		item.icon = data.icon || "";
		item.titleObject.x = data.icon ? 45 : 15;
		item.titleObject.width = data.icon ? 230 : 260;
		item.enabled = !data.disabled;
		const haveSubMenu = data.children?.length > 0;
		item.getChildAt(3).visible = haveSubMenu;

		item.on(Laya.Event.MOUSE_OVER, this, this.onItemMouseOverOrOut, [item, data, true]);
		item.on(Laya.Event.MOUSE_OUT, this, this.onItemMouseOverOrOut, [item, data, false]);
	}

	private onItemMouseOverOrOut(item: fgui.GButton, data: IMenuItemData, over: boolean) {
		this._panel.list.clearSelection();
		item.selected = over;
		over && this.onItemMouseOver(over);
		if (over) {
			if (data.children?.length)
				this.openSubMenu(item, data.children);
			else
				this._subMenu?.close();
		}
	}

	private onItemMouseOver(over: boolean) {
		this._parentItem && (this._parentItem.selected = over);
		this._parentMenu?.onItemMouseOver(over);
	}

	private onListClick(_, __, index: number) {
		const data = this._data[index];
		if (data.children?.length) {

		} else {
			data.onClick?.();
			this.closeOnClick();
		}
	}

	private closeOnClick() {
		this.close();
		this._parentMenu?.closeOnClick();
	}

	private openSubMenu(item: fgui.GButton, data: IMenuItemData[]) {
		let { _parentMenu, _subMenu, _panel } = this;

		if (!_subMenu)
			_subMenu = this._subMenu = Laya.Pool.getItemByClass(EUIPoolKey.ContextMenu, ContextMenu);

		if (_subMenu._parentItem != item) {
			_subMenu.close();
			_subMenu.init(_panel.parent, data, this, item);
		}

		let tx = _panel.x + _panel.width - 5;
		let ty = item.localToGlobal(0, 0, TempPoint).y;
		if (_parentMenu) {
			if (_panel.x < _parentMenu._panel.x) {
				tx = _panel.x - _subMenu._panel.width + 5;
			}
		} else {
			if (tx + _subMenu._panel.width > Laya.stage.width)
				tx = _panel.x - _subMenu._panel.width + 5;
		}
		_subMenu.show(tx, ty);
	}

	private onMouseStopPropagation(e: Laya.Event) {
		e.stopPropagation();
	}
}
