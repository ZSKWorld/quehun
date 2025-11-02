import { BaseVO } from "./BaseVO";

export class RechargeVO extends BaseVO implements VO.IRechargeVO {

	/** 欠款订单列表 */
	orders: ProtoObject<IResFetchRefundOrder_OrderInfo>[];
	/** 最后补款时间 */
	clear_deadline: number;
	/** 提示消息 */
	message: ProtoObject<II18nContext>[];

	@InterestMessage(EMessageID.fetchRefundOrder)
	private onFetchRefundOrder(data: IResFetchRefundOrder) {
		if (!data || data.error) return;
		this.orders = data.orders.map(v => this.decodeProtoData(v));
		this.clear_deadline = data.clear_deadline;
		this.message = data.message.map(v => this.decodeProtoData(v));
	}
}