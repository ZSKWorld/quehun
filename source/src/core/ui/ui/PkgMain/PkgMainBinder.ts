/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UIMain from "./UIMain";
import { UIMainView } from "../../view/PkgMain/view/UIMainView";

export default class PkgMainBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(UIMain.url, UIMainView);
	}
}