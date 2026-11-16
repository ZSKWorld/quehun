const TempPoint = new Laya.Point();
const TempRect = new Laya.Rectangle();

/** UI工具类 */
@Singleton
export class UIUtil implements IUIUtil {
	/**
	 * 获取gui图集贴图
	 * @param pkg 包名
	 * @param name 贴图名字
	 * @returns
	 */
	getFGUITexture(pkg: string, name: string) {
		let temp = fgui.UIPackage.getItemByURL(fgui.UIPackage.getItemURL(pkg, name)).getBranch();
		temp = temp.getHighResolution();
		temp.load();
		return temp.texture;
	}

	/**
	 * 设置list
	 * @param list {@link fgui.GList} list组件
	 * @param virtual 虚拟列表?
	 * @param caller 调用者
	 * @param renderFunc 渲染回调
	 * @param clickFunc 点击回调
	 */
	initList(
		list: fgui.GList,
		virtual: boolean = true,
		caller?: any,
		renderFunc?: (index?: number, item?: any) => void,
		clickFunc?: (item?: any, evt?: Laya.Event, index?: number) => void,
	) {
		virtual && list.setVirtual();
		list.itemRenderer instanceof Laya.Handler && list.itemRenderer.recover();
		list.itemRenderer = null;
		if (renderFunc)
			list.itemRenderer = Laya.Handler.create(caller, renderFunc, null, false);
		clickFunc && list.on(fgui.Events.CLICK_ITEM, caller, clickFunc);
	}

	/**
	 * 设置下拉框
	 * @param cmb {@link fgui.GComboBox} 下拉框组件
	 * @param items item数组
	 * @param values value数组
	 * @param caller 调用者
	 * @param changedFunc changed回调
	 * @param defaultValue 默认值
	 * @param showItemCount 下拉显示数量
	 */
	initCombox(
		cmb: fgui.GComboBox,
		items: string[],
		values: any[],
		caller?: any,
		changedFunc?: (evt?: Laya.Event) => void,
		defaultValue?: any,
		showItemCount: number = 0,
	) {
		cmb.items = items;
		cmb.values = values;
		changedFunc && cmb.on(fgui.Events.STATE_CHANGED, caller, changedFunc);
		const index = values.indexOf(defaultValue);
		cmb.selectedIndex = index == -1 ? 0 : index;
		cmb.visibleItemCount = Math.floor(showItemCount) > 0 ? Math.floor(showItemCount) : items.length;
	}

	// setInputCheck(input: fgui.GTextInput, onInput: Laya.Handler) {
	// 	let duringComposition = false;
	// 	const onCompositionStart = (event) => {
	// 		// 输入中文开始
	// 		duringComposition = true;
	// 	};
	// 	const onCompositionEnd = (event) => {
	// 		// 输入中文结束
	// 		duringComposition = false;
	// 		onInput && onInput.run();
	// 	};
	// 	input.on(Laya.Event.FOCUS, null, () => {
	// 		input.nativeInput.nativeInput.addEventListener('compositionstart', onCompositionStart);
	// 		input.nativeInput.nativeInput.addEventListener('compositionend', onCompositionEnd);
	// 	});
	// 	input.on(Laya.Event.BLUR, null, () => {
	// 		input.nativeInput.nativeInput.removeEventListener('compositionstart', onCompositionStart);
	// 		input.nativeInput.nativeInput.removeEventListener('compositionend', onCompositionEnd);
	// 	});
	// 	input.on(Laya.Event.INPUT, null, () => !duringComposition && onInput && onInput.run());
	// }

	getWordsLen(str: string) {
		if (!str) return 0;
		let len = 0;
		for (let i = 0; i < str.length; i++) {
			if (str.charCodeAt(i) > 255) {
				len += 2;
			} else {
				len += 1;
			}
		}
		return len;
	}


	popAlphaIn(panel: fgui.GObject) {
		return new Promise<void>(resolve => {
			panel.alpha = 0;
			panel.setScale(0.6, 0.6);
			Laya.Tween.create()
				.parallel(panel).duration(150).ease(Laya.Ease.backOut).to("alpha", 1)
				.parallel(panel).duration(150).ease(Laya.Ease.backOut).to("scaleX", 1).to("scaleY", 1)
				.then(v => (v.owner.recover(), resolve()));
		});
	}

