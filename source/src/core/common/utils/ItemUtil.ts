export class ItemUtil extends Singleton<ItemUtil>() implements IItemUtil {

	getItemType(id: number) {
		const n = id > 1000000 ? Math.floor(id / 1000000) : Math.floor(id / 10000);
		if (n == 10) return EItemType.Currency;
		if (n == 20) return EItemType.Character;
		if (n == 30) return EItemType.Item;
		if (n == 40) return EItemType.Skin;
		if (n == 60) return EItemType.Title;
		if (n == 70) return EItemType.FuncItem;
	}

	private _itemView: KeyMap<IItemInfo> = {};
	getItemInfo(id: number) {
		if (this._itemView[id]) return this._itemView[id];

		let name = "", icon = "", itemIcon = "", previewIcon = "", desc = "", func = "";
		let resName = "", resPath = "", atlasPath = "", atlasTexPath = "";

		const skinInfo: IItemInfo_SkinInfo = {
			bighead: "", full: "", half: "", smallhead: "", smallhead1: "", smallhead2: "",
			smallhead3: "", waitingroom: "", x: ""
		};

		switch (this.getItemType(id)) {
			case EItemType.Currency:
				const currencyCfg = $cfgMgr.item_definition.currency[id];
				if (!currencyCfg) break;
				name = $langCfg(currencyCfg, "name");
				icon = currencyCfg.icon;
				itemIcon = currencyCfg.icon_jpg;
				desc = $langCfg(currencyCfg, "desc");
				break;
			case EItemType.Character:
				const characterCfg = $cfgMgr.item_definition.character[id];
				if (!characterCfg) break;
				name = $langCfg(characterCfg, "name");
				desc = $langCfg(characterCfg, "desc_item");
				const skinItemInfo = this.getItemInfo(characterCfg.init_skin);
				icon = skinItemInfo.icon;
				itemIcon = skinItemInfo.itemIcon;
				Object.assign(skinInfo, skinItemInfo.skinInfo);
				break;
			case EItemType.Item:
				const itemCfg = $cfgMgr.item_definition.item[id];
				if (!itemCfg) break;

				name = $langCfg(itemCfg, "name");
				icon = itemCfg.icon_transparent;
				itemIcon = itemCfg.icon;
				desc = $langCfg(itemCfg, "desc");
				func = $langCfg(itemCfg, "desc_func");

				switch (itemCfg.category) {
					case EItemCategory.Common:
						const viewCfg = $cfgMgr.item_definition.view[id];
						switch (itemCfg.type) {
							case EItemCommonType.TableCloth:
								viewCfg && (resName = viewCfg.res_name);
								previewIcon = `myres2/tablecloth/${ resName }/preview.png`;
								break;
							case EItemCommonType.MjpBack:
								viewCfg && (resName = viewCfg.res_name);
								previewIcon = `myres2/mjp/${ resName }/preview.png`;
								resPath = `myres2/mjp/${ resName }/hand/`;
								atlasPath = `myres2/mjp/${ resName }/hand.atlas`;
								atlasTexPath = `myres2/mjp/${ resName }/hand.png`;
								break;
							case EItemCommonType.MjpFront:
								viewCfg && (resName = viewCfg.res_name);
								previewIcon = `myres2/mjp_surface/${ resName }/preview.png`;
								resPath = `myres2/mjpm/${ resName }/ui/`;
								atlasPath = `myres2/mjp_surface/${ resName }/ui.atlas`;
								atlasTexPath = `myres2/mjp_surface/${ resName }/ui.png`;
								break;
							case EItemCommonType.HeadFrame:
								viewCfg && (resName = viewCfg.res_name);
								icon = `extendRes/head_frame/${ resName }.png`;
								break;
							case EItemCommonType.ChaHuaLoadingTu:
								const loadingCfg = $cfgMgr.item_definition.loading_image[id];
								loadingCfg && (icon = loadingCfg.thumb_path);
								loadingCfg && (itemIcon = loadingCfg.thumb_path);
								loadingCfg && (resPath = loadingCfg.img_path);
								break;
						}
						break;
					case EItemCategory.TimeLimitedTitle:
						icon = itemIcon.replace("_item.jpg", ".png");
						break;
					default:
						break;
				}
				break;
			case EItemType.Skin:
				const skinCfg = $cfgMgr.item_definition.skin[id];
				if (!skinCfg) break;
				name = $langCfg(skinCfg, "name");
				desc = $langCfg(skinCfg, "desc");
				icon = skinCfg.path + "/bighead.png";
				itemIcon = icon;

				skinInfo.bighead = $langRes(icon);
				skinInfo.full = $langRes(skinCfg.path + "/full.png");
				skinInfo.half = $langRes(skinCfg.path + "/half.png");
				skinInfo.smallhead = $langRes(skinCfg.path + "/smallhead.png");
				skinInfo.smallhead1 = $langRes(skinCfg.path + "/smallhead1.png");
				skinInfo.smallhead2 = $langRes(skinCfg.path + "/smallhead2.png");
				skinInfo.smallhead3 = $langRes(skinCfg.path + "/smallhead3.png");
				skinInfo.waitingroom = $langRes(skinCfg.path + "/waitingroom.png");
				skinInfo.x = $langRes(skinCfg.path + "/x.png");

				break;
			case EItemType.Title:
				const titleCfg = $cfgMgr.item_definition.title[id];
				if (!titleCfg) break;
				name = $langCfg(titleCfg, "name");
				desc = $langCfg(titleCfg, "desc");
				icon = titleCfg.icon;
				itemIcon = titleCfg.icon_item;
				break;
			case EItemType.FuncItem:
				const funcItemCfg = $cfgMgr.item_definition.function_item[id];
				if (!funcItemCfg) break;
				name = $lang(funcItemCfg.name);
				icon = funcItemCfg.icon_transparent;
				itemIcon = funcItemCfg.icon;
				desc = $lang(funcItemCfg.desc);
				func = $lang(funcItemCfg.desc_func);
				break;
		}

		this._itemView[id] = {
			name,
			icon: $langRes(icon),
			itemIcon: $langRes(itemIcon),
			previewIcon: $langRes(previewIcon),
			desc,
			func,
			resName,
			resPath, //赋值地方处理$langRes，牌背牌面走的是图集路径
			atlasPath: $langRes(atlasPath),
			atlasTexPath: $langRes(atlasTexPath),
			skinInfo: Object.freeze(skinInfo)
		};
		return Object.freeze(this._itemView[id]);
	}
}
