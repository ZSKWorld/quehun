import { MessageData } from "./MessageData";

export class Activity extends MessageData implements UserData.IActivity {
    activity: IAccountActivityUpdate;
    activity_task: IAccountUpdate_TaskUpdate;
    /** 翻牌牌任务 */
    activity_flip_task: IAccountUpdate_TaskUpdate;
    activity_period_task: IAccountUpdate_TaskUpdate;
    activity_random_task: IAccountUpdate_TaskUpdate;
    activity_segment_task: IAccountUpdate_SegmentTaskUpdate;
    update(data: IAccountUpdate) {
        if (!data) return;
        this.activity = this.decodeMessage(data.activity);
        this.activity_task = this.decodeMessage(data.activity_task);
        this.activity_flip_task = this.decodeMessage(data.activity_flip_task);
        this.activity_period_task = this.decodeMessage(data.activity_period_task);
        this.activity_random_task = this.decodeMessage(data.activity_random_task);
        this.activity_segment_task = this.decodeMessage(data.activity_segment_task);
    }
}