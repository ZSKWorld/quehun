import RenderLiaoSheDecoType from "../../../../ui/PkgMain/RenderLiaoSheDecoType";

export const enum ERenderLiaoSheDecoTypeMsg {

}

export class RenderLiaoSheDecoTypeView extends RenderLiaoSheDecoType {

	override onCreate() {

	}

	refresh(data: ProtoObject<IViewSlot>, titleStrId: number, defaultNameStrId?: number, defaultIcon?: string) {
		const { item_id, type, item_id_list } = data;
		const { com_item, txt_name } = this;
		this.title = $lang(titleStrId);

		if (type && item_id_list.length)
			txt_name.text = $lang(3752, item_id_list.length);
		else if (item_id)
			txt_name.text = $itemUtil.getItemInfo(item_id).name;
		else
			txt_name.text = $lang(defaultNameStrId);

		if (!type && item_id) com_item.refreshItemIcon(item_id);
		else com_item.refreshSkin(defaultIcon);
	}
}
