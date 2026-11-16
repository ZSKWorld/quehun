import LabelName from "../../../../ui/PkgCommon/LabelName";

export const enum ELabelNameMsg {

}

export class LabelNameView extends LabelName {

	override onCreate() {

	}
	
	refresh(data: { account_id: number, nickname: string, verified: number; }) {
		const { img_vip } = this;
		this.title = $uiUtil.getHidedName(data);
		const isVip = !!data.verified;
		img_vip.visible = isVip;
		img_vip.width = isVip ? img_vip.height : 0;
	}
}
