/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UIRegister from "./UIRegister";
import { UIRegisterView } from "../../view/PkgLogin/view/UIRegisterView";
import UIEnterGame from "./UIEnterGame";
import { UIEnterGameView } from "../../view/PkgLogin/view/UIEnterGameView";
import UILoginWaitting from "./UILoginWaitting";
import { UILoginWaittingView } from "../../view/PkgLogin/view/UILoginWaittingView";
import UILogin from "./UILogin";
import { UILoginView } from "../../view/PkgLogin/view/UILoginView";

export default class PkgLoginBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(UIRegister.url, UIRegisterView);
		fgui.UIObjectFactory.setExtension(UIEnterGame.url, UIEnterGameView);
		fgui.UIObjectFactory.setExtension(UILoginWaitting.url, UILoginWaittingView);
		fgui.UIObjectFactory.setExtension(UILogin.url, UILoginView);
	}
}