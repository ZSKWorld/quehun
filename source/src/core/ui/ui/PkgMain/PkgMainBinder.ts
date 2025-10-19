/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UIMain from "./UIMain";
import { UIMainView } from "../../view/PkgMain/view/UIMainView";
import BtnXunMi from "./BtnXunMi";
import { BtnXunMiView } from "../../view/PkgMain/view/btns/BtnXunMiView";
import ComMatchMode from "./ComMatchMode";
import { ComMatchModeView } from "../../view/PkgMain/view/coms/ComMatchModeView";

export default class PkgMainBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(UIMain.url, UIMainView);
		fgui.UIObjectFactory.setExtension(BtnXunMi.url, BtnXunMiView);
		fgui.UIObjectFactory.setExtension(ComMatchMode.url, ComMatchModeView);
	}
}