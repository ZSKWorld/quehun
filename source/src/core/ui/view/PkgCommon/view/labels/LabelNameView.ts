import LabelName from "../../../../ui/PkgCommon/LabelName";

export const enum ELabelNameMsg {

}

export class LabelNameView extends ExtensionClass<IView, LabelName>(LabelName) implements IView {

	override onCreate() {
		
	}

	refresh(data: { nickname: string, verified: number }) {
		const { img_vip } = this;
		this.title = data.nickname;
		const isVip = !!data.verified;
		img_vip.visible = isVip;
		img_vip.width = isVip ? img_vip.height : 0;
	}
}
