/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UITestMain from "./UITestMain";
import UITestBezier from "./UITestBezier";
import UITestSpine from "./UITestSpine";
import { UITestMainView } from "../../view/PkgTest/view/uis/UITestMainView";
import { UITestBezierView } from "../../view/PkgTest/view/uis/UITestBezierView";
import { UITestSpineView } from "../../view/PkgTest/view/uis/UITestSpineView";

export default class PkgTestBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(UITestMain.url, UITestMainView);
		fgui.UIObjectFactory.setExtension(UITestBezier.url, UITestBezierView);
		fgui.UIObjectFactory.setExtension(UITestSpine.url, UITestSpineView);
	}
}