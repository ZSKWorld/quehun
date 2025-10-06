/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UILoginQueue from "./UILoginQueue";
import { UILoginQueueView } from "../../view/PkgLogin/view/UILoginQueueView";
import UIBindPhone from "./UIBindPhone";
import { UIBindPhoneView } from "../../view/PkgLogin/view/UIBindPhoneView";
import UILogin from "./UILogin";
import { UILoginView } from "../../view/PkgLogin/view/UILoginView";

export default class PkgLoginBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(UILoginQueue.url, UILoginQueueView);
		fgui.UIObjectFactory.setExtension(UIBindPhone.url, UIBindPhoneView);
		fgui.UIObjectFactory.setExtension(UILogin.url, UILoginView);
	}
}