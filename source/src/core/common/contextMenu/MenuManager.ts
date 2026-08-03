import { MenuPanel } from "./MenuPanel";

const TempPoint = new Laya.Point();

@Singleton
export class MenuManager {
	private _root: fgui.GComponent;
	private _menus = new Map<fgui.GObject, MenuPanel>();
	private _curMenu: MenuPanel;
	private _onSelect = (item: IMenuItem) => {
		if (item.children?.length > 0) return;
		item.onClick?.();
		this.hideAll();
	};

	constructor() {
		const root = this._root = new fgui.GComponent();
		root.name = "context_menu_root";
		root.opaque = false;
		root.touchable = true;
		$uiMgr.addToLayer(root, ELayer.UIMiddle);
		root.makeFullScreen();
		Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onStageMouseDown);
		Laya.stage.on(Laya.Event.RIGHT_MOUSE_DOWN, this, this.onStageMouseDown);
	}

	bindMenu(target: fgui.GObject, data: IMenuItem[]) {
		if (!target || target.isDisposed) return null;
		let menu = this._menus.get(target);
		if (menu) return menu;
		menu = MenuPanel.create(data, this._onSelect);
		this._menus.set(target, menu);
		target.on(Laya.Event.RIGHT_MOUSE_UP, this, this.onTargetRightMouseUp, [target]);
		return menu;
	}

	unbindMenu(target: fgui.GObject) {
		const menu = this._menus.get(target);
		if (!menu) return;
		menu.recover();
		this._menus.delete(target);
		target.off(Laya.Event.RIGHT_MOUSE_UP, this, this.onTargetRightMouseUp);
	}

	private onTargetRightMouseUp(target: fgui.GObject, event: Laya.Event) {
		const menu = this._menus.get(target);
		if (!menu) return;
		this.hideAll();
		this._curMenu = menu;
		this._root.addChild(menu.view);
		this._root.globalToLocal(event.stageX, event.stageY, TempPoint);
		menu.show(TempPoint.x, TempPoint.y);
	}

	private hideAll() {
		this._curMenu?.hide();
		this._curMenu = null;
	}

	private onStageMouseDown(e: Laya.Event) {
		if (!this._curMenu) return;
		if (!this._curMenu.checkHit(e.target)) {
			this.hideAll();
		}
	}
}