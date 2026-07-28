declare namespace DO {
	interface ICommonViewDO {

		get use(): number;
		get views(): ProtoObject<IResAllcommonViews_Views>[];
		get usingView(): ProtoObject<IResAllcommonViews_Views>;
		get curMjpBack(): number;
		get curMjpFront(): number;
		get curTableCloth(): number;
		get curLobbyBg(): number;
		/** 是否是默认装扮 */
		isDefaultView(id: number): boolean;
		/** 获取默认装扮id */
		getDefaultViewId(type: EItemCommonType): number;
	}
}