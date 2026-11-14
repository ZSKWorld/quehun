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
		btn_lastServer.onClick(this, this.event, [EUIChooseServerMsg.OnBtnLastServerClick]);
		$uiUtil.initList<fgui.GButton>(
			listServer, false, this,
			(index, item) => {
				item.title = this._ipNames[index];
			},
			(item, e, index) => {
				this.event(EUIChooseServerMsg.OnListServerClick, index);
			}
		);
	}

	refresh(ipNames: string[], lastIndex: number) {
		this._ipNames = ipNames;
		this.list_server.numItems = ipNames.length;
		this.btn_lastServer.title = ipNames[lastIndex] || "未记录上次选择的服务器";
	}
}
