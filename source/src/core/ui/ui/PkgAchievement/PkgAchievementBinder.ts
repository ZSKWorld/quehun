/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UIAchievementDetail from "./UIAchievementDetail";
import RenderAchieveGroup from "./RenderAchieveGroup";
import ComAchieveGroup from "./ComAchieveGroup";
import ComAchieveStat from "./ComAchieveStat";
import ComAchieveRecent from "./ComAchieveRecent";
import UIAchievement from "./UIAchievement";
import { UIAchievementDetailView } from "../../view/PkgAchievement/view/uis/UIAchievementDetailView";
import { RenderAchieveGroupView } from "../../view/PkgAchievement/view/renders/RenderAchieveGroupView";
import { ComAchieveGroupView } from "../../view/PkgAchievement/view/coms/ComAchieveGroupView";
import { ComAchieveStatView } from "../../view/PkgAchievement/view/coms/ComAchieveStatView";
import { ComAchieveRecentView } from "../../view/PkgAchievement/view/coms/ComAchieveRecentView";
import { UIAchievementView } from "../../view/PkgAchievement/view/uis/UIAchievementView";

export default class PkgAchievementBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(UIAchievementDetail.url, UIAchievementDetailView);
		fgui.UIObjectFactory.setExtension(RenderAchieveGroup.url, RenderAchieveGroupView);
		fgui.UIObjectFactory.setExtension(ComAchieveGroup.url, ComAchieveGroupView);
		fgui.UIObjectFactory.setExtension(ComAchieveStat.url, ComAchieveStatView);
		fgui.UIObjectFactory.setExtension(ComAchieveRecent.url, ComAchieveRecentView);
		fgui.UIObjectFactory.setExtension(UIAchievement.url, UIAchievementView);
	}
}