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
	isTopView(viewId: EUIViewID): boolean;

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