	popAlphaOut(panel: fgui.GObject) {
		return new Promise<void>(resolve => {
			Laya.Tween.create()
				.parallel(panel).duration(100).ease(Laya.Ease.sineOut).to("alpha", 0)
				.parallel(panel).duration(100).ease(Laya.Ease.sineOut).to("scaleX", 0.6).to("scaleY", 0.6)
				.then(v => (v.owner.recover(), resolve()));
		});
	}

	playTrans(trans: fgui.Transition, reverse?: boolean) {
		return new Promise<void>(resolve => {
			if (!trans) return resolve();
			if (reverse) trans.playReverse(Laya.Handler.create(null, resolve));
			else trans.play(Laya.Handler.create(null, resolve));
		});
	}

	refreshLevel(comp: {
		ctrl_ht: fgui.Controller,
		ctrl_star: fgui.Controller,
		loader_icon: fgui.GLoader,
		txt_htLevel?: fgui.GTextField,
		txt_htScore?: fgui.GTextField,
	}, data: IAccountLevel) {
		let id = data?.id || 10101, score = data?.score || 0;
		const { ctrl_ht, ctrl_star, loader_icon, txt_htLevel, txt_htScore } = comp;
		const levelCfg = $cfgMgr.level_definition.level_definition[id];
		const { primary_icon, primary_level, secondary_level } = levelCfg;
		const isHt = primary_level == 6;
		ctrl_ht && (ctrl_ht.selectedIndex = isHt ? 1 : 0);
		$dynamicResMgr.setLoader(loader_icon, $langRes(primary_icon));

		isHt && txt_htLevel && (txt_htLevel.text = String(secondary_level));
		isHt && txt_htScore && (txt_htScore.text = (Math.floor((score / 100) * 10) / 10).toFixed(1));
		if (!isHt) {
			ctrl_star && (ctrl_star.selectedIndex = secondary_level);
		}
	}

