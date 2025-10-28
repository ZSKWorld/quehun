
/** UI工具类 */
export class UIUtil {
	/**
	 * 获取gui图集贴图
	 * @param pkg 包名
	 * @param name 贴图名字
	 * @returns
	 */
	static getFGUITexture(pkg: string, name: string) {
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
	static setList(
		list: fgui.GList,
		virtual: boolean = true,
		caller?: any,
		renderFunc?: (index?: number, item?: any) => void,
		clickFunc?: (item?: any, evt?: Laya.Event) => void,
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
	static setCombox(
		cmb: fgui.GComboBox,
		items: string[],
		values: any[],
		caller?: any,
		changedFunc?: (evt?: Laya.Event) => void,
		defaultValue?: any,
		showItemCount?: number
	) {
		cmb.items = items;
		cmb.values = values;
		changedFunc && cmb.on(fgui.Events.STATE_CHANGED, caller, changedFunc);
		const index = values.indexOf(defaultValue);
		cmb.selectedIndex = index == -1 ? 0 : index;
		cmb.visibleItemCount = Math.floor(showItemCount) > 0 ? Math.floor(showItemCount) : items.length;
	}

	// static setInputCheck(input: fgui.GTextInput, onInput: Laya.Handler) {
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


	static popAlphaIn(panel: fgui.GObject) {
		return new Promise<void>(resolve => {
			panel.alpha = 0;
			panel.setScale(0, 0);
			Laya.Tween.killAll(panel);
			Laya.Tween.create()
				.parallel(panel).duration(150).ease(Laya.Ease.backOut).to("alpha", 1)
				.parallel(panel).duration(150).ease(Laya.Ease.backOut).to("scaleX", 1).to("scaleY", 1)
				.then(v => (v.owner.recover(), resolve()));
		});
	}

	static popAlphaOut(panel: fgui.GObject) {
		return new Promise<void>(resolve => {
			Laya.Tween.killAll(panel);
			Laya.Tween.create()
				.parallel(panel).duration(150).ease(Laya.Ease.backIn).to("alpha", 0.4)
				.parallel(panel).duration(150).ease(Laya.Ease.backIn).to("scaleX", 0).to("scaleY", 0)
				.then(v => (v.owner.recover(), resolve()));
		});
	}

	static playTrans(trans: fgui.Transition, reverse?: boolean) {
		return new Promise<void>(resolve => {
			if (!trans) return resolve();
			if (reverse) trans.playReverse(Laya.Handler.create(null, resolve));
			else trans.play(Laya.Handler.create(null, resolve));
		});
	}
}