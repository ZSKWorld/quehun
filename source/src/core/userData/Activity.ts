export class Activity implements UserData.IActivity {
    activity: IAccountActivityUpdate;
    activity_task: IAccountUpdate_TaskUpdate;
    /** 翻牌牌任务 */
    activity_flip_task: IAccountUpdate_TaskUpdate;
    activity_period_task: IAccountUpdate_TaskUpdate;
    activity_random_task: IAccountUpdate_TaskUpdate;
    activity_segment_task: IAccountUpdate_SegmentTaskUpdate;
    update(data: IAccountUpdate) {
        if (!data) return;
        const { activity, activity_task, activity_flip_task, activity_period_task, activity_random_task, activity_segment_task } = data;
        if (activity) {
            this.activity = {
                mine_data: activity.mine_data.map(v => v),
                rpg_data: activity.rpg_data.map(v => v),
                feed_data: activity.feed_data.map(v => v),
                spot_data: activity.spot_data.map(v => v),
                friend_gift_data: activity.friend_gift_data.map(v => v),
                upgrade_data: activity.upgrade_data.map(v => v),
                gacha_data: activity.gacha_data.map(v => v),
                simulation_data: activity.simulation_data.map(v => v),
                combining_data: activity.combining_data.map(v => v),
                village_data: activity.village_data.map(v => v),
                festival_data: activity.festival_data.map(v => v),
                island_data: activity.island_data.map(v => v),
                story_data: activity.story_data.map(v => v),
                choose_up_data: activity.choose_up_data.map(v => v),
                simulation_v2_data: activity.simulation_v2_data.map(v => v),
            };
        }

        this.activity_task = this.decodeTaskUpdate(activity_task);
        this.activity_flip_task = this.decodeTaskUpdate(activity_flip_task);
        this.activity_period_task = this.decodeTaskUpdate(activity_period_task);
        this.activity_random_task = this.decodeTaskUpdate(activity_random_task);
        if (activity_segment_task) {
            this.activity_segment_task = {
                task_list: [...activity_segment_task.task_list],
                progresses: activity_segment_task.progresses.map(v => ({
                    id: v.id,
                    counter: v.counter,
                    achieved: v.achieved,
                    rewarded: v.rewarded,
                    failed: v.failed,
                    reward_count: v.reward_count,
                    achieved_count: v.achieved_count,
                })),
            };
        }
    }

    private decodeTaskUpdate(v: IAccountUpdate_TaskUpdate): IAccountUpdate_TaskUpdate {
        if (!v) return { task_list: [], progresses: [] };
        return {
            task_list: [...v.task_list],
            progresses: v.progresses.map(v1 => ({
                id: v1.id,
                counter: v1.counter,
                achieved: v1.achieved,
                rewarded: v1.rewarded,
                failed: v1.failed,
                rewarded_time: v1.rewarded_time,
            }))
        };
    }
}

windowImmit("decodeMessage", function decodeMessage<T extends IProto>(data: T): ProtoObject<T> {
    if (!data) return data;
    var type = data.$type;
    if (!type) return data;
    var result: ProtoObject<T> = {} as any;
    type.fieldsArray.forEach(v => {
        var value = data[v.name];
        if(Array.isArray(value))
            result[v.name] = [...value.map(v1 => decodeMessage(v1))];
        else
            result[v.name] = decodeMessage(value);
    });
    return result;
})