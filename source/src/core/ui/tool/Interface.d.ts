declare interface IRichText {
	get text(): string;
	/** 
	 * 超链接 
	 * @param url 链接地址
	 * @param text 可选：为空包装当前文本，否则包装传入文本
	 */
	href(url: string, text?: string): IRichText;
	/** 添加图片 */
	img(url: string, width?: number, height?: number): IRichText;
	/**
	 * 粗体
	 * @param text 可选：为空包装当前文本，否则包装传入文本
	 */
	bold(text?: string): IRichText;
	/**
	 * 斜体
	 * @param text 可选：为空包装当前文本，否则包装传入文本
	 */
	italic(text?: string): IRichText;
	/**
	 * 下划线
	 * @param text 可选：为空包装当前文本，否则包装传入文本
	 */
	underline(text?: string): IRichText;
	/**
	 * 添加空格
	 * @param count default 1
	 */
	space(count?: number): IRichText;
	/**
	 * 添加换行
	 * @param count default 1
	 */
	break(count?: number): IRichText;
	/**
	 * 字号
	 * @param size 字号
	 * @param text 可选：为空包装当前文本，否则包装传入文本
	 */
	size(size: number, text?: string): IRichText;
	/**
	 * 颜色
	 * @param color 颜色
	 * @param text 可选：为空包装当前文本，否则包装传入文本
	 */
	color(color: EColorString, text?: string): IRichText;
	/** 追加文本 */
	append(text: string): IRichText;
	/** 结束并返回富文本 */
	end(): string;
}

declare interface ITipManager {
	/**
	 * 显示文本提示
	 * @param text 显示的文本，支持富文本
	 */
	showTip(text: string): void;
}

declare interface IUIUtil {
	/**
	 * 获取gui图集贴图
	 * @param pkg 包名
	 * @param name 贴图名字
	 * @returns
	 */
	getFGUITexture(pkg: string, name: string): Laya.Texture;

	/**
	 * 设置list
	 * @param list {@link fgui.GList} list组件
	 * @param virtual 虚拟列表 default true
	 * @param caller 调用者
	 * @param renderFunc 渲染回调
	 * @param clickFunc 点击回调
	 */
	setList(
		list: fgui.GList,
		virtual?: boolean,
		caller?: any,
		renderFunc?: (index?: number, item?: any) => void,
		clickFunc?: (item?: any, evt?: Laya.Event, index?: number) => void
	): void;

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
		showItemCount?: number
	): void;

	popAlphaIn(panel: fgui.GObject): Promise<void>;
	popAlphaOut(panel: fgui.GObject): Promise<void>;
	playTrans(trans: fgui.Transition, reverse?: boolean): Promise<void>;
	refreshLevel(comp: {
		ctrl_ht?: fgui.Controller,
		ctrl_star?: fgui.Controller,
		loader_icon?: fgui.GLoader,
		txt_htLevel?: fgui.GTextField,
		txt_htScore?: fgui.GTextField,
	}, data: IAccountLevel): void;
	parseUBBText(str: string, hrefColor?: string): string;
}