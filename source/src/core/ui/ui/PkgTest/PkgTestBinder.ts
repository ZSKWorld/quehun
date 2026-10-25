/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UITestMain from "./UITestMain";
import UITestSnake from "./UITestSnake";
import UITestBezier from "./UITestBezier";
import UITestSpine from "./UITestSpine";
import UITestAStar from "./UITestAStar";
import { UITestMainView } from "../../view/PkgTest/view/uis/UITestMainView";
import { UITestSnakeView } from "../../view/PkgTest/view/uis/UITestSnakeView";
import { UITestBezierView } from "../../view/PkgTest/view/uis/UITestBezierView";
import { UITestSpineView } from "../../view/PkgTest/view/uis/UITestSpineView";
import { UITestAStarView } from "../../view/PkgTest/view/uis/UITestAStarView";

export default class PkgTestBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(UITestMain.url, UITestMainView);
		fgui.UIObjectFactory.setExtension(UITestSnake.url, UITestSnakeView);
		fgui.UIObjectFactory.setExtension(UITestBezier.url, UITestBezierView);
		fgui.UIObjectFactory.setExtension(UITestSpine.url, UITestSpineView);
		fgui.UIObjectFactory.setExtension(UITestAStar.url, UITestAStarView);
	}
}