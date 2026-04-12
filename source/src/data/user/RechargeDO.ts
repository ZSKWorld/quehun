import { BaseDO } from "./BaseDO";

export class RechargeDO extends BaseDO implements DO.IRechargeDO {

	/** 欠款订单列表 */
	orders: ProtoObject<IResFetchRefundOrder_OrderInfo>[];
	/** 最后补款时间 */
	clear_deadline: number;
	/** 提示消息 */
	message: ProtoObject<II18nContext>[];

	@InterestMessage(ENetMessage.fetchRefundOrder)
	private onFetchRefundOrder(res: IResFetchRefundOrder) {
		this.orders = res.orders.map($decodeProtoData);
		this.clear_deadline = res.clear_deadline;
		this.message = res.message.map($decodeProtoData);
	}
}