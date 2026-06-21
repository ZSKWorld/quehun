import RenderLiaoSheDecoType from "../../../../ui/PkgMain/RenderLiaoSheDecoType";

export const enum ERenderLiaoSheDecoTypeMsg {

}

export class RenderLiaoSheDecoTypeView extends ExtendClass<IView, RenderLiaoSheDecoType>(RenderLiaoSheDecoType) implements IView {

	override onCreate() {

	}

	refresh(data: ProtoObject<IViewSlot>, titleStrId: number, defaultNameStrId?: number, defaultIcon?: string) {
		const { item_id, type } = data;
		const { com_item, txt_name } = this;
		this.title = $lang(titleStrId);
		txt_name.text = item_id ? $itemUtil.getItemInfo(item_id).name : $lang(defaultNameStrId);
		if (type == 0 && item_id) com_item.refreshItemIcon(item_id);
		else com_item.refreshSkin(defaultIcon);
	}
}
