import UIChooseServer from "../../../../ui/PkgEntrance/UIChooseServer";

export const enum EUIChooseServerMsg {
	OnBtnLastServerClick = "EUIChooseServerMsg_OnBtnLastServerClick",
}

export class UIChooseServerView extends ExtensionClass<IView, UIChooseServer>(UIChooseServer) implements IView {
	get listServer() { return this.list_server; }

	override onCreate() {
		const { btn_lastServer } = this;
		btn_lastServer.onClick(this, this.sendEvent, [EUIChooseServerMsg.OnBtnLastServerClick]);
	}

	refreshLastServer(info: IIPInfo) {
		this.btn_lastServer.title = info ? info.name : "未记录上次选择的服务器";
	}
}
