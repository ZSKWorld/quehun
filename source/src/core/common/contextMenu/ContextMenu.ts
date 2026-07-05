import { ComContextMenuView } from "../../ui/view/PkgCommon/view/coms/ComContextMenuView";

const TempV2 = new Laya.Vector2();
const TempPoint = new Laya.Point();
export class ContextMenu implements IContextMenu {
	private _target: fgui.GObject;
	private _data: IMenuItemData[];
	private _panel: ComContextMenuView;
	private _parentMenu: ContextMenu;
	private _subMenu: ContextMenu;

	constructor() {
		const panel = this._panel = $facade.createView(EViewID.ComContextMenuView) as ComContextMenuView;

		panel.on(Laya.Event.MOUSE_OVER, this, this.onMouseOver);
		panel.on(Laya.Event.MOUSE_OUT, this, () => {
			Laya.timer.frameOnce(1, this, this.onMouseOut);
		});
		panel.on(Laya.Event.MOUSE_DOWN, this, this.onMouseStopPropagation);
		panel.on(Laya.Event.RIGHT_MOUSE_DOWN, this, this.onMouseStopPropagation);
		panel.on(Laya.Event.RIGHT_MOUSE_UP, this, this.onMouseStopPropagation);
		$uiUtil.setList(panel.list, true, this, this.onListRender, this.onListClick);

		Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.close);
		Laya.stage.on(Laya.Event.RIGHT_MOUSE_DOWN, this, this.close);
	}

	init(root: fgui.GComponent, target: fgui.GObject, data: IMenuItemData[]) {
		this._target = target;
		this._data = data;
		let panel = this._panel;
		panel.list.numItems = data.length;
		const itemHeight = panel.list.getChildAt(0)?.height || 0;
		panel.height = Math.min(data.length * itemHeight + 20, 1000);
		panel.visible = false;
		root.addChild(panel);
	}

	show(x: number, y: number) {
		const panel = this._panel;
		if (!panel) return;
		panel.list.selectedIndex = -1;
		const { x: ox, y: oy, width, height, visible } = panel;
		const tx = x + width > Laya.stage.width ? Laya.stage.width - width : x;
		const ty = y + height > Laya.stage.height ? Laya.stage.height - height : y;

		fgui.GTween.kill(panel);
		panel.alpha = visible ? 0 : 1;
		if (visible) {
			TempV2.setValue(ox - tx, oy - ty);
			if (TempV2.length > 100) TempV2.normalize().scale(100);
			panel.setXY(tx + TempV2.x, ty + TempV2.y);
			panel.tweenFade(1, 0.3);
			panel.tweenMove(tx, ty, 0.3).setEase(fgui.EaseType.CubicOut);
		} else {
			panel.setXY(tx, ty);
		}
		panel.visible = true;
	}

	close(ani: boolean = true) {
		Laya.timer.clearAll(this);
		this._subMenu?.close(ani);
		if (ani) {
			this._panel.tweenFade(0, 0.15).onComplete(this.doClose, this);
		}
		else
			this.doClose();
	}

	recover() {
		this.close(false);
		this._data = null;
		this._panel.removeFromParent();
		if (this._parentMenu) {
			this._parentMenu._subMenu = null;
		}
		if (this._subMenu) {
			this._subMenu.recover();
			this._subMenu = null;
		}
		Laya.Pool.recover(EUIPoolKey.ContextMenu, this);
	}

	private doClose() {
		this._panel.visible = false;
	}

	private onListRender(index: number, item: fgui.GButton) {
		const data = this._data[index];
		item.title = data.title;
		item.icon = data.icon || "";
		item.titleObject.x = data.icon ? 45 : 15;
		item.titleObject.width = data.icon ? 230 : 260;
		item.enabled = !data.disabled;
		const haveSubMenu = data.children?.length > 0;
		item._children[3].visible = haveSubMenu;
		item.on(Laya.Event.MOUSE_OVER, this, this.onListMouseOver, [index, haveSubMenu]);
		item.on(Laya.Event.MOUSE_OUT, this, this.onListMouseOut);
	}

	private onListMouseOver(index: number, haveSubMenu: boolean) {
		Laya.timer.clearAll(this);
		Laya.timer.frameOnce(1, this, this.checkOpenSubMenu, [haveSubMenu ? index : -1]);
	}

	private onListMouseOut() {
		Laya.timer.frameOnce(2, this, this.onListMouseOut2);
	}

	private onListMouseOut2() {
		this._panel.list.selectedIndex = -1;
		this._subMenu?.close();
	}

	private onListClick(_, __, index: number) {
		const data = this._data[index];
		if (data.children?.length) {

		} else {
			data.onClick?.();
			this.close();
		}
	}

	private checkOpenSubMenu(index: number) {
		let { _data, _parentMenu, _subMenu, _panel, _target } = this;
		_panel.list.selectedIndex = index;
		if (index >= 0) {
			if (!_subMenu) {
				_subMenu = this._subMenu = Laya.Pool.getItemByClass(EUIPoolKey.ContextMenu, ContextMenu);
			} else
				_subMenu.close();
			_subMenu._parentMenu = this;
			_subMenu.init(_panel.parent, _target, _data[index].children);
			let tx = _panel.x + _panel.width - 5;
			let ty = _panel.list.getChildAt(_panel.list.itemIndexToChildIndex(index)).localToGlobal(0, 0, TempPoint).y;
			if (_parentMenu) {
				if (_panel.x < _parentMenu._panel.x) {
					tx = _panel.x - _subMenu._panel.width + 5;
				}
			} else {
				if (tx + _subMenu._panel.width > Laya.stage.width)
					tx = _panel.x - _subMenu._panel.width + 5;
			}
			_subMenu.show(tx, ty);
		} else {
			_subMenu?.close();
		}
	}

	private onMouseOver() {
		const parentMenu = this._parentMenu;
		if (!parentMenu) return;
		const data = this._data;
		const index = parentMenu._data.findIndex(v => v.children && v.children == data);
		if (index < 0) return;
		parentMenu._panel.list.selectedIndex = index;
		Laya.timer.clearAll(parentMenu);
	}

	private onMouseOut() {
		const parentMenu = this._parentMenu;
		if (!parentMenu) return;
		this.close();
		parentMenu._panel.list.selectedIndex = -1;
	}

	private onMouseStopPropagation(e: Laya.Event) {
		e.stopPropagation();
	}
}
