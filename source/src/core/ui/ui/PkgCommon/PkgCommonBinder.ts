/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnCheck from "./BtnCheck";
import { BtnCheckView } from "../../view/PkgCommon/view/btns/BtnCheckView";
import BtnCheckTxtRight from "./BtnCheckTxtRight";
import { BtnCheckTxtRightView } from "../../view/PkgCommon/view/btns/BtnCheckTxtRightView";
import BtnCheckRichTxtRight from "./BtnCheckRichTxtRight";
import { BtnCheckRichTxtRightView } from "../../view/PkgCommon/view/btns/BtnCheckRichTxtRightView";

export default class PkgCommonBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(BtnCheck.url, BtnCheckView);
		fgui.UIObjectFactory.setExtension(BtnCheckTxtRight.url, BtnCheckTxtRightView);
		fgui.UIObjectFactory.setExtension(BtnCheckRichTxtRight.url, BtnCheckRichTxtRightView);
	}
}