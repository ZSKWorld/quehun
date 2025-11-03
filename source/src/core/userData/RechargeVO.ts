import { BaseVO } from "./BaseVO";

export class RechargeVO extends BaseVO implements VO.IRechargeVO {

	/** 欠款订单列表 */
	orders: ProtoObject<IResFetchRefundOrder_OrderInfo>[];
	/** 最后补款时间 */
	clear_deadline: number;
	/** 提示消息 */
	message: ProtoObject<II18nContext>[];

	@InterestMessage(EMessageID.fetchRefundOrder)
	private onFetchRefundOrder(res: IResFetchRefundOrder) {
		this.orders = res.orders.map(v => this.decodeProtoData(v));
		this.clear_deadline = res.clear_deadline;
		this.message = res.message.map(v => this.decodeProtoData(v));
	}
}