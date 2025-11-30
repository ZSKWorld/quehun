/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import CmbCommon1_popup from "./CmbCommon1_popup";
import ComSmallHead from "./ComSmallHead";
import { ComSmallHeadView } from "../../view/PkgCommon/view/coms/ComSmallHeadView";
import ComTitle1 from "./ComTitle1";
import { ComTitle1View } from "../../view/PkgCommon/view/coms/ComTitle1View";
import ComName1 from "./ComName1";
import { ComName1View } from "../../view/PkgCommon/view/coms/ComName1View";
import ComLevel1 from "./ComLevel1";
import { ComLevel1View } from "../../view/PkgCommon/view/coms/ComLevel1View";
import UILoading from "./UILoading";
import { UILoadingView } from "../../view/PkgCommon/view/UILoadingView";
import PbLoading1 from "./PbLoading1";
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
import ComBack from "./ComBack";
import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";
import ComItem from "./ComItem";
import { ComItemView } from "../../view/PkgCommon/view/coms/ComItemView";
import ComBigHead from "./ComBigHead";
import { ComBigHeadView } from "../../view/PkgCommon/view/coms/ComBigHeadView";
import PbLoading2 from "./PbLoading2";

export default class PkgCommonBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(CmbCommon1_popup.url, CmbCommon1_popup);
		fgui.UIObjectFactory.setExtension(ComSmallHead.url, ComSmallHeadView);
		fgui.UIObjectFactory.setExtension(ComTitle1.url, ComTitle1View);
		fgui.UIObjectFactory.setExtension(ComName1.url, ComName1View);
		fgui.UIObjectFactory.setExtension(ComLevel1.url, ComLevel1View);
		fgui.UIObjectFactory.setExtension(UILoading.url, UILoadingView);
		fgui.UIObjectFactory.setExtension(PbLoading1.url, PbLoading1);
		fgui.UIObjectFactory.setExtension(UIConfirmBig.url, UIConfirmBigView);
		fgui.UIObjectFactory.setExtension(UIConfirmMiddle.url, UIConfirmMiddleView);
		fgui.UIObjectFactory.setExtension(UIConfirmSmall.url, UIConfirmSmallView);
		fgui.UIObjectFactory.setExtension(BtnCheck.url, BtnCheckView);
		fgui.UIObjectFactory.setExtension(BtnCheckTxtRight.url, BtnCheckTxtRightView);
		fgui.UIObjectFactory.setExtension(BtnCheckRichTxtRight.url, BtnCheckRichTxtRightView);
		fgui.UIObjectFactory.setExtension(ComBack.url, ComBackView);
		fgui.UIObjectFactory.setExtension(ComItem.url, ComItemView);
		fgui.UIObjectFactory.setExtension(ComBigHead.url, ComBigHeadView);
		fgui.UIObjectFactory.setExtension(PbLoading2.url, PbLoading2);
	}
}