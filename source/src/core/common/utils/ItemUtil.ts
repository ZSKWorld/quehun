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
		let name: string, icon: string, desc: string, func: string;
		switch (idType) {
			case EItemType.Currency:
				const d_currency = $cfgMgr.item_definition.currency[id];
				if (d_currency) {
					name = $langCfg(d_currency, "name");
					icon = d_currency.icon_jpg;
					desc = $langCfg(d_currency, "desc");
				}
				break;
			case EItemType.Character:
				const d_character = $cfgMgr.item_definition.character[id];
				if (d_character) {
					const d_skin = $cfgMgr.item_definition.skin[d_character.init_skin];
					name = $langCfg(d_character, "name");
					icon = d_skin.path + '/bighead.png';
					desc = $langCfg(d_character, "desc_item");
				}
				break;
			case EItemType.Item:
				const d_item = $cfgMgr.item_definition.item[id];
				if (d_item) {
					name = $langCfg(d_item, "name");
					icon = d_item.icon;
					desc = $langCfg(d_item, "desc");
					func = $langCfg(d_item, "desc_func");
				}
				break;
			case EItemType.Skin:
				const d_skin = $cfgMgr.item_definition.skin[id];
				if (d_skin) {
					name = $langCfg(d_skin, "name");
					icon = d_skin.path + '/bighead.png';
					desc = $langCfg(d_skin, "desc");
				}
				break;
			case EItemType.Title:
				const d_title = $cfgMgr.item_definition.title[id];
				if (d_title) {
					name = $langCfg(d_title, "name");
					icon = d_title.icon_item;
					desc = $langCfg(d_title, "desc");
				}
				break;
			case EItemType.FuncItem:
				const d_function = $cfgMgr.item_definition.function_item[id];
				if (d_function) {
					name = $lang(d_function.name);
					icon = d_function.icon;
					desc = $lang(d_function.desc);
					func = $lang(d_function.desc_func);
				}
				break;
		}
		this._itemView[id] = { name, icon, desc, func };
		return this._itemView[id];
	}
}
