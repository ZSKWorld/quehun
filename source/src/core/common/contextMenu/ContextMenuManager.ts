import { Observer } from "../../mvc/provider/Observer";
import { ContextMenu } from "./ContextMenu";

const TempPoint = new Laya.Point();

@Singleton
export class ContextMenuManager extends Observer implements IContextMenuManager {
	private _root: fgui.GComponent;
	private _menus = new Map<fgui.GObject, ContextMenu>();

	constructor() {
		super();
		const root = this._root = new fgui.GComponent();
		root.name = "context_menu_root";
		root.opaque = false;
		root.touchable = true;
		$uiMgr.addToLayer(root, ELayer.UIMiddle);
		root.makeFullScreen();
	}

	bindMenu(target: fgui.GObject, data: IMenuItemData[]) {
		if (!target || target.isDisposed) return null;
		let menu = this._menus.get(target);
		if (menu) return menu;
		menu = Laya.Pool.getItemByClass(EUIPoolKey.ContextMenu, ContextMenu);
		menu.init(this._root, data);
		this._menus.set(target, menu);
		target.on(Laya.Event.RIGHT_MOUSE_UP, this, this.onRightMouseUp, [target]);
		return menu;
	}

	unbindMenu(target: fgui.GObject) {
		const menu = this._menus.get(target);
		if (!menu) return;
		menu.recover();
		this._menus.delete(target);
		target.off(Laya.Event.RIGHT_MOUSE_UP, this, this.onRightMouseUp);
	}

	private onRightMouseUp(target: fgui.GObject, event: Laya.Event) {
		const menu = this._menus.get(target);
		if (!menu) return;
		this._root.globalToLocal(event.stageX, event.stageY, TempPoint);
		menu.show(TempPoint.x, TempPoint.y);
	}

	@InjectGlobalEvent(EGlobalEvent.OnInitGameCompleted)
	private test() {
		return;
		$ctxMenuMgr.bindMenu(fgui.GRoot.inst, [
			{
				title: "测试菜单1",
				onClick: () => {
					Logger.error("点击了测试菜单1");
				}
			},
			{
				title: "测试菜单2",
				onClick: () => {
					Logger.error("点击了测试菜单2");
				}
			},
			{
				title: "测试菜单3",
				children: [
					{
						title: "子菜单3-1",
						onClick: () => {
							Logger.error("点击了子菜单3-1");
						}
					},
					{
						title: "子菜单3-2",
						onClick: () => {
							Logger.error("点击了子菜单3-2");
						}
					}
				]
			},
			{
				title: "测试菜单4",
				children: [
					{
						title: "子菜单4-1",
						onClick: () => {
							Logger.error("点击了子菜单4-1");
						}
					},
					{
						title: "子菜单4-2",
						children: [
							{
								title: "子菜单4-2-1",
								onClick: () => {
									Logger.error("点击了子菜单4-2-1");
								}
							},
							{
								title: "子菜单4-2-2",
								onClick: () => {
									Logger.error("点击了子菜单4-2-2");
								}
							}
						]
					},
					{
						title: "子菜单4-3",
						children: [
							{
								title: "子菜单4-3-1",
								onClick: () => {
									Logger.error("点击了子菜单4-3-1");
								}
							},
							{
								title: "子菜单4-3-2",
								onClick: () => {
									Logger.error("点击了子菜单4-3-2");
								}
							}
						]
					},
					{
						title: "子菜单4-4",
						onClick: () => {
							Logger.error("点击了子菜单4-4");
						}
					}
				]
			},
		]);
	}

}
