declare namespace VO {
	interface ICommonViewVO {
		
		get use(): number;
		get views(): ProtoObject<IResAllcommonViews_Views>[];
		get curView(): ProtoObject<IResAllcommonViews_Views>;
	}
}