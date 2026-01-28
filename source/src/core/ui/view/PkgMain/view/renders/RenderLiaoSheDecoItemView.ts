import RenderLiaoSheDecoItem from "../../../../ui/PkgMain/RenderLiaoSheDecoItem";

export const enum ERenderLiaoSheDecoItemMsg {

}

export class RenderLiaoSheDecoItemView extends ExtensionClass<IView, RenderLiaoSheDecoItem>(RenderLiaoSheDecoItem) implements IView {

	override onCreate() {

	}

	refresh(data: ProtoObject<IViewSlot>, titleStrId: number, defaultNameStrId?: number, defaultIcon?: string) {
		const { item_id, type } = data;
		const { com_item, txt_name } = this;
		this.title = $lang(titleStrId);
		txt_name.text = item_id ? $itemUtil.getItemView(item_id).name : $lang(defaultNameStrId);
		if (type == 0 && item_id) com_item.refreshItemIcon(item_id);
		else com_item.refreshSkin(defaultIcon);
	}
}
