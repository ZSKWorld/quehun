import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIRecordShareMsg, UIRecordShareView } from "../../view/uis/UIRecordShareView";

export class UIRecordShareMediator extends MediatorBase<UIRecordShareView, IUIRecordShareData> {

	override onAwake() {
		this.addEvent(EUIRecordShareMsg.OnBtnHideNameClick, this.onBtnHideNameClick);
		this.addEvent(EUIRecordShareMsg.OnBtnCopyClick, this.onBtnCopyClick);
		this.addEvent(EUIRecordShareMsg.OnBtnConfirmClick, this.onBtnConfirmClick);
	}

	override onEnable() {
		if (this.data.type)
			this.view.refreshLook();
		else
			this.view.refreshShare(this.data.uuid);
	}

	private onBtnHideNameClick() {
		this.view.refreshShare(this.data.uuid);
	}

	private onBtnCopyClick() {
		$gameUtil.copyText(this.view.inputText);
		this.closeSelf();
	}

	private onBtnConfirmClick() {
		const text = this.view.inputText;
		if (!text) return $confirmSma(2, $lang(3690));
		$tipMgr.showTip(`暂未实现查看其他牌谱！！！\n[color=#ff0000]${ text }[/color]`);
		this.closeSelf();
	}
}