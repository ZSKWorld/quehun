import { ComContextMenuView } from "../../ui/view/PkgCommon/view/coms/ComContextMenuView";

const TempPoint = new Laya.Point();
export class MenuPanel implements IMenuPanel {
	private _view: ComContextMenuView;
	private _parentPanel: MenuPanel;
	private _childPanel: MenuPanel;
	private _activeItem: fgui.GButton;

	get view() { return this._view; }

	private constructor() { }

	static create(data: IMenuItem[], onSelect: (item: IMenuItem) => void) {
		const panel: MenuPanel = Laya.Pool.getItemByClass(EUIPoolKey.ContextMenu, MenuPanel as any);
		panel._view = panel._view || $facade.createView<ComContextMenuView>(EViewID.ComContextMenuView);

		const view = panel._view;

		view.list.removeChildrenToPool();

		data.forEach(v => {
			const item = view.list.addItemFromPool().asButton;

			item.title = v.title;
			item.icon = v.icon || "";
			item.titleObject.x = v.icon ? 45 : 15;
			item.titleObject.width = v.icon ? 230 : 260;
			const haveSubMenu = v.children?.length > 0;
			item.getChildAt(3).visible = haveSubMenu;
			panel.setItemHighlight(item, false);

			item.on(Laya.Event.CLICK, null, onSelect, [v]);
			item.on(Laya.Event.ROLL_OVER, panel, panel.onItemHover, [item, v, onSelect]);
		});

		const itemHeight = view.list.getChildAt(0)?.height || 0;
		view.height = Math.min(data.length * itemHeight, 1000);

		return panel;
	}

	static recover(panel: MenuPanel) {
		if (!panel) return;
		panel.hide();
		panel._parentPanel = null;
		panel._view.list.removeChildrenToPool();
		Laya.Pool.recover(EUIPoolKey.ContextMenu, panel);
	}

	show(x: number, y: number) {
		const { width, height } = this._view;
		const tx = x + width > Laya.stage.width ? Laya.stage.width - width : x;
		const ty = y + height > Laya.stage.height ? Laya.stage.height - height : y;

		this._view.setXY(tx, ty);
	}

	hide() {
		this.setItemHighlight(this._activeItem, false);
		this._activeItem = null;
		this._view.removeFromParent();
		fgui.GTween.kill(this._view);
		MenuPanel.recover(this._childPanel);
		this._childPanel = null;
	}

	checkHit(target: Laya.Node) {
		const { _view, _childPanel } = this;
		if (_view.displayObject.contains(target))
			return true;
		if (_childPanel)
			return _childPanel.checkHit(target);
		return false;
	}

	recover() {
		MenuPanel.recover(this);
	}

	private setItemHighlight(item: fgui.GButton, isHigh: boolean) {
		if (!item) return;
		item.selected = isHigh;
	}

	private onItemHover(item: fgui.GButton, data: IMenuItem, onSelect: Function) {
		// 1. 如果之前有高亮的 Item，先把它重置（除非它就是当前 Item）
		if (this._activeItem && this._activeItem != item) {
			this.setItemHighlight(this._activeItem, false);
			// 如果旧的 Item 开启了子菜单，关掉它
			MenuPanel.recover(this._childPanel);
			this._childPanel = null;
		}

		// 2. 高亮当前选中的 Item
		this._activeItem = item;
		this.setItemHighlight(item, true);

		if (data.children?.length > 0) {
			// 如果已经开了对应的子菜单，就不重复开了
			if (this._childPanel) return;
			const view = this._view;
			const parentPanel = this._parentPanel;

			// 创建子菜单
			const sub = MenuPanel.create(data.children, onSelect as any);
			sub._parentPanel = this;
			this._childPanel = sub;
			view.parent.addChild(sub._view);

			let tx = view.x + view.width - 5;
			let ty = item.localToGlobal(0, 0, TempPoint).y;
			if (parentPanel) {
				if (view.x < parentPanel._view.x) {
					tx = view.x - sub._view.width + 5;
				}
			} else {
				if (tx + sub._view.width > Laya.stage.width)
					tx = view.x - sub._view.width + 5;
			}

			sub.show(tx, ty);
		}
	}
}
