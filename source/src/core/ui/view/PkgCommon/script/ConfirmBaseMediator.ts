import { MediatorBase } from "../../../../mvc/view/MediatorBase";

interface IConfirmView extends IView {
	ctrl_format: fgui.Controller;
	txt_title: fgui.GTextField;
	txt_content?: fgui.GTextField;
	label_content?: fgui.GLabel;
	btn_close: fgui.GButton;
	btn_confirm: fgui.GButton;
	btn_cancel: fgui.GButton;
}
export abstract class ConfirmBaseMediator<V extends IView, D extends IUIConfirmData = IUIConfirmData> extends MediatorBase<V, D> {
	protected _datas: IUIConfirmData[] = [];
	override onEnable() {
		this.refreshView();
	}

	protected refreshView() {
		const { data, view } = this;
		const { ctrl_format, txt_title, txt_content, label_content } = view as unknown as IConfirmView;
		ctrl_format.selectedIndex = data.format || 0;
		txt_title.text = data.title || "";
		txt_content && (txt_content.text = data.content || "");
		label_content && (label_content.text = data.content || "");
	}

	protected onBtnConfirmClick() {
		this.data.onConfirm?.run();
		this.closeSelf();
	}

	protected onBtnCancelClick() {
		this.data.onCancel?.run();
		this.closeSelf();
	}
}