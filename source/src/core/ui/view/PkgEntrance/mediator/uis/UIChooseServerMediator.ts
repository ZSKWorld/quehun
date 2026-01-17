import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { UIChooseServerView } from "../../view/uis/UIChooseServerView";

export interface IUIChooseServerData {
	callback: (index: number) => void;
}

export class UIChooseServerMediator extends MediatorBase<UIChooseServerView, IUIChooseServerData> {

	override onAwake() {
		$uiUtil.setList(this.view.listServer, false, this, this.onListServerRender, this.onListServerClick);
	}

	override onEnable() {
		this.view.listServer.numItems = $gameMgr.ipConfig.ip.length;
	}

	private onListServerRender(index: number, item: fgui.GButton) {
		item.title = $gameMgr.ipConfig.ip[index].name;
	}

	private onListServerClick(_, __, index: number) {
		this.data.callback(index);
		this.closeSelf();
	}
}