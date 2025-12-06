/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { UIBindPhoneView } from "../../view/PkgLogin/view/uis/UIBindPhoneView";
import { UILoginQueueView } from "../../view/PkgLogin/view/uis/UILoginQueueView";
import { UILoginView } from "../../view/PkgLogin/view/uis/UILoginView";
import UIBindPhone from "./UIBindPhone";
import UILogin from "./UILogin";
import UILoginQueue from "./UILoginQueue";

export default class PkgLoginBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(UILoginQueue.url, UILoginQueueView);
		fgui.UIObjectFactory.setExtension(UIBindPhone.url, UIBindPhoneView);
		fgui.UIObjectFactory.setExtension(UILogin.url, UILoginView);
	}
}