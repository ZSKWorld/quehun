/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UILiaoShe from "./UILiaoShe";
import { UILiaoSheView } from "../../view/PkgMain/view/UILiaoSheView";
import ComMatchItem from "./ComMatchItem";
import { ComMatchItemView } from "../../view/PkgMain/view/coms/ComMatchItemView";
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