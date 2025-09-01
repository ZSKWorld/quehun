import UITest from "../../../ui/PkgTest/UITest";

export const enum UITestMsg {

}

export class UITestView extends ExtensionClass<IView, UITest>(UITest) implements IView {

    override onCreate() {

    }

}
