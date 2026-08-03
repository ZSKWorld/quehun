import { MenuPanel } from "./MenuPanel";


export class MenuManager {
	private static rootPanel: MenuPanel;

	public static showMenu(data: IMenuItem[]) {
		this.hideAll();

		this.rootPanel = new MenuPanel();
		this.rootPanel.init(data, (item) => {
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