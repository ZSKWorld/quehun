import { BaseVO } from "./BaseVO";

export class ActivityVO extends BaseVO implements VO.IActivityVO {
	activity: ProtoObject<IAccountActivityUpdate>;
	activity_task: ProtoObject<IAccountUpdate_TaskUpdate>;
	/** 翻牌牌任务 */
	activity_flip_task: ProtoObject<IAccountUpdate_TaskUpdate>;
	activity_period_task: ProtoObject<IAccountUpdate_TaskUpdate>;
	activity_random_task: ProtoObject<IAccountUpdate_TaskUpdate>;
	activity_segment_task: ProtoObject<IAccountUpdate_SegmentTaskUpdate>;


	@InterestMessage(ENotify.NotifyAccountUpdate)
	private onNotifyAccountUpdate(data: IAccountUpdate) {
		this.activity = this.decodeProtoData(data.activity);
		this.activity_task = this.decodeProtoData(data.activity_task);
		this.activity_flip_task = this.decodeProtoData(data.activity_flip_task);
		this.activity_period_task = this.decodeProtoData(data.activity_period_task);
		this.activity_random_task = this.decodeProtoData(data.activity_random_task);
		this.activity_segment_task = this.decodeProtoData(data.activity_segment_task);
	}
}