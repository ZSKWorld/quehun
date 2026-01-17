/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UIChooseServer from "./UIChooseServer";
import UIEntrance from "./UIEntrance";
import { UIChooseServerView } from "../../view/PkgEntrance/view/uis/UIChooseServerView";
import { UIEntranceView } from "../../view/PkgEntrance/view/uis/UIEntranceView";

export default class PkgEntranceBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(UIChooseServer.url, UIChooseServerView);
		fgui.UIObjectFactory.setExtension(UIEntrance.url, UIEntranceView);
	}
}