/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import CmbCommon1_popup from "./CmbCommon1_popup";
import ComBigHead1 from "./ComBigHead1";
import ComSmallHead from "./ComSmallHead";
import ComTitle1 from "./ComTitle1";
import ComName1 from "./ComName1";
import ComLevel1 from "./ComLevel1";
import UILoading from "./UILoading";
import PbLoading1 from "./PbLoading1";
import UIConfirmBig from "./UIConfirmBig";
import UIConfirmMiddle from "./UIConfirmMiddle";
import UIConfirmSmall from "./UIConfirmSmall";
import BtnCheckTxtRight from "./BtnCheckTxtRight";
import BtnCheckRichTxtRight from "./BtnCheckRichTxtRight";
import ComBack from "./ComBack";
import BtnItem1 from "./BtnItem1";
import ComBigHead from "./ComBigHead";
import ComItem from "./ComItem";
import UIItemDetail from "./UIItemDetail";
import PbLoading2 from "./PbLoading2";
import { ComBigHead1View } from "../../view/PkgCommon/view/coms/ComBigHead1View";
import { ComSmallHeadView } from "../../view/PkgCommon/view/coms/ComSmallHeadView";
import { ComTitle1View } from "../../view/PkgCommon/view/coms/ComTitle1View";
import { ComName1View } from "../../view/PkgCommon/view/coms/ComName1View";
import { ComLevel1View } from "../../view/PkgCommon/view/coms/ComLevel1View";
import { UILoadingView } from "../../view/PkgCommon/view/uis/UILoadingView";
import { UIConfirmBigView } from "../../view/PkgCommon/view/uis/UIConfirmBigView";
import { UIConfirmMiddleView } from "../../view/PkgCommon/view/uis/UIConfirmMiddleView";
import { UIConfirmSmallView } from "../../view/PkgCommon/view/uis/UIConfirmSmallView";
import { BtnCheckTxtRightView } from "../../view/PkgCommon/view/btns/BtnCheckTxtRightView";
import { BtnCheckRichTxtRightView } from "../../view/PkgCommon/view/btns/BtnCheckRichTxtRightView";
import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";
import { BtnItem1View } from "../../view/PkgCommon/view/btns/BtnItem1View";
import { ComBigHeadView } from "../../view/PkgCommon/view/coms/ComBigHeadView";
import { ComItemView } from "../../view/PkgCommon/view/coms/ComItemView";
import { UIItemDetailView } from "../../view/PkgCommon/view/uis/UIItemDetailView";

export default class PkgCommonBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(CmbCommon1_popup.url, CmbCommon1_popup);
		fgui.UIObjectFactory.setExtension(ComBigHead1.url, ComBigHead1View);
		fgui.UIObjectFactory.setExtension(ComSmallHead.url, ComSmallHeadView);
		fgui.UIObjectFactory.setExtension(ComTitle1.url, ComTitle1View);
		fgui.UIObjectFactory.setExtension(ComName1.url, ComName1View);
		fgui.UIObjectFactory.setExtension(ComLevel1.url, ComLevel1View);
		fgui.UIObjectFactory.setExtension(UILoading.url, UILoadingView);
		fgui.UIObjectFactory.setExtension(PbLoading1.url, PbLoading1);
		fgui.UIObjectFactory.setExtension(UIConfirmBig.url, UIConfirmBigView);
		fgui.UIObjectFactory.setExtension(UIConfirmMiddle.url, UIConfirmMiddleView);
		fgui.UIObjectFactory.setExtension(UIConfirmSmall.url, UIConfirmSmallView);
		fgui.UIObjectFactory.setExtension(BtnCheckTxtRight.url, BtnCheckTxtRightView);
		fgui.UIObjectFactory.setExtension(BtnCheckRichTxtRight.url, BtnCheckRichTxtRightView);
		fgui.UIObjectFactory.setExtension(ComBack.url, ComBackView);
		fgui.UIObjectFactory.setExtension(BtnItem1.url, BtnItem1View);
		fgui.UIObjectFactory.setExtension(ComBigHead.url, ComBigHeadView);
		fgui.UIObjectFactory.setExtension(ComItem.url, ComItemView);
		fgui.UIObjectFactory.setExtension(UIItemDetail.url, UIItemDetailView);
		fgui.UIObjectFactory.setExtension(PbLoading2.url, PbLoading2);
	}
}