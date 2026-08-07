/**
 * 大号弹窗
 * @param format 0-标题、内容、确认按钮
 * @param format 1-标题、内容
 * @param format 2-内容、确认按钮
 * @param format 3-内容、确认按钮、取消按钮
 * @param content 内容
 * @param title 标题
 */
declare function $confirmBig(format: 0 | 1 | 2 | 3, content: string, title?: string): Promise<boolean>;
/**
 * 中号弹窗
 * @param format 0-标题、内容、确认按钮
 * @param format 1-内容、确认按钮
 * @param content 内容
 * @param title 标题
 */
declare function $confirmMid(format: 0 | 1, content: string, title?: string): Promise<boolean>;
/**
 * 小号弹窗
 * @param format 0-标题、内容、确认按钮、取消按钮
 * @param format 1-内容
 * @param format 2-内容、确认按钮
 * @param format 3-内容、确认按钮、取消按钮
 * @param content 内容
 * @param title 标题
 */
declare function $confirmSma(format: 0 | 1 | 2 | 3, content: string, title?: string): Promise<boolean>;

/** 富文本 */
declare function $richText(text?: string): IRichText;
/** 本地化文本， str.str表 */
declare function $lang(id: number, ...args: any[]): string;
/** 本地化网络文本，info.error表 */
declare function $langNet(id: number, ...args: any[]): string;
/** 本地化资源，bin/langRes/xx/下的资源 */
declare function $langRes(url: string): string;
/** 显示网络错误码弹窗 */
declare function $showNetError(res: IError): void;

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

declare interface IDynamicResManager {
	add(path: string): void;
	remove(path: string): void;
	setLoader(loader: fgui.GLoader, path: string): void;
	setLoaders(loaders: fgui.GLoader[], pathes: string[]): void;
	clearLoader(loader: fgui.GLoader): void;
	clearLoaders(...loaders: fgui.GLoader[]): void;
}

declare interface IUIManager {
	/**
	 * 添加对象
	 * @param obj 要添加的对象
	 * @param layer 目标层级
	 * @param index 插入位置
	 * @returns
	 */
	addToLayer(obj: fgui.GObject, layer: ELayer, index?: number): void;

	/** 是否是最顶层ui */
	isTopView(viewId: EViewID): boolean;

	/**
	 * 打开页面
	 * @param viewId 页面id
	 * @param data 传入参数
	 * @param openType 页面打开对当前页面操作的类型 default {@link EViewOpenType.None}
	 */
	openView<T = any>(viewId: EUIViewID, data?: T, openType?: EViewOpenType): Promise<void>;

	/** 移除页面
	 * @param viewId 页面id
	 */
	closeView(viewId: EUIViewID): Promise<void>;

	/** 移除所有页面 */
	closeAllView(): void;

	destroyView(viewId: EUIViewID): void;
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