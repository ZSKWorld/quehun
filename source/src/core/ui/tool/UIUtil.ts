
/** UI工具类 */
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
	setList(
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
	setCombox(
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
				.parallel(panel).duration(150).ease(Laya.Ease.backIn).to("alpha", 0)
				.parallel(panel).duration(150).ease(Laya.Ease.backIn).to("scaleX", 0.6).to("scaleY", 0.6)
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
			ctrl_star && (ctrl_star.selectedIndex = 0);
		}
	}
}