declare interface IRichText {
	get text(): string;
	/** 添加超链接 */
	href(url: string): IRichText;
	/** 添加图片 */
	img(url: string, width?: number, height?: number): IRichText;
	/** 粗体 */
	bold(): IRichText;
	/** 斜体 */
	italic(): IRichText;
	/** 下划线 */
	underline(): IRichText;
	/** 添加空格 */
	space(count: number = 1): IRichText;
	/** 添加换行 */
	break(count: number = 1): IRichText;
	/** 设置大小 */
	size(size: number): IRichText;
	/** 设置颜色 */
	color(color: string): IRichText;
	/** 追加文本 */
	append(text: string): IRichText;
	/** 结束并返回富文本 */
	end(): string;
}

declare interface ITipManager {
	/**
	 * 显示文本提示
	 * @param text 显示文本
	 * @param color 文本颜色，默认："#ffffff"
	 */
	showTip(text: string, color?: string): void;
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
		clickFunc?: (item?: any, evt?: Laya.Event, index?:number) => void
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
}