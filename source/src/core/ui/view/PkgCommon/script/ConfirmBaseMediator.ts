import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { UIUtil } from "../../../tool/UIUtil";

interface IConfirmView extends IView {
    ctrl_format: fgui.Controller;
    btn_close: fgui.GButton;
    txt_title: fgui.GTextField;
    txt_content: fgui.GTextField;
    btn_confirm: fgui.GButton;
    btn_cancel: fgui.GButton;
}
export abstract class ConfirmBaseMediator<V extends IView = IConfirmView, D = IUIConfirmData> extends MediatorBase<V, D> {
    protected _datas: IUIConfirmData[] = [];

    protected refreshView(data: IUIConfirmData) {

    }
    override onOpenAni() { return UIUtil.popAlphaIn(this.view); }
    override onCloseAni() { return UIUtil.popAlphaOut(this.view); }
}