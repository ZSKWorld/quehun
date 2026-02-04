import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIChooseServerMsg, UIChooseServerView } from "../../view/uis/UIChooseServerView";

export interface IUIChooseServerData {
	callback: (index: number) => void;
}

export class UIChooseServerMediator extends MediatorBase<UIChooseServerView, IUIChooseServerData> {
	private _lastServer: number;

	override onAwake() {
		this.addEvent(EUIChooseServerMsg.OnBtnLastServerClick, this.onBtnLastServerClick);
		$uiUtil.setList(this.view.listServer, false, this, this.onListServerRender, this.onListServerClick);
	}

	override onEnable() {
		this._lastServer = $localDataMgr.get(ELocalDataKey.LastServer, -1);
		this.view.refreshLastServer($gameMgr.ipConfig.ip[this._lastServer]);
		this.view.listServer.numItems = $gameMgr.ipConfig.ip.length;
	}

	private onListServerRender(index: number, item: fgui.GButton) {
		item.title = $gameMgr.ipConfig.ip[index].name;
	}

	private onListServerClick(_, __, index: number) {
		$localDataMgr.set(ELocalDataKey.LastServer, index);
		this.data.callback(index);
		this.closeSelf();
	}

	private onBtnLastServerClick() {
		const info = $gameMgr.ipConfig.ip[this._lastServer];
		if (!info) return;
		this.data.callback(this._lastServer);
		this.closeSelf();
	}
}