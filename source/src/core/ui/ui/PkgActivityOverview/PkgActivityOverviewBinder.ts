/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import ComYueKa from "./ComYueKa";
import ComOfferRewardTask from "./ComOfferRewardTask";
import ComResureCoin from "./ComResureCoin";
import RenderOverviewTab from "./RenderOverviewTab";
import ComQuestionair from "./ComQuestionair";
import ComNiuDan from "./ComNiuDan";
import UIActivityOverview from "./UIActivityOverview";
import ComQingYun from "./ComQingYun";
import ComMatchRot from "./ComMatchRot";
import { ComYueKaView } from "../../view/PkgActivityOverview/view/coms/ComYueKaView";
import { ComOfferRewardTaskView } from "../../view/PkgActivityOverview/view/coms/ComOfferRewardTaskView";
import { ComResureCoinView } from "../../view/PkgActivityOverview/view/coms/ComResureCoinView";
import { RenderOverviewTabView } from "../../view/PkgActivityOverview/view/renders/RenderOverviewTabView";
import { ComQuestionairView } from "../../view/PkgActivityOverview/view/coms/ComQuestionairView";
import { ComNiuDanView } from "../../view/PkgActivityOverview/view/coms/ComNiuDanView";
import { UIActivityOverviewView } from "../../view/PkgActivityOverview/view/uis/UIActivityOverviewView";
import { ComQingYunView } from "../../view/PkgActivityOverview/view/coms/ComQingYunView";
import { ComMatchRotView } from "../../view/PkgActivityOverview/view/coms/ComMatchRotView";

export default class PkgActivityOverviewBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(ComYueKa.url, ComYueKaView);
		fgui.UIObjectFactory.setExtension(ComOfferRewardTask.url, ComOfferRewardTaskView);
		fgui.UIObjectFactory.setExtension(ComResureCoin.url, ComResureCoinView);
		fgui.UIObjectFactory.setExtension(RenderOverviewTab.url, RenderOverviewTabView);
		fgui.UIObjectFactory.setExtension(ComQuestionair.url, ComQuestionairView);
		fgui.UIObjectFactory.setExtension(ComNiuDan.url, ComNiuDanView);
		fgui.UIObjectFactory.setExtension(UIActivityOverview.url, UIActivityOverviewView);
		fgui.UIObjectFactory.setExtension(ComQingYun.url, ComQingYunView);
		fgui.UIObjectFactory.setExtension(ComMatchRot.url, ComMatchRotView);
	}
}