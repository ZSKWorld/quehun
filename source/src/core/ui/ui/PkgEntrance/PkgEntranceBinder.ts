/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UIEntrance from "./UIEntrance";
import { UIEntranceView } from "../../view/PkgEntrance/view/uis/UIEntranceView";

export default class PkgEntranceBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(UIEntrance.url, UIEntranceView);
	}
}