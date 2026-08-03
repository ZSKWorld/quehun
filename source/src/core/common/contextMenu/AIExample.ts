interface IMenuItem {
	title: string;
	icon?: string;
	callback?: Function;
	children?: IMenuItem[]; // 子菜单数据
	isSeparator?: boolean;
}

class MenuPanel {
	public view: fairygui.GComponent;
	public list: fairygui.GList;
	public parentPanel: MenuPanel;
	public childPanel: MenuPanel;

	constructor(data: IMenuItem[], onSelect: (item: IMenuItem) => void) {
		this.view = fairygui.UIPackage.createObject("你的包名", "MyMenu").asCom;
		this.list = this.view.getChild("list").asList;

		data.forEach(itemData => {
			let item = this.list.addItemFromPool().asButton;
			item.title = itemData.title;

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

	private onItemHover(item: fairygui.GButton, data: IMenuItem, onSelect: Function) {
		// 如果当前已经打开了一个子菜单，先关闭它
		if (this.childPanel) {
			this.childPanel.dispose();
			this.childPanel = null;
		}

		if (data.children && data.children.length > 0) {
			// 创建子菜单
			let sub = new MenuPanel(data.children, onSelect as any);
			sub.parentPanel = this;
			this.childPanel = sub;

			// 设置子菜单位置
			let pt = item.localToGlobal(item.width, 0);

			// 边缘检查：如果右侧塞不下了，往左边弹
			if (pt.x + sub.view.width > fairygui.GRoot.inst.width) {
				pt.x = item.localToGlobal().x - sub.view.width;
			}

			sub.show(pt.x, pt.y);
		}
	}

	public show(x: number, y: number) {
		this.view.setXY(x, y);
		fairygui.GRoot.inst.addChild(this.view); // 使用 addChild 而非 showPopup
		// 简单的弹出动画
		this.view.alpha = 0;
		Laya.Tween.to(this.view, { alpha: 1 }, 100);
	}

	public dispose() {
		if (this.childPanel) this.childPanel.dispose();
		this.view.removeFromParent();
		Laya.Tween.clearAll(this.view);
	}
}

class MenuManager {
	private static rootPanel: MenuPanel;

	public static showMenu(data: IMenuItem[]) {
		this.hideAll();

		this.rootPanel = new MenuPanel(data, (item) => {
			if (item.callback) item.callback();
			this.hideAll(); // 选中后关闭全部
		});

		// 获取鼠标位置
		let mouseX = Laya.stage.mouseX;
		let mouseY = Laya.stage.mouseY;

		this.rootPanel.show(mouseX, mouseY);

		// 监听点击舞台空白处关闭
		Laya.stage.once(Laya.Event.MOUSE_DOWN, this, this.onStageDown);
	}

	private static onStageDown(e: Laya.Event) {
		// 如果点击的不是菜单内部，则关闭
		// 注意：这里需要递归判断点击点是否在任何一个活动菜单面板内
		if (this.rootPanel && !this.checkHit(this.rootPanel, e.target)) {
			this.hideAll();
		} else {
			// 如果点的是内部，由于是 once 监听，需要重新注册
			Laya.stage.once(Laya.Event.MOUSE_DOWN, this, this.onStageDown);
		}
	}

	private static checkHit(panel: MenuPanel, target: any): boolean {
		if (panel.view.displayObject.contains(target)) return true;
		if (panel.childPanel) return this.checkHit(panel.childPanel, target);
		return false;
	}

	public static hideAll() {
		if (this.rootPanel) {
			this.rootPanel.dispose();
			this.rootPanel = null;
		}
		Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onStageDown);
	}
}
