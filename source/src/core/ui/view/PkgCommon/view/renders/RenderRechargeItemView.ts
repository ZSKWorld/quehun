import RenderRechargeItem from "../../../../ui/PkgCommon/RenderRechargeItem";

export const enum ERenderRechargeItemMsg {

}

export class RenderRechargeItemView extends RenderRechargeItem {

	override onCreate() {

	}

	refresh(id: number, count: number, gotReward: boolean) {
		const { com_item, txt_count, img_gotReward } = this;
		com_item.refreshItemIcon(id);
		txt_count.text = count.toString();
		img_gotReward.visible = !!gotReward;
	}
}
