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

declare interface IUIGetRewardData {
	rewards: IRewardSlot[];
}

declare interface IUIRechargeData {
	currencyType?: ECurrencyType;
}

declare interface IUIBuyGoodsData {
	/**
	 * 0：单个购买
	 * 1：cg购买
	 * 2：多个购买1
	 * 3：多个购买2
	 */
	type: 0 | 1 | 2 | 3;
	/** 购买的物品id */
	id: number;
	/** 花费的货币id */
	currencyId: number;
	/** 单价 */
	price: number;
	/** 单价可购买的数量，default: 1 */
	priceCount?: number;
	/** 是否显示已有数量，defalt: false */
	showOwn?: boolean;
	/** 最大购买数量，default: -1, 小于等于0为无限制*/
	max?: number;
	/** 剩余数量字符串，有可能“本月剩余5”这样的描述 */
	last?: string;
	/** 标题 */
	title?: string;
	/** 多个购买时的二级描述 */
	multiDesc?: string;
	onBuy?: (count: number) => void;
}

declare interface IUIPaymentData {
	id: number;
	debtId?: string;
}
