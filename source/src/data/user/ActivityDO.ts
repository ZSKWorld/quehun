import { BaseDO } from "./BaseDO";

export class ActivityDO extends BaseDO implements DO.IActivityDO {
	activity: ProtoObject<IAccountActivityUpdate>;
	activity_task: ProtoObject<IAccountUpdate_TaskUpdate>;
	/** 翻牌牌任务 */
	activity_flip_task: ProtoObject<IAccountUpdate_TaskUpdate>;
	activity_period_task: ProtoObject<IAccountUpdate_TaskUpdate>;
	activity_random_task: ProtoObject<IAccountUpdate_TaskUpdate>;
	activity_segment_task: ProtoObject<IAccountUpdate_SegmentTaskUpdate>;


	@InterestMessage(ENetNotify.NotifyAccountUpdate)
	private onNotifyAccountUpdate(data: IAccountUpdate) {
		this.activity = $decodeProtoData(data.activity);
		this.activity_task = $decodeProtoData(data.activity_task);
		this.activity_flip_task = $decodeProtoData(data.activity_flip_task);
		this.activity_period_task = $decodeProtoData(data.activity_period_task);
		this.activity_random_task = $decodeProtoData(data.activity_random_task);
		this.activity_segment_task = $decodeProtoData(data.activity_segment_task);
	}
}