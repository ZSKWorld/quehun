import UIChooseServer from "../../../../ui/PkgEntrance/UIChooseServer";

export const enum EUIChooseServerMsg {
	OnListServerClick = "EUIChooseServerMsg_OnListServerClick",
	OnBtnLastServerClick = "EUIChooseServerMsg_OnBtnLastServerClick",
}

export class UIChooseServerView extends UIChooseServer {
	get listServer() { return this.list_server; }
	private _ipNames: string[];

	override onCreate() {
		const { btn_lastServer, listServer } = this;
		btn_lastServer.onClick(this, this.sendEvent, [EUIChooseServerMsg.OnBtnLastServerClick]);
		$uiUtil.setList(listServer, false, this, this.onListServerRender, this.onListServerClick);
	}

	refresh(ipNames: string[], lastIndex: number) {
		this._ipNames = ipNames;
		this.list_server.numItems = ipNames.length;
		this.btn_lastServer.title = ipNames[lastIndex] || "未记录上次选择的服务器";
	}

	private onListServerRender(index: number, item: fgui.GButton) {
		item.title = this._ipNames[index];
	}

	private onListServerClick(_, __, index: number) {
		this.sendEvent(EUIChooseServerMsg.OnListServerClick, index);
	}
}
