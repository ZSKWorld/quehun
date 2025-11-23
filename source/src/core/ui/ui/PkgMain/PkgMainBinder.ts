/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UILiaoShe from "./UILiaoShe";
import { UILiaoSheView } from "../../view/PkgMain/view/UILiaoSheView";
import ComMatchItem from "./ComMatchItem";
import { ComMatchItemView } from "../../view/PkgMain/view/coms/ComMatchItemView";
import ComRankItem from "./ComRankItem";
import { ComRankItemView } from "../../view/PkgMain/view/coms/ComRankItemView";
import UIActivity from "./UIActivity";
import { UIActivityView } from "../../view/PkgMain/view/UIActivityView";
import UIEmail from "./UIEmail";
import { UIEmailView } from "../../view/PkgMain/view/UIEmailView";
import UIRank from "./UIRank";
import { UIRankView } from "../../view/PkgMain/view/UIRankView";
import UIAnnouncement from "./UIAnnouncement";
import { UIAnnouncementView } from "../../view/PkgMain/view/UIAnnouncementView";
import UISetting from "./UISetting";
import { UISettingView } from "../../view/PkgMain/view/UISettingView";
import UIHelp from "./UIHelp";
import { UIHelpView } from "../../view/PkgMain/view/UIHelpView";
import UICamera from "./UICamera";
import { UICameraView } from "../../view/PkgMain/view/UICameraView";
import UIAchievement from "./UIAchievement";
import { UIAchievementView } from "../../view/PkgMain/view/UIAchievementView";
import BtnEmailTab from "./BtnEmailTab";
import { BtnEmailTabView } from "../../view/PkgMain/view/btns/BtnEmailTabView";
import UIFriend from "./UIFriend";
import { UIFriendView } from "../../view/PkgMain/view/UIFriendView";
import UIObserver from "./UIObserver";
import { UIObserverView } from "../../view/PkgMain/view/UIObserverView";
import UIPaipu from "./UIPaipu";
import { UIPaipuView } from "../../view/PkgMain/view/UIPaipuView";
import UIBag from "./UIBag";
import { UIBagView } from "../../view/PkgMain/view/UIBagView";
import UIShop from "./UIShop";
import { UIShopView } from "../../view/PkgMain/view/UIShopView";
import UITreasure from "./UITreasure";
import { UITreasureView } from "../../view/PkgMain/view/UITreasureView";
import UIMain from "./UIMain";
import { UIMainView } from "../../view/PkgMain/view/UIMainView";
import BtnXunMi from "./BtnXunMi";
import { BtnXunMiView } from "../../view/PkgMain/view/btns/BtnXunMiView";
import ComMatchMode from "./ComMatchMode";
import { ComMatchModeView } from "../../view/PkgMain/view/coms/ComMatchModeView";
import ComMatchContent from "./ComMatchContent";
import { ComMatchContentView } from "../../view/PkgMain/view/coms/ComMatchContentView";

export default class PkgMainBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(UILiaoShe.url, UILiaoSheView);
		fgui.UIObjectFactory.setExtension(ComMatchItem.url, ComMatchItemView);
		fgui.UIObjectFactory.setExtension(ComRankItem.url, ComRankItemView);
		fgui.UIObjectFactory.setExtension(UIActivity.url, UIActivityView);
		fgui.UIObjectFactory.setExtension(UIEmail.url, UIEmailView);
		fgui.UIObjectFactory.setExtension(UIRank.url, UIRankView);
		fgui.UIObjectFactory.setExtension(UIAnnouncement.url, UIAnnouncementView);
		fgui.UIObjectFactory.setExtension(UISetting.url, UISettingView);
		fgui.UIObjectFactory.setExtension(UIHelp.url, UIHelpView);
		fgui.UIObjectFactory.setExtension(UICamera.url, UICameraView);
		fgui.UIObjectFactory.setExtension(UIAchievement.url, UIAchievementView);
		fgui.UIObjectFactory.setExtension(BtnEmailTab.url, BtnEmailTabView);
		fgui.UIObjectFactory.setExtension(UIFriend.url, UIFriendView);
		fgui.UIObjectFactory.setExtension(UIObserver.url, UIObserverView);
		fgui.UIObjectFactory.setExtension(UIPaipu.url, UIPaipuView);
		fgui.UIObjectFactory.setExtension(UIBag.url, UIBagView);
		fgui.UIObjectFactory.setExtension(UIShop.url, UIShopView);
		fgui.UIObjectFactory.setExtension(UITreasure.url, UITreasureView);
		fgui.UIObjectFactory.setExtension(UIMain.url, UIMainView);
		fgui.UIObjectFactory.setExtension(BtnXunMi.url, BtnXunMiView);
		fgui.UIObjectFactory.setExtension(ComMatchMode.url, ComMatchModeView);
		fgui.UIObjectFactory.setExtension(ComMatchContent.url, ComMatchContentView);
	}
}