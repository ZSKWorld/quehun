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
	initList<T extends fgui.GObject>(
		list: fgui.GList,
		virtual?: boolean,
		caller?: any,
		renderFunc?: (index?: number, item?: T) => void,
		clickFunc?: (item?: T, evt?: Laya.Event, index?: number) => void
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
	initCombox(
		cmb: fgui.GComboBox,
		items: string[],
		values: any[],
		caller?: any,
		changedFunc?: (evt?: Laya.Event) => void,
		defaultValue?: any,
		showItemCount?: number
	): void;

	/** 获取字符串字节长度，一个亚洲字占两个字符，一个英文字符占1个字符 */
	getWordsLen(str: string): number;
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
	/** 检查全局位置是否在目标范围内 */
	checkPointInGobject(x: number, y: number, obj: fgui.GObject): boolean;
	/**
	 * 0 四人一局
	 * 1 四人东
	 * 2 四人南
	 * 3 四人人机
	 * 4 四人一局
	 * 10 三人一局
	 * 11 三人东
	 * 12 三人南
	 * 13 三人人机
	 * 14 三人一局
	 * @param mode 房间模式
	 */
	getRoomModeDesc(mode: number): string;
	/**
	 * 获取牌谱标题 
	 *  【段位场=三段】：段位场-王座之间-四人南（段位场-x之间-局数信息）
	 *	【友人场=两段】：友人场-四人东（友人场-局数信息）
	 *	【活动场=两段】：修罗之战-四人东（活动场使用规则名-局数信息）
	 *	【赛事场=两段】：比赛场-四人东（比赛场-局数信息）
	 * @param tag 标题类型 1排位赛 2友人场 3活动场 4比赛场
	 * @param subtag 子标签，根据tag来 tag=1/3 就是matchmode.id，tag=2/4 就是mode.mode
	 */
	getRecordTitle(tag: number, subtag: number): string;
	/** 获取隐藏后的昵称 */
	getHidedName(data: { account_id: number, nickname: string, verified: number; }, flag?: EHideNameFlag): string;
	/** 获取大胡图标 */
	getBigHuTile(type: EBigHuType): string;
	/** 获取maka等级图标 */
	getMakaLevelTile(type: EMakaLevel): string;
}