/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UIConfirmBig from "./UIConfirmBig";
import { UIConfirmBigView } from "../../view/PkgCommon/view/UIConfirmBigView";
import UIConfirmMiddle from "./UIConfirmMiddle";
import { UIConfirmMiddleView } from "../../view/PkgCommon/view/UIConfirmMiddleView";
import UIConfirmSmall from "./UIConfirmSmall";
import { UIConfirmSmallView } from "../../view/PkgCommon/view/UIConfirmSmallView";
import BtnCheck from "./BtnCheck";
import { BtnCheckView } from "../../view/PkgCommon/view/btns/BtnCheckView";
import BtnCheckTxtRight from "./BtnCheckTxtRight";
import { BtnCheckTxtRightView } from "../../view/PkgCommon/view/btns/BtnCheckTxtRightView";
import BtnCheckRichTxtRight from "./BtnCheckRichTxtRight";
import { BtnCheckRichTxtRightView } from "../../view/PkgCommon/view/btns/BtnCheckRichTxtRightView";

export default class PkgCommonBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(UIConfirmBig.url, UIConfirmBigView);
		fgui.UIObjectFactory.setExtension(UIConfirmMiddle.url, UIConfirmMiddleView);
		fgui.UIObjectFactory.setExtension(UIConfirmSmall.url, UIConfirmSmallView);
		fgui.UIObjectFactory.setExtension(BtnCheck.url, BtnCheckView);
		fgui.UIObjectFactory.setExtension(BtnCheckTxtRight.url, BtnCheckTxtRightView);
		fgui.UIObjectFactory.setExtension(BtnCheckRichTxtRight.url, BtnCheckRichTxtRightView);
	}
}