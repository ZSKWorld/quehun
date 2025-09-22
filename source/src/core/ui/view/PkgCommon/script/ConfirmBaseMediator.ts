import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { UIUtil } from "../../../tool/UIUtil";

export class ConfirmBaseMediator<V extends IView = IView, D = UIConfirmData> extends MediatorBase<V, D> {

    override onOpenAni() { return UIUtil.popAlphaIn(this.view); }
    override onCloseAni() { return UIUtil.popAlphaOut(this.view); }
}