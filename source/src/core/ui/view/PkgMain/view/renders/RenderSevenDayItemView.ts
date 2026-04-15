import RenderSevenDayItem from "../../../../ui/PkgMain/RenderSevenDayItem";

export const enum ERenderSevenDayItemMsg {
	OnBtnQuestionClick = "RenderSevenDayItem_OnBtnQuestionClick",
	OnBtnGotoClick = "RenderSevenDayItem_OnBtnGotoClick",
}

export class RenderSevenDayItemView extends ExtensionClass<IView, RenderSevenDayItem>(RenderSevenDayItem) implements IView {

	override onCreate() {
		const { btn_question, btn_goto } = this;
		btn_question.onClick(this, this.sendEvent, [ERenderSevenDayItemMsg.OnBtnQuestionClick]);
		btn_goto.onClick(this, this.sendEvent, [ERenderSevenDayItemMsg.OnBtnGotoClick]);
	}

}
