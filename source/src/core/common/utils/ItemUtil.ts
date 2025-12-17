export class ItemUtil implements IItemUtil {

	getItemType(id: number) {
		const n = id > 1000000 ? Math.floor(id / 1000000) : Math.floor(id / 10000);
		if (n == 10) return EItemType.Currency;
		if (n == 20) return EItemType.Character;
		if (n == 30) return EItemType.Item;
		if (n == 40) return EItemType.Skin;
		if (n == 60) return EItemType.Title;
		if (n == 70) return EItemType.FuncItem;
	}

	private _itemView: KeyMap<IItemView> = {};
	getItemView(id: number) {
		if (this._itemView[id]) return this._itemView[id];
		const idType = this.getItemType(id);
		let name = "", icon = "", itemIcon = "", desc = "", func: string;
		switch (idType) {
			case EItemType.Currency:
				const currencyCfg = $cfgMgr.item_definition.currency[id];
				if (currencyCfg) {
					name = $langCfg(currencyCfg, "name");
					icon = currencyCfg.icon;
					itemIcon = currencyCfg.icon_jpg;
					desc = $langCfg(currencyCfg, "desc");
				}
				break;
			case EItemType.Character:
				const characterCfg = $cfgMgr.item_definition.character[id];
				if (characterCfg) {
					const d_skin = $cfgMgr.item_definition.skin[characterCfg.init_skin];
					name = $langCfg(characterCfg, "name");
					icon = d_skin.path + '/bighead.png';
					desc = $langCfg(characterCfg, "desc_item");
				}
				break;
			case EItemType.Item:
				const itemCfg = $cfgMgr.item_definition.item[id];
				if (itemCfg) {
					name = $langCfg(itemCfg, "name");
					icon = itemCfg.icon_transparent;
					itemIcon = itemCfg.icon;
					desc = $langCfg(itemCfg, "desc");
					func = $langCfg(itemCfg, "desc_func");
					if (itemCfg.category == EItemCategory.Common && itemCfg.type == EItemCommonType.HeadFrame) {
						const viewCfg = $cfgMgr.item_definition.view[id];
						icon = viewCfg ? `extendRes/head_frame/${ viewCfg.res_name }.png` : "";
					}
				}
				break;
			case EItemType.Skin:
				const skinCfg = $cfgMgr.item_definition.skin[id];
				if (skinCfg) {
					name = $langCfg(skinCfg, "name");
					icon = skinCfg.path + '/bighead.png';
					desc = $langCfg(skinCfg, "desc");
				}
				break;
			case EItemType.Title:
				const titleCfg = $cfgMgr.item_definition.title[id];
				if (titleCfg) {
					name = $langCfg(titleCfg, "name");
					icon = titleCfg.icon;
					itemIcon = titleCfg.icon_item;
					desc = $langCfg(titleCfg, "desc");
				}
				icon = icon || "extendRes/title/notitle.png";
				break;
			case EItemType.FuncItem:
				const funcItemCfg = $cfgMgr.item_definition.function_item[id];
				if (funcItemCfg) {
					name = $lang(funcItemCfg.name);
					icon = funcItemCfg.icon_transparent;
					itemIcon = funcItemCfg.icon;
					desc = $lang(funcItemCfg.desc);
					func = $lang(funcItemCfg.desc_func);
				}
				break;
		}
		this._itemView[id] = { name, icon: $langRes(icon), itemIcon: $langRes(itemIcon), desc, func };
		return this._itemView[id];
	}
}
