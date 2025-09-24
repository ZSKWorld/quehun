import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { UIUtil } from "../../../tool/UIUtil";

interface IConfirmView extends IView {
    ctrl_format: fgui.Controller;
    txt_title: fgui.GTextField;
    txt_content?: fgui.GTextField;
    label_content?: fgui.GLabel;
    btn_close: fgui.GButton;
    btn_confirm: fgui.GButton;
    btn_cancel: fgui.GButton;
}
export abstract class ConfirmBaseMediator<V extends IConfirmView = IConfirmView, D extends IUIConfirmData = IUIConfirmData> extends MediatorBase<V, D> {
    protected _datas: IUIConfirmData[] = [];
    override onEnable() {
        Logger.error("onEnable");
        this.refreshView();
    }

    override onDisable() {
        Logger.error("onDisable");
    }

    override onOpenAni() { return UIUtil.popAlphaIn(this.view); }
    override onCloseAni() { return UIUtil.popAlphaOut(this.view); }

    protected refreshView() {
        const { data, view } = this;
        const { ctrl_format, txt_title, txt_content, label_content } = view;
        ctrl_format.selectedIndex = data.format || 0;
        txt_title.text = data.title || "";
        txt_content && (txt_content.text = data.content || "");
        label_content && (label_content.text = data.content || "");
    }

    protected onBtnConfirmClick() {

    }
}