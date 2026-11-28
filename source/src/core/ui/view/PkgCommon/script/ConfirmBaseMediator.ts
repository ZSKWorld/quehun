import { MediatorBase } from "../../../../mvc/view/MediatorBase";

interface IConfirmView {
	ctrl_format: fgui.Controller;
	txt_title: fgui.GTextField;
	btn_mask?: fgui.GButton;
	txt_content?: fgui.GTextField;
	label_content?: fgui.GLabel;
	btn_close: fgui.GButton;
	btn_confirm: fgui.GButton;
	btn_cancel: fgui.GButton;
}
export abstract class ConfirmBaseMediator<V extends IView, D extends IUIConfirmData = IUIConfirmData> extends MediatorBase<V, D> {
	protected _datas: IUIConfirmData[] = [];
	private _confirmed: boolean = false;
	override onEnable() {
		this._confirmed = false;
		this.refreshView();
	}

	override onDisable() {
		if (this._confirmed)
			$gameUtil.safeCall(this.data.onConfirm);
		else
			$gameUtil.safeCall(this.data.onCancel);
	}

	protected refreshView() {
		const { data, view } = this;
		const { ctrl_format, txt_title, btn_mask, txt_content, label_content } = view as unknown as IConfirmView;
		ctrl_format.selectedIndex = data.format || 0;
		txt_title.text = data.title || "";
		if (txt_content) {
			txt_content.align = data.align || EAlignType.Center;
			txt_content.text = data.content || "";
		}
		label_content && (label_content.text = data.content || "");

		if (data.maskClose) btn_mask?.onClick(this, this.closeSelf);
		else btn_mask?.offClick(this, this.closeSelf);
	}

	protected onBtnConfirmClick() {
		this._confirmed = true;
		this.closeSelf();
	}
}