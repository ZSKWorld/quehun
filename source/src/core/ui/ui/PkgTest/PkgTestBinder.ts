/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UITest from "./UITest";
import { UITestView } from "../../view/PkgTest/view/UITestView";
import LabelItem from "./LabelItem";
import UITest2 from "./UITest2";
import { UITest2View } from "../../view/PkgTest/view/UITest2View";
import LabelItem2 from "./LabelItem2";

export default class PkgTestBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(UITest.url, UITestView);
		fgui.UIObjectFactory.setExtension(LabelItem.url, LabelItem);
		fgui.UIObjectFactory.setExtension(UITest2.url, UITest2View);
		fgui.UIObjectFactory.setExtension(LabelItem2.url, LabelItem2);
	}
}