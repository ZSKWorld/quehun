
const TempV2 = new Laya.Vector2();
const TempPoint = new Laya.Point();
export class MenuPanel implements IMenuPanel {
	public view: fgui.GComponent;
	public list: fgui.GList;
	public parentPanel: MenuPanel;
	public childPanel: MenuPanel;

	// 记录当前本层级中哪个 Item 处于高亮状态
	private _activeItem: fairygui.GButton = null;

	init(data: IMenuItem[], onSelect: (item: IMenuItem) => void) {
		this.view = fgui.UIPackage.createObject("你的包名", "MyMenu").asCom;
		this.list = this.view.getChild("list").asList;

		data.forEach(itemData => {
			let item = this.list.addItemFromPool().asButton;
			item.title = itemData.title;

			this.setItemHighlight(item, false);

			// 处理子菜单箭头显示
			let arrowCtrl = item.getController("hasSub");
			if (arrowCtrl) arrowCtrl.selectedIndex = itemData.children ? 1 : 0;

			// 存入原始数据备用
			item.data = itemData;

			// 监听点击
			item.offAll(Laya.Event.CLICK);
			item.on(Laya.Event.CLICK, this, () => {
				if (!itemData.children && itemData.callback) {
					onSelect(itemData); // 只有最后一级点击才触发总回调
				}
			});

			// 监听悬浮：处理子菜单弹出
			item.on(Laya.Event.ROLL_OVER, this, () => {
				this.onItemHover(item, itemData, onSelect);
			});
		});

		this.list.resizeToFit();
	}

	show(x: number, y: number) {
		this.view.setXY(x, y);
		fgui.GRoot.inst.addChild(this.view); // 使用 addChild 而非 showPopup
		// 简单的弹出动画
		this.view.alpha = 0;
		this.view.tweenFade(1, 0.1);
	}

	dispose() {
		if (this.childPanel)
			this.childPanel.dispose();
		this._activeItem = null;
		this.view.removeFromParent();
		fgui.GTween.kill(this.view);
	}

	private setItemHighlight(item: fairygui.GButton, isHigh: boolean) {
		let c = item.getController("c_highlight");
		if (c) c.selectedIndex = isHigh ? 1 : 0;
	}

	private onItemHover(item: fgui.GButton, data: IMenuItem, onSelect: Function) {
		// 1. 如果之前有高亮的 Item，先把它重置（除非它就是当前 Item）
		if (this._activeItem && this._activeItem != item) {
			this.setItemHighlight(this._activeItem, false);
			// 如果旧的 Item 开启了子菜单，关掉它
			if (this.childPanel) {
				this.childPanel.dispose();
				this.childPanel = null;
			}
		}

		// 2. 高亮当前选中的 Item
		this._activeItem = item;
		this.setItemHighlight(item, true);

		if (data.children && data.children.length > 0) {
			// 如果已经开了对应的子菜单，就不重复开了
			if (this.childPanel) return;

			// 创建子菜单
			let sub = new MenuPanel();
			sub.init(data.children, onSelect as any);
			sub.parentPanel = this;
			this.childPanel = sub;

			// 设置子菜单位置
			let pt = item.localToGlobal(item.width, 0);

			// 边缘检查：如果右侧塞不下了，往左边弹
			if (pt.x + sub.view.width > fgui.GRoot.inst.width) {
				pt.x = item.localToGlobal().x - sub.view.width;
			}

			sub.show(pt.x, pt.y);
		}
	}
}
