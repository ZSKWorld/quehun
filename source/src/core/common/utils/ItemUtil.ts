@Singleton
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
				const cfgCurrency = $cfgMgr.item_definition.currency[id];
				if (!cfgCurrency) break;
				name = cfgCurrency.langField(ECfgLangField.name);
				icon = cfgCurrency.icon;
				itemIcon = cfgCurrency.icon_jpg;
				desc = cfgCurrency.langField(ECfgLangField.desc);
				break;
			case EItemType.Character:
				const cfgCharacter = $cfgMgr.item_definition.character[id];
				if (!cfgCharacter) break;
				name = cfgCharacter.langField(ECfgLangField.name);
				desc = cfgCharacter.langField(ECfgLangField.desc_item);
				const skinItemInfo = this.getItemInfo(cfgCharacter.init_skin);
				icon = skinItemInfo.icon;
				itemIcon = skinItemInfo.itemIcon;
				Object.assign(skinInfo, skinItemInfo.skinInfo);
				break;
			case EItemType.Item:
				const cfgItem = $cfgMgr.item_definition.item[id];
				if (!cfgItem) break;

				name = cfgItem.langField(ECfgLangField.name);
				icon = cfgItem.icon_transparent;
				itemIcon = cfgItem.icon;
				desc = cfgItem.langField(ECfgLangField.desc);
				func = cfgItem.langField(ECfgLangField.desc_func);

				switch (cfgItem.category) {
					case EItemCategory.Common:
						const cfgView = $cfgMgr.item_definition.view[id];
						switch (cfgItem.type) {
							case EItemCommonType.TableCloth:
								cfgView && (resName = cfgView.res_name);
								previewIcon = `myres2/tablecloth/${ resName }/preview.png`;
								break;
							case EItemCommonType.MjpBack:
								cfgView && (resName = cfgView.res_name);
								previewIcon = `myres2/mjp/${ resName }/preview.png`;
								resPath = `myres2/mjp/${ resName }/hand/`;
								atlasPath = `myres2/mjp/${ resName }/hand.atlas`;
								atlasTexPath = `myres2/mjp/${ resName }/hand.png`;
								break;
							case EItemCommonType.MjpFront:
								cfgView && (resName = cfgView.res_name);
								previewIcon = `myres2/mjp_surface/${ resName }/preview.png`;
								resPath = `myres2/mjpm/${ resName }/ui/`;
								atlasPath = `myres2/mjp_surface/${ resName }/ui.atlas`;
								atlasTexPath = `myres2/mjp_surface/${ resName }/ui.png`;
								break;
							case EItemCommonType.HeadFrame:
								cfgView && (resName = cfgView.res_name);
								icon = `extendRes/head_frame/${ resName }.png`;
								break;
							case EItemCommonType.ChaHuaLoadingTu:
								const cfgLoading = $cfgMgr.item_definition.loading_image[id];
								cfgLoading && (icon = cfgLoading.thumb_path);
								cfgLoading && (itemIcon = cfgLoading.thumb_path);
								cfgLoading && (resPath = cfgLoading.img_path);
								break;
							case EItemCommonType.DaTingBeiJing:
								cfgView && (resName = cfgView.res_name);
								previewIcon = `myres2/lobby_bg/${ resName }.jpg`;
								break;
							case EItemCommonType.BeiJingYinYue:
								const cfgBgm = $cfgMgr.audio.bgm[id];
								resPath = `res/audio/${ cfgBgm.path }`;
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
				const cfgSkin = $cfgMgr.item_definition.skin[id];
				if (!cfgSkin) break;
				name = cfgSkin.langField(ECfgLangField.name);
				desc = cfgSkin.langField(ECfgLangField.desc);
				icon = cfgSkin.path + "/bighead.png";
				itemIcon = icon;

				skinInfo.bighead = $langRes(icon);
				skinInfo.full = $langRes(cfgSkin.path + "/full.png");
				skinInfo.half = $langRes(cfgSkin.path + "/half.png");
				skinInfo.smallhead = $langRes(cfgSkin.path + "/smallhead.png");
				skinInfo.smallhead1 = $langRes(cfgSkin.path + "/smallhead1.png");
				skinInfo.smallhead2 = $langRes(cfgSkin.path + "/smallhead2.png");
				skinInfo.smallhead3 = $langRes(cfgSkin.path + "/smallhead3.png");
				skinInfo.waitingroom = $langRes(cfgSkin.path + "/waitingroom.png");
				skinInfo.x = $langRes(cfgSkin.path + "/x.png");

				break;
			case EItemType.Title:
				const cfgTitle = $cfgMgr.item_definition.title[id];
				if (!cfgTitle) break;
				name = cfgTitle.langField(ECfgLangField.name);
				desc = cfgTitle.langField(ECfgLangField.desc);
				icon = cfgTitle.icon;
				itemIcon = cfgTitle.icon_item;
				break;
			case EItemType.FuncItem:
				const cfgFuncItem = $cfgMgr.item_definition.function_item[id];
				if (!cfgFuncItem) break;
				name = $lang(cfgFuncItem.name);
				icon = cfgFuncItem.icon_transparent;
				itemIcon = cfgFuncItem.icon;
				desc = $lang(cfgFuncItem.desc);
				func = $lang(cfgFuncItem.desc_func);
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
			skinInfo: skinInfo
		};
		return $gameUtil.freeze(this._itemView[id]);
	}
}
