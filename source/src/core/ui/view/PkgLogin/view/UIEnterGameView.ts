import UIEnterGame from "../../../ui/PkgLogin/UIEnterGame";

export const enum UIEnterGameMsg {
    OnViewClick = "UIEnterGameMsg_OnViewClick",
}

export class UIEnterGameView extends ExtensionClass<IView, UIEnterGame>(UIEnterGame) implements IView {

	override onCreate() {
        this.onClick(this, this.sendEvent, [UIEnterGameMsg.OnViewClick]);
    }

}
