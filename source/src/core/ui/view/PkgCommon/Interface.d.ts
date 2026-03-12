declare type IComTipInfoData = string;

declare interface IUIConfirmData {
	format: 0 | 1 | 2 | 3;
	title: string;
	content: string;
	onConfirm?: Laya.Handler;
	onCancel?: Laya.Handler;
}

declare interface IUIItemDetailData {
	/** 物品id */
	id: number;
	/**
	 * 1-背包
	 * 2-契约
	 * 3-送礼
	 */
	from?: 1 | 2 | 3;
}

declare interface IUILoadingData {

}