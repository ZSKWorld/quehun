import RenderBagIllustItem from "../../../../ui/PkgMain/RenderBagIllustItem";

export const enum ERenderBagIllustItemMsg {

}

export class RenderBagIllustItemView extends ExtensionClass<IView, RenderBagIllustItem>(RenderBagIllustItem) implements IView {

	override onCreate() {

	}

	refresh(data: ISheetData_ItemDefinition_LoadingImage, choosed: boolean) {
		const { ctrl_type, com_item, img_choose, txt_name, txt_time } = this;
		img_choose.visible = choosed;
		let cgId = 0;
		for (let i = 0; i < data.unlock_items.length; i++) {
			const v = data.unlock_items[i];
			if (v && $user.bag.getItemCount(v) > 0) {
				const cfgItem = $cfgMgr.item_definition.item[v];
				if (cfgItem.item_expire) {
					cgId = v;
				} else {
					cgId = v;
					break;
				}
			}
		}
		const cfgItem = $cfgMgr.item_definition.item[cgId];
		const expired = !!cfgItem.item_expire;
		ctrl_type.selectedIndex = expired ? 1 : 0;
		com_item.refreshLoadingImage(data.id);
		txt_name.text = cfgItem.langField("name");
		expired && (txt_time.text = $lang(3119) + cfgItem.langField("expire_desc"));
	}
}
