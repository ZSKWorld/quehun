import RenderGetRewardItem from "../../../../ui/PkgCommon/RenderGetRewardItem";

export const enum ERenderGetRewardItemMsg {

}

export class RenderGetRewardItemView extends RenderGetRewardItem {

	refresh(data: IRewardSlot) {
		this.visible = !!data;
		if (!data) return;
		this.com_item.refreshItemIcon(data.id);
		this.txt_count.text = data.count.toString();
		this.txt_name.text = $itemUtil.getItemInfo(data.id).name;
	}
}
