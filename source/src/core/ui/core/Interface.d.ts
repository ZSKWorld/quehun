declare interface IDynamicResManager {
	add(path: string): void;
	remove(path: string): void;
	setLoader(loader: fgui.GLoader, path: string): void;
	clearLoader(loader: fgui.GLoader): void;
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
	isTopView(view: IMediator | IView): boolean;

	/**
	 * 打开页面
	 * @param viewId 页面id
	 * @param data 传入参数
	 * @param openType 页面打开对当前页面操作的类型 default {@link EViewOpenType.None}
	 */
	openView<T = any>(viewId: EViewID, data?: T, openType?: EViewOpenType): Promise<void>;

	/** 移除页面
	 * @param viewId 页面id
	 */
	closeView(viewId: EViewID): Promise<void>;

	/** 移除所有页面 */
	closeAllView(): void;

	destroyView(viewId: EViewID): void;
}
