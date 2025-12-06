/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { UIEntranceView } from "../../view/PkgEntrance/view/uis/UIEntranceView";
import UIEntrance from "./UIEntrance";

export default class PkgEntranceBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(UIEntrance.url, UIEntranceView);
	}
}