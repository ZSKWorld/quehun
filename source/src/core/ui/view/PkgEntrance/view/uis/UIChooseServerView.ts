import UIChooseServer from "../../../../ui/PkgEntrance/UIChooseServer";

export const enum EUIChooseServerMsg {

}

export class UIChooseServerView extends ExtensionClass<IView, UIChooseServer>(UIChooseServer) implements IView {
	get listServer() { return this.list_server; }

	override onCreate() {
		
	}

}