	parseUBBText(str: string, hrefColor: EColorString = EColorString._51f1ff) {
		if (!str) return str;
		return str
			.replace(/&/g, '&amp;')
			.replace(/\"/g, "&quot;")
			.replace(/\n/g, "<br/>")
			.replace(/<b>/g, "[b]")
			.replace(/<\/b>/g, "[/b]")
			.replace(/<color=(#\w+)>/g, "[color=$1]")
			.replace(/<\/color>/g, "[/color]")
			.replace(/<href=(.+?)>/g, `[color=${ hrefColor }][url=$1]`)
			.replace(/<\/href>/g, "[/url][/color]");
	}

	checkPointInGobject(x: number, y: number, obj: fgui.GObject) {
		if (!obj || obj.isDisposed) return false;
		obj.globalToLocal(x, y, TempPoint);
		return TempRect.setTo(0, 0, obj.width, obj.height).contains(TempPoint.x, TempPoint.y);
	}

	getRoomModeDesc(mode: number) {
		let smode = "";
		switch (mode) {
			//四人一局
			case 0: smode = $lang(2026); break;
			//四人东
			case 1: smode = $lang(2027); break;
			//四人南
			case 2: smode = $lang(2028); break;
			//四人人机
			case 3: smode = $lang(2029); break;
			//四人一局
			case 4: smode = $lang(2026); break;
			//三人一局
			case 10: smode = $lang(2030); break;
			//三人东
			case 11: smode = $lang(2031); break;
			//三人南
			case 12: smode = $lang(2032); break;
			//三人人机
			case 13: smode = $lang(2033); break;
			//三人一局
			case 14: smode = $lang(2030); break;
		}
		return smode;
	}

	getRecordTitle(tag: number, subtag: number) {
		let title = "";
		let matchModeData: ISheetData_Desktop_Matchmode;
		let mode: number;
		switch (tag) {
			case 1:
				title += $lang(2271) + "·";
				matchModeData = $cfgMgr.desktop.matchmode[subtag];
				if (matchModeData) {
					title += matchModeData.langField(ECfgLangField.room_name) + "·";
					mode = matchModeData.mode;
				}
				title += this.getRoomModeDesc(mode);
				break;
			case 2:
				title += $lang(2023) + "·";
				title += this.getRoomModeDesc(subtag);
				break;
			case 3:
				matchModeData = $cfgMgr.desktop.matchmode[subtag];
				title += matchModeData.langField(ECfgLangField.room_name) + "·";
				mode = matchModeData.mode;
				title += this.getRoomModeDesc(mode);
				break;
			case 4:
				title += $lang(2025) + "·";
				title += this.getRoomModeDesc(subtag);
				break;
		}
		return title;
	}

	getHidedName(data: { account_id: number, nickname: string, verified: number; }, flag?: EHideNameFlag) {
		return data.nickname;
	}

	getBigHuTile(type: EBigHuType) {
		switch (type) {
			/** 流满 */
			case EBigHuType.E_Dadian_Title_liuman:
			/** 无 */
			case EBigHuType.E_Dadian_Title_none: return "";
			/** 满贯 */
			case EBigHuType.E_Dadian_Title_manguan: return "ui://vx9zwserftegobm4";
			/** 跳满 */
			case EBigHuType.E_Dadian_Title_tiaoman: return "ui://vx9zwserftegobm1";
			/** 倍满 */
			case EBigHuType.E_Dadian_Title_beiman: return "ui://vx9zwserftegobm0";
			/** 三倍满 */
			case EBigHuType.E_Dadian_Title_sanbeiman: return "ui://vx9zwserftegoblz";
			/** 役满 */
			case EBigHuType.E_Dadian_Title_yiman: return "ui://vx9zwserftegobly";
			/** 两倍役满 */
			case EBigHuType.E_Dadian_Title_yiman2: return "ui://vx9zwserftegoblx";
			/** 三倍役满 */
			case EBigHuType.E_Dadian_Title_yiman3: return "ui://vx9zwserftegoblw";
			/** 四倍役满 */
			case EBigHuType.E_Dadian_Title_yiman4: return "ui://vx9zwserftegoblv";
			/** 五倍役满 */
			case EBigHuType.E_Dadian_Title_yiman5: return "ui://vx9zwserftegoblu";
			/** 六倍役满 */
			case EBigHuType.E_Dadian_Title_yiman6: return "ui://vx9zwserftegobm3";
			/** 累计役满 */
			case EBigHuType.E_Dadian_Title_leijiyiman: return "ui://vx9zwserftegobm2";
			default: return "";
		}
	}

	getMakaLevelTile(type: EMakaLevel) {
		switch (type) {
			case EMakaLevel.S_Plus: return "ui://PkgCommon/img_1012";
			case EMakaLevel.S: return "ui://PkgCommon/img_1011";
			case EMakaLevel.S_Minus: return "ui://PkgCommon/img_1010";
			case EMakaLevel.A_Plus: return "ui://PkgCommon/img_1008";
			case EMakaLevel.A: return "ui://PkgCommon/img_1007";
			case EMakaLevel.A_Minus: return "ui://PkgCommon/img_1006";
			case EMakaLevel.B_Plus: return "ui://PkgCommon/img_1005";
			case EMakaLevel.B: return "ui://PkgCommon/img_1004";
			case EMakaLevel.B_Minus: return "ui://PkgCommon/img_1003";
			case EMakaLevel.C_Plus: return "ui://PkgCommon/img_1002";
			case EMakaLevel.C: return "ui://PkgCommon/img_1001";
			case EMakaLevel.C_Minus: return "ui://PkgCommon/img_1000";
			case EMakaLevel.D_Plus: return "ui://PkgCommon/img_999";
			case EMakaLevel.D: return "ui://PkgCommon/img_998";
			case EMakaLevel.E: return "ui://PkgCommon/img_1009";
			default: return "";
		}
	}

	getRecordShareUrl(uuid: string, hideId: boolean) {
		const encryptAccountId = $gameUtil.encryptAccountId($user.account.accountId);
		const url = $gameMgr.linkUrl;
		if (hideId)
			return `${ $lang(2126) }:${ url }?paipu=${ this.encodeRecordId(uuid) }_a${ encryptAccountId }_2`;
		else
			return `${ $lang(2126) }:${ url }?paipu=${ uuid }_a${ encryptAccountId }`;
	}

	private encodeRecordId(uuid: string) {
		let s = "";
		let code0 = "0".charCodeAt(0);
		let codea = "a".charCodeAt(0);
		for (let i = 0; i < uuid.length; i++) {
			const c = uuid.charAt(i);
			const code = c.charCodeAt(0);
			let v = -1;
			if (code >= code0 && code < code0 + 10) {
				v = code - code0;
			} else if (code >= codea && code < codea + 26) {
				v = code - codea + 10;
			}
			if (v != -1) {
				v = (v + 17 + i) % 36;
				if (v < 10) s += String.fromCharCode(v + code0);
				else s += String.fromCharCode(v + codea - 10);
			} else {
				s += c;
			}
		}
		return s;
	}
}