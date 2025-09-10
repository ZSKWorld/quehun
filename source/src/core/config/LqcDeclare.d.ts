/** 键值唯一表 */
interface IUniqueSheet<T> {
    get(id: string | number): T;
    find(id: string | number): T;
    forEach(each: (value: T, index: number, array: T[]) => void): void;
}

/** 无键表 */
interface INoKeySheet<T> {
    forEach(each: (value: T, index: number, array: T[]) => void): void;
}

/** 分组表 */
interface IGroupSheet<T> {
    getGroup(id: string | number): T[];
    findGroup(id: string | number): T[];
    forEach(each: (value: T, index: number, array: T[]) => void): void;
    forEachGroup(eachGroup: (values: T[], groupKey: number | string) => void): void;
}

//////////////////// ab_match.match_info ////////////////////
interface Sheet_AbMatch_MatchInfo {
    readonly id: number;
    readonly ab_match_activity_id: number;
    readonly match_activity_id: number;
    readonly desktop_id_list: string;
    readonly consume_id: number; // 每次买入的消耗id
    readonly buy_in_condition: string; // 买入条件
    readonly mail_template_id: number; // 邮件补发奖品编号
    readonly max_match_count: number; // 单次买入对局数
    readonly reward_id: number;
    readonly point_id: number;
    readonly match_level: number;
    readonly priority: number; // 优先级，优先进入满足买入条件的优先级高的组别
}
//////////////////// ab_match.point ////////////////////
interface Sheet_AbMatch_Point {
    readonly id: number;
    readonly rank: number;
    readonly desktop_id_list: string;
    readonly point: number;
}
//////////////////// ab_match.reward_seq ////////////////////
interface Sheet_AbMatch_RewardSeq {
    readonly id: number;
    readonly point_lower: number;
    readonly point_upper: number;
    readonly reward: string;
    readonly chest_mark: number;
}
//////////////////// ab_match.consume_seq ////////////////////
interface Sheet_AbMatch_ConsumeSeq {
    readonly id: number;
    readonly match_count: number;
    readonly item_id: number;
    readonly item_count: number;
}
//////////////////// ab_match ////////////////////
interface Table_AbMatch {
    readonly match_info: IUniqueSheet<Sheet_AbMatch_MatchInfo>;
    readonly point: IGroupSheet<Sheet_AbMatch_Point>;
    readonly reward_seq: IGroupSheet<Sheet_AbMatch_RewardSeq>;
    readonly consume_seq: IGroupSheet<Sheet_AbMatch_ConsumeSeq>;
}
//////////////////// achievement.achievement ////////////////////
interface Sheet_Achievement_Achievement {
    readonly id: number;
    readonly name_chs: string;
    readonly name_chs_t: string;
    readonly name_jp: string;
    readonly name_en: string;
    readonly name_kr: string;
    readonly desc_chs: string;
    readonly desc_chs_t: string;
    readonly desc_jp: string;
    readonly desc_en: string;
    readonly desc_kr: string;
    readonly rare: number; // 0不判定1铜2银3金
    readonly locked: number; // 1为加锁，0为普通
    readonly group_id: number; // 所属大类
    readonly sort: number; // 同一分类的排序从小到大
    readonly segment_id: number;
    readonly base_task: number;
    readonly reward: string; // 完成奖励
    readonly hidden: number; // 服务端不计入【成就收集者】的数量
    readonly deprecated: number; // 1废弃，0正常
}
//////////////////// achievement.achievement_group ////////////////////
interface Sheet_Achievement_AchievementGroup {
    readonly id: number;
    readonly name_chs: string;
    readonly name_chs_t: string;
    readonly name_jp: string;
    readonly name_en: string;
    readonly name_kr: string;
    readonly img: string; // 图片名
    readonly reward: string; // 大类下所有成就完成后奖励,没有就留空
    readonly percentage: number; // 1可统计占比 0不统计
    readonly deprecated: number; // 1废弃，0正常
    readonly sort: number; // 分类排序从小到大
}
//////////////////// achievement.badge ////////////////////
interface Sheet_Achievement_Badge {
    readonly id: number;
    readonly base_task: number; // 对应任务id
    readonly deprecated: number; // 是否废弃（0-正常 1-废弃）
}
//////////////////// achievement.badge_group ////////////////////
interface Sheet_Achievement_BadgeGroup {
    readonly id: number;
    readonly badge_id: number[];
    readonly name: number; // 勋章名
    readonly desc: number; // 勋章描述
    readonly type: number; // 1段位 2友人 3活动，同一tab内四麻三麻完成次数加起来
    readonly img: string; // myres2/badge/图片名
}
//////////////////// achievement ////////////////////
interface Table_Achievement {
    readonly achievement: IUniqueSheet<Sheet_Achievement_Achievement>;
    readonly achievement_group: IUniqueSheet<Sheet_Achievement_AchievementGroup>;
    readonly badge: IUniqueSheet<Sheet_Achievement_Badge>;
    readonly badge_group: IUniqueSheet<Sheet_Achievement_BadgeGroup>;
}
//////////////////// activity.activity ////////////////////
interface Sheet_Activity_Activity {
    readonly id: number; // 活动id
    readonly name_chs: string; // 活动名称
    readonly name_chs_t: string;
    readonly name_jp: string;
    readonly name_en: string;
    readonly name_kr: string;
    readonly type: string; // 活动类型
    readonly need_popout: number; // 是否需要弹出来
}
//////////////////// activity.task ////////////////////
interface Sheet_Activity_Task {
    readonly id: number; // 活动任务id
    readonly activity_id: number; // 活动id
    readonly day: number; // 自活动开始的天数
    readonly base_task_id: number; // 基础任务id
    readonly reward_id: number; // 奖励id
    readonly reward_count: number; // 奖励数量
    readonly hidden_reward: string; // 隐藏奖励
    readonly limit_id: number; // 限制ID source_limit表
    readonly deprecated: number; // 维护用字段，将任务转变为不可见不可领状态
}
//////////////////// activity.exchange ////////////////////
interface Sheet_Activity_Exchange {
    readonly id: number; // 兑换id
    readonly activity_id: number; // 活动id
    readonly reward_id: number; // 奖励id
    readonly reward_count: number; // 奖励数量
    readonly consume_id: number; // 消耗id
    readonly consume_count: number; // 消耗数量
    readonly exchange_limit: number; // 兑换次数限制
    readonly item_limit_id: number; // 兑换限制道具id
    readonly item_limit_count: number; // 已有超过/等于数量的物品就不能兑换
    readonly unlock_day: string; // 解锁时间
}
//////////////////// activity.chest_up ////////////////////
interface Sheet_Activity_ChestUp {
    readonly activity_id: number; // 活动id
    readonly chest_id: number; // 宝箱ID
    readonly title_str_id: number; // 卡池短名
    readonly str_id: string; // 卡池说明文，高亮用[tag]区分[/tag]
    readonly chara_str_id: number; // 角色出率文本
    readonly item_str_id: number; // 装扮出率文本
    readonly img: string; // 宣传图
    readonly title_img: string; // 卡池标题图
    readonly title_img_2: string; // 卡池标题图2（左下，联动/ur）
    readonly typeset: number; // 排版种类0常规 1普通轮换 2UR角色 3联动  4自选
    readonly enter_animation: string; // 进入动画
    readonly special_effect_front: string; // 特效前
    readonly special_effect_back: string; // 特效后，常驻，特效替换樱花特效
    readonly special_audio: number; // audio表内音效
    readonly up_items_type: number; // 0=无up装扮，1=新装扮，2=特定老装扮，3=常驻装扮
    readonly up_items: number[]; // UP的物品
}
//////////////////// activity.game_task ////////////////////
interface Sheet_Activity_GameTask {
    readonly id: number; // 活动任务id
    readonly activity_id: number; // 活动id
    readonly base_task_id: number; // 基础任务id
    readonly reward_id: number; // 奖励id
    readonly reward_count: number; // 奖励数量
    readonly hidden_reward: string; // 隐藏奖励
    readonly limit_id: number; // 限制ID source_limit表
    readonly deprecated: number; // 维护用字段，将任务转变为不可见不可领状态
}
//////////////////// activity.game_point ////////////////////
interface Sheet_Activity_GamePoint {
    readonly id: number;
    readonly activity_id: number; // 活动ID
    readonly point_id: number; // 分数ID
    readonly point: number; // 分数
    readonly res_id: number; // 奖励ID
    readonly res_count: number; // 奖励数量
    readonly unlock_day: number; // 第几天解锁
    readonly node_mark: number; // 各节点0普通1突出
    readonly image_mark: number; // 显示的立绘差分
}
//////////////////// activity.rank ////////////////////
interface Sheet_Activity_Rank {
    readonly activity_id: number; // 活动ID
    readonly leaderboard_id: number; // 排行榜ID
    readonly rank_reward_id: number; // 奖励ID
    readonly require_point: number; // 上榜最低点数
}
//////////////////// activity.rank_reward ////////////////////
interface Sheet_Activity_RankReward {
    readonly id: number;
    readonly lower_rank_bound: number; // 档位排名下界
    readonly reward: string; // 奖励列表
}
//////////////////// activity.flip_task ////////////////////
interface Sheet_Activity_FlipTask {
    readonly id: number; // 活动任务id
    readonly activity_id: number; // 活动ID
    readonly base_task_id: number; // 基础任务id
    readonly reward: string; // 奖励列表
    readonly matrix_x: number; // 矩阵位置x
    readonly matrix_y: number; // 矩阵位置y
    readonly is_reward: number; // 是否是奖励格
}
//////////////////// activity.flip_info ////////////////////
interface Sheet_Activity_FlipInfo {
    readonly id: number; // 活动ID
    readonly flip_count: number; // 每日翻牌次数
    readonly init_task_list: string; // 初始任务列表
    readonly start_time: string; // 翻牌开始时间
    readonly end_time: string; // 翻牌结束时间（不影响领奖）
}
//////////////////// activity.daily_sign ////////////////////
interface Sheet_Activity_DailySign {
    readonly activity_id: number; // 活动ID
    readonly reward_id: number; // 奖励id
    readonly reward_count: number; // 奖励数量
    readonly day: number; // 自活动开始的天数
}
//////////////////// activity.richman_info ////////////////////
interface Sheet_Activity_RichmanInfo {
    readonly activity_id: number; // 活动ID
    readonly map_id: number; // 活动地图ID
    readonly map_distance: number; // 地图长度
    readonly chest_id: number; // 活动宝箱 poolId
    readonly consume_item_id: number; // 消耗道具id
    readonly special_item_id: number; // 消耗特殊道具id
    readonly step_bank_save: number; // 丢骰子获得的存款
    readonly finish_bank_save: number; // 完成一圈获得存款
    readonly finish_reward_seq: number; // 完成一圈获得的奖励序列
    readonly step_exp: number; // 用一次骰子的经验
    readonly finish_exp: number; // 走完一圈的经验
    readonly item_worth_pool: number; // 物品价值表
    readonly min_avg_worth: number; // 最低每步收益
    readonly max_avg_worth: number; // 最高每步收益
    readonly chest_pool_seq: number; // 宝箱序列
}
//////////////////// activity.richman_map ////////////////////
interface Sheet_Activity_RichmanMap {
    readonly map_id: number; // 地图ID
    readonly location: number; // 地图位置
    readonly pos_x: number; // 格子坐标
    readonly pos_y: number;
    readonly piece_face: number; // 面朝方向
    readonly type: number; // 格子类型
    readonly param: number; // 参数
    readonly bonus_type: number; // 配置奖励类型
    readonly worth: number; // 预期价值
}
//////////////////// activity.richman_level ////////////////////
interface Sheet_Activity_RichmanLevel {
    readonly activity_id: number; // 活动ID
    readonly name: string; // 名称
    readonly id: number; // 等级ID
    readonly exp: number; // 所需累积经验
    readonly buff: number; // 铜币加成（百分比整数）
}
//////////////////// activity.richman_event ////////////////////
interface Sheet_Activity_RichmanEvent {
    readonly event_id: number; // event唯一标识
    readonly activity_id: number; // 活动ID
    readonly event_type: number; // 事件类型
    readonly weight: number; // 随机权重
    readonly param: number[];
}
//////////////////// activity.period_task ////////////////////
interface Sheet_Activity_PeriodTask {
    readonly id: number; // 活动任务id
    readonly activity_id: number; // 活动id
    readonly base_task_id: number; // 基础任务id
    readonly reward: string; // 奖励
    readonly interval: number; // 刷新周期
    readonly progress_limit: number; // 周期内能完成的次数限制
    readonly progress_limit_interval: number; // 次数限制周期
    readonly reward_limit_day: number; // 活动开始x天后才可以领取
    readonly accessible_days: string; // 任务有效时间，在有效时间内才可以累计任务进度，领取任务奖励，格式：{startDay}-{endDay} 例: 0-5 代表活动开始第0天至活动开始后第5天[0, 5]
    readonly unlock_day: number; // 第一次拉到活动后x天解锁
    readonly deprecated: number; // 维护用字段，将任务转变为不可见不可领状态
    readonly node_mark: number; // 0普通1突出
    readonly omit_mail_reward: number; // 补发邮件是否忽略
}
//////////////////// activity.random_task_pool ////////////////////
interface Sheet_Activity_RandomTaskPool {
    readonly pool_id: number; // 任务池ID
    readonly task_id: number; // 任务id
    readonly activity_id: number; // 活动ID
    readonly base_task_id: number; // 基础任务id
    readonly reward_id: number; // 奖励id
    readonly reward_count: number; // 奖励数量
    readonly weight: number; // 权重
    readonly hidden_reward: string; // 隐藏奖励
    readonly limit_id: number; // 限制ID source_limit表
}
//////////////////// activity.random_task_info ////////////////////
interface Sheet_Activity_RandomTaskInfo {
    readonly activity_id: number; // 活动ID
    readonly pool_id: number[]; // 任务池ID
}
//////////////////// activity.richman_reward_seq ////////////////////
interface Sheet_Activity_RichmanRewardSeq {
    readonly id: number; // id
    readonly count: number; // 完成圈数
    readonly reward: string; // 奖励
}
//////////////////// activity.activity_buff ////////////////////
interface Sheet_Activity_ActivityBuff {
    readonly buff_id: number; // buffid
    readonly activity_id: number; // 活动ID
    readonly buff_level: number; // buff等级
    readonly buff_type: number; // buff类型
    readonly upgrade_resource_id: number; // 升级资源ID
    readonly upgrade_resource_count: number; // 升级资源数量
    readonly effect: number; // buff效果
    readonly unlock_params: number[]; // 解锁条件参数0
    readonly effect_desc: number; // 当前buff效果描述strid
    readonly effect_desc_2: number; // 当前buff效果描述strid2
    readonly limit_count: number; // 次数限制
    readonly limit_interval: number; // 次数限制周期
}
//////////////////// activity.buff_condition ////////////////////
interface Sheet_Activity_BuffCondition {

}
//////////////////// activity.game_point_info ////////////////////
interface Sheet_Activity_GamePointInfo {
    readonly activity_id: number; // 活动ID
    readonly filter_id: number; // 得分筛选器id
    readonly reward_mail_template: number; // 邮件补发奖品编号
    readonly max_point_limit_day: number; // 活动点数解除限制的day，全程不解限填-1
    readonly should_rank: number; // 如果为0则game_point_rank不生效
}
//////////////////// activity.game_point_rank ////////////////////
interface Sheet_Activity_GamePointRank {
    readonly activity_id: number; // 活动ID
    readonly rank_rate_lower: number; // 大于（百分比）
    readonly rank_rate_upper: number; // 小于等于（百分比）
    readonly reward: string; // 奖励
}
//////////////////// activity.game_point_filter ////////////////////
interface Sheet_Activity_GamePointFilter {
    readonly id: number;
    readonly has_robot: string; // 是否可以带AI
    readonly category: string; // 对局类别
    readonly room: string; // 匹配房间
    readonly mode: string; // 对局模式
    readonly point_coe: number; // 点数比例（x分之一）
}
//////////////////// activity.activity_room ////////////////////
interface Sheet_Activity_ActivityRoom {
    readonly activity_id: number; // 友人房活动ID
    readonly sort: number; // 数字小的在前
    readonly str_name: string; // 对局名
    readonly str_rule: string; // 拼接规则
    readonly friend_room_id: number; // 对应desktop/friend_room
    readonly dora3_mode: number; // 是否允许开dora3
    readonly begin_open_mode: number; // 是否允许开配牌open
    readonly muyu_mode: number; // 是否允许开目玉
    readonly xuezhan_mode: number; // 是否允许开血战
    readonly huanzhang_mode: number; // 是否允许开换三张
    readonly chuanma_mode: number; // 川麻模式
    readonly jiuchao_mode: number; // 三透牌模式
    readonly reveal_discard: number; // 暗牌模式
    readonly field_spell_mode: number;
    readonly zhanxing_mode: number;
    readonly tianming_mode: number;
    readonly yongchang_mode: number;
    readonly hunzhiyiji_mode: number;
    readonly wanxiangxiuluo_mode: number;
    readonly beishuizhizhan_mode: number;
}
//////////////////// activity.sns_activity ////////////////////
interface Sheet_Activity_SnsActivity {
    readonly id: number; // snsID
    readonly disable: number;
    readonly pm: number; // 是否私信
    readonly period: number; // 对话结束标记
    readonly activity_id: number; // sns活动ID
    readonly content_str_id: number; // 博客内容
    readonly parent_id: number; // 父snsID
    readonly char_id: number; // 昵称，自定id和玩家id填0
    readonly char_str_id: number; // 指定str-event，玩家id填0
    readonly reply_char_id: number; // 回复，玩家id填1，自定id填0
    readonly reply_char_str_id: number; // 指定str-event
    readonly choice_id: number; // 用户选项分组
    readonly like: number; // 点赞数
    readonly unlock_time: string; // 解锁时间，解锁物品是【且】关系
    readonly unlock_item_id: number; // 解锁物品ID
    readonly unlock_item_count: number; // 解锁物品数量
    readonly content_image: string[]; // 博客图片
}
//////////////////// activity.mine_activity ////////////////////
interface Sheet_Activity_MineActivity {
    readonly activity_id: number; // activity_id
    readonly reward_group: number; // 奖励组ID
    readonly cost_item: string; // 挖矿消耗物品
    readonly map_size_x: number; // 地图大小
    readonly map_size_y: number; // 地图大小
}
//////////////////// activity.mine_reward ////////////////////
interface Sheet_Activity_MineReward {
    readonly group_id: number;
    readonly reward_id: number; // 唯一奖励id
    readonly reward: string; // 奖励内容
    readonly type: number; // 显示类型
    readonly x: number; // 宽度
    readonly y: number; // 高度
}
//////////////////// activity.rpg_activity ////////////////////
interface Sheet_Activity_RpgActivity {
    readonly activity_id: number;
    readonly base_hp: number; // 玩家基础生命
    readonly base_atk: number; // 玩家基础攻击
    readonly base_dex: number; // 玩家基础回避
    readonly base_luk: number; // 玩家基础暴击
    readonly ds_atk: number; // 击飞额外攻击力
    readonly special_heal: number; // 无铳治疗量
    readonly chain_atk: number[]; // 连续胡牌攻击倍率
    readonly monster_group: number; // 怪物组
    readonly sanma_debuff: number; // 三麻敌我攻击力削弱
    readonly has_robot: number; // 是否可以带AI
    readonly category: string; // 对局类别
    readonly mode: string; // 匹配模式
    readonly room: string; // 对局模式
    readonly daily_limit: number; // 每日击破上限
}
//////////////////// activity.rpg_monster_group ////////////////////
interface Sheet_Activity_RpgMonsterGroup {
    readonly group_id: number;
    readonly seq: number; // 顺序
    readonly type: number; // 怪类型（纯前端）0杂兵，1boss
    readonly hp: number; // 血量
    readonly atk: number; // 攻击力
    readonly reward: string; // 奖励
    readonly season: number; // 前端用
    readonly chapters: string; // 前端用
    readonly imaget_path: string; // 前端用
    readonly background: string; // 前端用
    readonly name_str_id: number; // 对应str/event
}
//////////////////// activity.arena_activity ////////////////////
interface Sheet_Activity_ArenaActivity {
    readonly activity_id: number;
    readonly match_time: string; // 匹配时间控制
    readonly ticket_time_limit: string; // 最晚购买门票时间
    readonly ticket_item_id: number; // 门票物品ID
    readonly ticket_price: string; // 门票购买价格
    readonly desktop_id: number; // 匹配桌ID
    readonly max_win_count: number; // 最大胜场
    readonly max_lose_count: number; // 最大败场
    readonly reward_group: number; // 奖励组ID
    readonly daily_ticket_limit: number; // 每日买入限制
    readonly mail_template: number; // 奖励邮件ID
    readonly arena_reward_display_group: number;
    readonly level_limit: number;
}
//////////////////// activity.arena_reward ////////////////////
interface Sheet_Activity_ArenaReward {
    readonly group_id: number;
    readonly win_count: number; // 胜场数量
    readonly reward: string; // 奖励
}
//////////////////// activity.arena_reward_display ////////////////////
interface Sheet_Activity_ArenaRewardDisplay {
    readonly group_id: number;
    readonly win_count_min: number;
    readonly win_count_max: number;
    readonly reward_1: number; // 奖励
    readonly reward_1_remark: string; // 备注数量
    readonly reward_2: number; // 奖励
    readonly reward_2_remark: string; // 备注数量
    readonly reward_3: number; // 奖励
    readonly reward_3_remark: string; // 备注数量
    readonly reward_4: number; // 奖励
    readonly reward_4_remark: string; // 备注数量
}
//////////////////// activity.segment_task ////////////////////
interface Sheet_Activity_SegmentTask {
    readonly id: number; // 活动任务id
    readonly activity_id: number; // 活动id
    readonly base_task_id: number; // 基础任务id
    readonly max_finish_count: number; // 最多完成次数
    readonly reward: string; // 每次完成给的奖励
    readonly interval: number; // 刷新周期
}
//////////////////// activity.feed_activity_info ////////////////////
interface Sheet_Activity_FeedActivityInfo {
    readonly activity_id: number; // 活动id
    readonly max_feed_count: number; // 最多喂次数
    readonly feed_reward_id: number; // 奖励组id
    readonly friend_send_limit: number; // 赠送给好友次数限制
    readonly friend_recv_limit: number; // 从好友收取次数限制
    readonly food_item_id: number[]; // 食物物品ID
}
//////////////////// activity.feed_activity_reward ////////////////////
interface Sheet_Activity_FeedActivityReward {
    readonly id: number; // 奖励id
    readonly count: number; // 次数
    readonly reward: string; // 奖励物品
    readonly img_stage: number; // 图片切换
}
//////////////////// activity.vote_activity ////////////////////
interface Sheet_Activity_VoteActivity {
    readonly id: number; // 活动id
    readonly vote_item: number; // 投票道具ID
    readonly choice_id_list: string; // 投票ID列表用,分割，用来填写shop内的id
    readonly vote_end_time: string; // 投票结束时间，之后不接受新投票
}
//////////////////// activity.rpg_v2_activity ////////////////////
interface Sheet_Activity_RpgV2Activity {
    readonly activity_id: number;
    readonly base_atk: number; // 玩家基础攻击
    readonly monster_group: number; // 怪物组
    readonly sanma_debuff: number; // 三麻敌我攻击力削弱
    readonly special_debuff: number; // 特殊模式（非常规立直模式）
    readonly has_robot: number; // 是否可以带AI
    readonly category: string; // 对局类别
    readonly mode: string; // 匹配模式
    readonly room: string; // 对局模式
    readonly daily_limit: number; // 每日击破上限
    readonly mail_template_id: number;
}
//////////////////// activity.spot_activity ////////////////////
interface Sheet_Activity_SpotActivity {
    readonly unique_id: number; // 剧情id
    readonly activity_id: number; // 活动id
    readonly dep: number; // 前置依赖剧情解锁
    readonly limit_day: number; // 解锁天数
    readonly unlock_task_id: number; // 解锁基础任务id
    readonly unlock_task_activity_id: number; // 解锁任务对应活动id
    readonly spot_group: number; // 剧情锁同一组别
    readonly unlock_spot_item: string; // 解锁编辑器入口的道具
    readonly content_path: string; // 交互剧情的路径
    readonly title: number; // 标题
    readonly subtitle_title: number; // 副标题
    readonly unlock_item: string; // 解锁结局道具
    readonly unlock_by_ending_id: number; // 被某个结局id解锁
    readonly unlock_ending_id: string[]; // 完成ending_id后解锁unique_id
    readonly ending_id: number[]; // 关键选项分支，每段剧情第一个
    readonly ending_res: string; // 封面图
    readonly ending_id_dep: number[]; // 关键选项分支可用道具解锁依赖
    readonly reward: string; // 结局奖励
}
//////////////////// activity.activity_item ////////////////////
interface Sheet_Activity_ActivityItem {
    readonly activity_id: number; // 活动id
    readonly item_list: string; // 发放道具到背包
}
//////////////////// activity.upgrade_activity ////////////////////
interface Sheet_Activity_UpgradeActivity {
    readonly activity_id: number; // 活动id
    readonly mail_id: number; // 奖励邮件
    readonly consume_item: string; // 升级消耗的物品，id-count,id-count形式
    readonly total_reward_id: number; // 总等级奖励组id
    readonly reward_id: number[]; // 奖励组id
}
//////////////////// activity.upgrade_activity_reward ////////////////////
interface Sheet_Activity_UpgradeActivityReward {
    readonly id: number; // 奖励组id，group形式
    readonly level: number; // 等级
    readonly reward: string; // 升级到level等级的奖励
    readonly unlock_day: number; // 解锁天数
    readonly highlight: number;
}
//////////////////// activity.friend_gift_activity ////////////////////
interface Sheet_Activity_FriendGiftActivity {
    readonly activity_id: number; // 活动id
    readonly friend_send_limit: number; // 赠送给好友次数限制
    readonly friend_send_consume: number; // 赠送好友自己消耗的个数
    readonly friend_recv_limit: number; // 从好友收取次数限制
    readonly extra_gift: number; // 赠送人可以额外获得的数量
    readonly gift_item_id: number[]; // 礼品id
}
//////////////////// activity.upgrade_activity_display ////////////////////
interface Sheet_Activity_UpgradeActivityDisplay {
    readonly id: number; // 奖励组id，group形式
    readonly level: number; // 等级
    readonly display: number;
}
//////////////////// activity.activity_desktop ////////////////////
interface Sheet_Activity_ActivityDesktop {
    readonly activity_id: number;
    readonly desktop_id: number;
    readonly interval: number;
    readonly interval_type: number;
}
//////////////////// activity.gacha_activity_info ////////////////////
interface Sheet_Activity_GachaActivityInfo {
    readonly activity_id: number; // 活动id
    readonly gacha_pool: number; // 奖池
    readonly gacha_control: number; // 控制池
    readonly sp_trigger_times: number; // 触发sp奖的抽取次数-抽够次数就送
    readonly sp_rewards: string; // SP赏
    readonly consume: string; // 抽取消耗物品
}
//////////////////// activity.gacha_pool ////////////////////
interface Sheet_Activity_GachaPool {
    readonly pool_id: number; // 奖品池id
    readonly reward_id: number; // 奖品id
    readonly count: number; // 这种奖品在扭蛋机中一共有几份
    readonly rare: number; // 稀有度
    readonly item: string; // 奖品
}
//////////////////// activity.gacha_control ////////////////////
interface Sheet_Activity_GachaControl {

}
//////////////////// activity.task_display ////////////////////
interface Sheet_Activity_TaskDisplay {
    readonly activity_id: number;
    readonly day: number; // 自然日
    readonly task_serial_number: number; // 0为特殊整体，123为顺序
    readonly task_type: number; // 0普通任务，1问答，999整体条件
    readonly period_task_id: number; // 任务编号
    readonly answer: number; // 正确答案（当成str拆）
    readonly right_str: number; // 答对的文本
    readonly wrong_str: number; // 答错的文本
}
//////////////////// activity.simulation_activity_info ////////////////////
interface Sheet_Activity_SimulationActivityInfo {
    readonly activity_id: number; // 活动ID
    readonly stamina_item_id: number; // 体力值物品ID
}
//////////////////// activity.reward_mail ////////////////////
interface Sheet_Activity_RewardMail {
    readonly activity_id: number; // 活动ID
    readonly mail_template_id: number; // 对应邮件
}
//////////////////// activity.combining_activity_info ////////////////////
interface Sheet_Activity_CombiningActivityInfo {
    readonly activity_id: number; // 活动id
    readonly craft_bin: number[]; // 材料桶1id
    readonly craft_bin_price: string[]; // 材料桶1费用
    readonly craft_bin_unlock: number[]; // 材料桶1解锁积分
    readonly point_item: number; // 积分道具id
    readonly bonus_daily_limit: number; // 每日最大红包生成数
    readonly multi_order_rate: number; // 双订单价格倍率
    readonly one_coin_num: number; // 飞包动画单硬币对应代币数
    readonly coin_num_max: number; // 飞包硬币最大数量
}
//////////////////// activity.combining_craft_pool ////////////////////
interface Sheet_Activity_CombiningCraftPool {
    readonly bin_id: number; // 材料桶id
    readonly craft_id: number; // 素材id
}
//////////////////// activity.combining_map ////////////////////
interface Sheet_Activity_CombiningMap {
    readonly activity_id: number; // 活动id
    readonly point_item_id: number; // 分数道具id
    readonly point_item_count: number; // 道具数量
    readonly workbench_count: number; // 合成格数量
}
//////////////////// activity.combining_order ////////////////////
interface Sheet_Activity_CombiningOrder {

}
//////////////////// activity.combining_craft ////////////////////
interface Sheet_Activity_CombiningCraft {
    readonly id: number; // 素材id
    readonly activity_id: number; // 活动id
    readonly group: number; // 素材分组，用于伪随机
    readonly recycling_price: string; // 回收价格
    readonly level: number; // 等级
    readonly upgrade_craft_id: number; // 升级后素材id
    readonly order_price: string; // 订单价格
    readonly if_bonus: number; // 是否为红包
    readonly img_name: string; // 材料资源名
    readonly craft_name: number; // 材料名
    readonly craft_desc: number; // 材料描述
}
//////////////////// activity.combining_customer ////////////////////
interface Sheet_Activity_CombiningCustomer {
    readonly customer_id: number; // 客人id
    readonly activity_id: number; // 活动id
    readonly order_type: number; // 订单类型
    readonly customer_location: number; // 出现位置左中右
    readonly customer_skin: string; // 客人素材
    readonly customer_loading: number; // 是否使用loading图
    readonly complete_sound: string; // 完成语音
}
//////////////////// activity.chest_replace_up ////////////////////
interface Sheet_Activity_ChestReplaceUp {
    readonly chest_id: number; // 宝箱ID（索引）
}
//////////////////// activity.village_activity_info ////////////////////
interface Sheet_Activity_VillageActivityInfo {
    readonly activity_id: number; // 活动id
    readonly worker_item_id: number; // 工人物品ID
    readonly round_consume: string; // 每回合消耗道具
    readonly random_building: string; // 每个玩家只能拥有列表中的一个建筑，具体是哪个由玩家的账号id决定
    readonly food_item_id: number; // 食物道具id
    readonly trip_consume: number; // 远征消耗食物数量
    readonly trip_cold_down: number; // 远征一次消耗时间/秒
    readonly trip_round: number; // 远征一次消耗回合数
    readonly trip_reward: string[]; // 随机建筑远征系数1
    readonly stage_require: string[]; // 白龙阶段需求[0]
}
//////////////////// activity.village_building ////////////////////
interface Sheet_Activity_VillageBuilding {
    readonly activity_id: number; // 活动id
    readonly building_id: number; // 建筑ID
    readonly initial: number; // 是否是初始建筑
    readonly building_name: number; // 建筑名称strid
    readonly level: number; // 等级
    readonly next_level_id: number; // 下等级id
    readonly produce_item: string; // 每个工人每小时生产内容
    readonly base_produce: string; // 基础产出
    readonly upgrade_item: string; // 升到下级需求材料
    readonly max_worker_count: number;
    readonly upgrade_reward: string; // 升到下级奖励（繁荣度）
    readonly building_stage: number; // 建筑阶段图
    readonly worker_consume: number; // 每个工人每小时消耗食物数量
    readonly func: string; // 特殊功能
    readonly args: number[]; // 特殊参数
    readonly type: number; // 建筑类别
}
//////////////////// activity.village_task ////////////////////
interface Sheet_Activity_VillageTask {
    readonly activity_id: number; // 活动id
    readonly mission_id: number; // 委托id
    readonly mission_str: number; // 委托文本strid
    readonly fruit_type: string; // 果园类型
    readonly consume: string; // 委托消耗
    readonly reward: string; // 委托奖励
    readonly unlock_day: number; // 活动开始后N天解锁
    readonly unlock_point: string; // 繁荣度达到对应值解锁
    readonly if_loop: number; // 是否可以循环完成
}
//////////////////// activity.liver_event_info ////////////////////
interface Sheet_Activity_LiverEventInfo {
    readonly activity_id: number; // 活动id
    readonly follower_amount: number; // 初始关注人数
    readonly daily_follower_plus: number; // 每日关注人数增加
    readonly intro_text: number; // 直播间简介文本，str/event表初始值，每日递增+1，共14天，封顶2243
    readonly text_max_amount: number; // 最多保留文本条数
    readonly text_create_timer: string; // 两个随机值毫秒生成一条文本
    readonly text_create_weight: string; // 生成文本的种类，1=雀魂角色纯文本，2=雀魂角色打赏文本，3=路人角色纯文本，4=路人角色打赏无文本
    readonly rolltext_speed: number; // 每条弹幕在左侧滚动时间ms
    readonly gift_weight: string; // 出现打赏时，四种类权重
    readonly rolltext_gift_time: string; // 左下角四种礼物的展示时间
    readonly key_item_id: number; // 人气值道具的id
    readonly face_time_block: string; // 表情的时间区块范围ms
    readonly face_weight: string; // 每个时间区块，随机0普通，1开心，2生气，3疑惑的权重
}
//////////////////// activity.liver_text_info ////////////////////
interface Sheet_Activity_LiverTextInfo {
    readonly activity_id: number; // 活动id
    readonly type: number; // 角色类型1=雀魂角色，2=路人id
    readonly chara_id: number; // 雀魂角色的六位id
    readonly mob_str_id: number; // 路人角色的str/event的id
    readonly normal_text: string; // 普通聊天随机范围，连续数字
    readonly gift_text: string; // 打赏文本随机范围，连续数字，为空为只打赏不说话
}
//////////////////// activity.festival_activity ////////////////////
interface Sheet_Activity_FestivalActivity {
    readonly activity_id: number; // 活动id
    readonly funds_id: number; // 资金道具id
    readonly proposal_id: number; // 提案道具id
    readonly proposal_consume: number; // 购买提案消耗资金数量
    readonly daily_buy_limit: number; // 提案每日购买上限
    readonly arrow_amount: number; // 指标单箭头代表的值
    readonly max_amount: number; // 指标上限
    readonly max_proposal_pos: number; // 主界面普通提案点位数
}
//////////////////// activity.festival_level ////////////////////
interface Sheet_Activity_FestivalLevel {
    readonly activity_id: number; // 活动id
    readonly level: number; // 等级
    readonly level_name: number; // 等级名strid
    readonly level_require: string; // 升到本级所需道具
    readonly level_res: string; // 等级图
    readonly unlock_event_count: number; // 本级解锁的事件数量
}
//////////////////// activity.festival_proposal ////////////////////
interface Sheet_Activity_FestivalProposal {
    readonly activity_id: number; // 活动id
    readonly proposal_id: number; // 提案id
    readonly unlock_level: number; // 解锁等级
    readonly ending_group: number[]; // 选项A结果festival_ending.group_id
    readonly client_name: number; // 委托人名称strid
    readonly client_icon: string; // 委托人头像
    readonly proposal_text: number; // 委托正文strid
    readonly option_text_a: number; // 选项A文本strid
    readonly option_text_b: number; // 选项B文本strid
}
//////////////////// activity.festival_event ////////////////////
interface Sheet_Activity_FestivalEvent {
    readonly activity_id: number; // 活动id
    readonly event_id: number; // 事件id
    readonly position: number; // 场地点位
    readonly unlock_level: number; // 解锁等级
    readonly ending_group: number[]; // 选项A结果
    readonly event_title: number; // 事件标题strid
    readonly client_name: number; // 委托人名称strid
    readonly client_icon: string; // 委托人头像
    readonly event_text: number; // 委托正文strid
    readonly option_text_a: number; // 选项A文本strid
    readonly option_text_b: number; // 选项B文本strid
}
//////////////////// activity.festival_ending ////////////////////
interface Sheet_Activity_FestivalEnding {
    readonly group_id: number;
    readonly ending_id: number; // 结局ID
    readonly ending_type: number; // 结局类型
    readonly weight: number; // 权重
    readonly item_plus: string; // 增加道具
    readonly item_minus: string; // 减少道具
    readonly funds: number; // 庆典资金变动
    readonly ending_text: number; // 结局文本strid
}
//////////////////// activity.island_activity ////////////////////
interface Sheet_Activity_IslandActivity {
    readonly activity_id: number; // 活动id
    readonly food_id: number; // 食物id
    readonly currency_id: number; // 货币id
    readonly food_consume: number; // 移动每格消耗食物数量
    readonly sell_discount: number; // 收购折价百分比
    readonly guide_bottle_price: number; // 引导中瓶子的市场价
}
//////////////////// activity.island_goods ////////////////////
interface Sheet_Activity_IslandGoods {
    readonly activity_id: number; // 活动id
    readonly goods_id: number; // 商品id
    readonly goods_name: number; // 商品名
    readonly matrix: string; // 矩阵（亮的部分为物品形状）
    readonly price: number; // 基础价格
    readonly goods_res: string; // 商品图
    readonly icon: string; // 图标
}
//////////////////// activity.island_bag ////////////////////
interface Sheet_Activity_IslandBag {
    readonly activity_id: number; // 活动id
    readonly bag_id: number; // 背包id
    readonly bag_name: number; // 背包名
    readonly bag_desc: number; // 背包描述
    readonly bag_icon_locked: string; // 背包未解锁时图标
    readonly bag_icon_unlocked: string; // 背包已解锁时图标
    readonly matrix: string; // 背包矩阵（亮的为不可放置物品格）
    readonly max_matrix: string; // 最大解锁背包矩阵
    readonly unlock_consume: string; // 解锁背包一格消耗
    readonly initial: number; // 初始化时就解锁
    readonly unlock_task_id: number; // 解锁任务id
}
//////////////////// activity.island_map ////////////////////
interface Sheet_Activity_IslandMap {
    readonly activity_id: number; // 活动id
    readonly zone_id: number; // 地区id,从0开始
    readonly zone_name: number; // 地区名称
    readonly zone_icon_unlocked: string; // 地区已解锁时图标
    readonly currency_amount: number; // 每日商人货币数量
    readonly initial: number; // 初始化时是否解锁
    readonly distance: number[]; // 到0地区的距离
    readonly route: string[]; // 到0地区的路线
    readonly unlock_task_id: number; // 解锁任务id
}
//////////////////// activity.island_shop ////////////////////
interface Sheet_Activity_IslandShop {
    readonly activity_id: number; // 活动id
    readonly day: number; // 活动第几日
    readonly zone_id: number; // 所在地区
    readonly goods_id: number; // 商品id
    readonly count: number; // 商品数量
    readonly discount: number; // 折扣百分数
}
//////////////////// activity.island_news ////////////////////
interface Sheet_Activity_IslandNews {
    readonly activity_id: number; // 活动id
    readonly day: number; // 第几日
    readonly show_day: number; // 第几日显示
    readonly news_date: number; // 新闻日期
    readonly news_week: number; // 新闻星期几
    readonly zone: number; // 受影响地区id
    readonly news_desc: number; // 新闻描述
    readonly goods_id: number; // 受影响商品id
    readonly effect: number; // 影响百分数
}
//////////////////// activity.summer_story ////////////////////
interface Sheet_Activity_SummerStory {
    readonly activity_id: number; // 活动id
    readonly id: number; // 页签ID
    readonly story_name: number; // 页签名
    readonly building: number; // 建筑编号
    readonly building_name: number; // 建筑名称
    readonly exchange_activity: number; // 兑换建筑活动id
    readonly building_unlock: number; // 建筑解锁道具id
    readonly story_unlock: string; // 剧情解锁道具
    readonly story_id: string; // 剧情id
    readonly story_desc: number; // 故事梗概
    readonly show_character: string; // 角色显示，skin_id
}
//////////////////// activity.story_activity ////////////////////
interface Sheet_Activity_StoryActivity {
    readonly activity_id: number; // 活动id
    readonly story_id: number; // 故事id
    readonly unlock_day: number; // 解锁天数
    readonly unlock_item: string; // 解锁物品
    readonly unlock_story: string; // 前置故事
    readonly unlock_ending: string; // 解锁条件（结局）
    readonly unlock_consume: string; // 解锁需要消耗的道具
    readonly finish_reward: string; // 通关奖励
    readonly all_finish_reward: string; // 全通奖励
    readonly content_path: string; // 交互剧情的路径
    readonly title: number; // 标题
    readonly subtitle_title: number; // 副标题
}
//////////////////// activity.story_ending ////////////////////
interface Sheet_Activity_StoryEnding {
    readonly story_id: number; // 故事id
    readonly ending_id: number; // 结局id
    readonly unlock_day: number; // 解锁天数
    readonly unlock_item: string; // 解锁物品
    readonly unlock_story: string; // 解锁条件（故事）
    readonly unlock_ending: string; // 解锁条件（结局）
    readonly unlock_consume: string; // 解锁需要消耗的道具
    readonly reward: string; // 完成该结局后的奖励
}
//////////////////// activity.activity_banner ////////////////////
interface Sheet_Activity_ActivityBanner {
    readonly id: number; // id
    readonly sort: number; // 排序,大的在上面
    readonly banner_type: number; // 类型
    readonly enter_icon: string; // 大厅入口
    readonly banner_big: string; // 大banner
    readonly banner_left: string; // 左banner底图
    readonly banner_left_selected: string; // 左banner选中
    readonly banner_left_icon: string; // 左banner加图标
    readonly time_remind: number; // 小于等于该天数时显示倒计时提示
}
//////////////////// activity.activity_guide ////////////////////
interface Sheet_Activity_ActivityGuide {
    readonly guide_id: number; // 引导id
    readonly activity_id: number; // 活动id
    readonly guide_location: number; // 文本框位置，0下1上
    readonly char_id: number; // 昵称，自定id和玩家id填0
    readonly char_str_id: number; // 指定str-event，玩家id填0
    readonly content_str_id: number; // 文本框内容
}
//////////////////// activity.summer_story_reward ////////////////////
interface Sheet_Activity_SummerStoryReward {
    readonly activity_id: number; // 活动id
    readonly period_task_id: number; // 奖励任务ID
    readonly building_icon: string; // 左上角建筑图显示
    readonly click_notice: number; // 已解锁，未完成点击提示文本
}
//////////////////// activity.choose_up_activity ////////////////////
interface Sheet_Activity_ChooseUpActivity {
    readonly activity_id: number; // 活动id
    readonly replace_id: number; // choose_up_replace.id
    readonly base_chest_id: number[]; // 可选卡池,国女
    readonly choose_type: string[]; // 可选类型
    readonly sort: number; // 卡池排序大的靠上
    readonly title_str_id: number; // 卡池短名
    readonly str_id: string; // 卡池说明文，高亮用[tag]区分[/tag]
    readonly chara_str_id: number; // 角色出率文本
    readonly item_str_id: number; // 装扮出率文本
    readonly img: string; // 宣传图
    readonly title_img: string; // 卡池标题图
    readonly title_img_2: string; // 卡池标题图2（左下的）
    readonly typeset: number; // 排版种类0常规 1普通轮换 2UR角色 3联动  4自选
    readonly enter_animation: string; // 进入动画
    readonly special_effect_front: string; // 特效前
    readonly special_effect_back: string; // 特效后，常驻，特效替换樱花特效
    readonly special_audio: number; // audio表内音效
    readonly up_items_type: number; // 0=无up装扮，1=新装扮，2=特定老装扮，3=常驻装扮
    readonly up_items: number[]; // UP的物品
}
//////////////////// activity.choose_up_replace ////////////////////
interface Sheet_Activity_ChooseUpReplace {
    readonly id: number; // 替换选择组id
    readonly chest_id: number[]; // 卡池id,国
}
//////////////////// activity.progress_reward ////////////////////
interface Sheet_Activity_ProgressReward {
    readonly activity_id: number; // 活动id
    readonly progress: number; // 进度（百分数*100）
    readonly reward: string; // 奖励
}
//////////////////// activity ////////////////////
interface Table_Activity {
    readonly activity: IUniqueSheet<Sheet_Activity_Activity>;
    readonly task: IUniqueSheet<Sheet_Activity_Task>;
    readonly exchange: IUniqueSheet<Sheet_Activity_Exchange>;
    readonly chest_up: IGroupSheet<Sheet_Activity_ChestUp>;
    readonly game_task: IUniqueSheet<Sheet_Activity_GameTask>;
    readonly game_point: IUniqueSheet<Sheet_Activity_GamePoint>;
    readonly rank: IGroupSheet<Sheet_Activity_Rank>;
    readonly rank_reward: IGroupSheet<Sheet_Activity_RankReward>;
    readonly flip_task: IUniqueSheet<Sheet_Activity_FlipTask>;
    readonly flip_info: IUniqueSheet<Sheet_Activity_FlipInfo>;
    readonly daily_sign: IGroupSheet<Sheet_Activity_DailySign>;
    readonly richman_info: IUniqueSheet<Sheet_Activity_RichmanInfo>;
    readonly richman_map: IGroupSheet<Sheet_Activity_RichmanMap>;
    readonly richman_level: IGroupSheet<Sheet_Activity_RichmanLevel>;
    readonly richman_event: IUniqueSheet<Sheet_Activity_RichmanEvent>;
    readonly period_task: IUniqueSheet<Sheet_Activity_PeriodTask>;
    readonly random_task_pool: IGroupSheet<Sheet_Activity_RandomTaskPool>;
    readonly random_task_info: IUniqueSheet<Sheet_Activity_RandomTaskInfo>;
    readonly richman_reward_seq: IGroupSheet<Sheet_Activity_RichmanRewardSeq>;
    readonly activity_buff: IGroupSheet<Sheet_Activity_ActivityBuff>;
    readonly buff_condition: IGroupSheet<Sheet_Activity_BuffCondition>;
    readonly game_point_info: IUniqueSheet<Sheet_Activity_GamePointInfo>;
    readonly game_point_rank: IGroupSheet<Sheet_Activity_GamePointRank>;
    readonly game_point_filter: IGroupSheet<Sheet_Activity_GamePointFilter>;
    readonly activity_room: IUniqueSheet<Sheet_Activity_ActivityRoom>;
    readonly sns_activity: IUniqueSheet<Sheet_Activity_SnsActivity>;
    readonly mine_activity: IUniqueSheet<Sheet_Activity_MineActivity>;
    readonly mine_reward: IGroupSheet<Sheet_Activity_MineReward>;
    readonly rpg_activity: IUniqueSheet<Sheet_Activity_RpgActivity>;
    readonly rpg_monster_group: IGroupSheet<Sheet_Activity_RpgMonsterGroup>;
    readonly arena_activity: IUniqueSheet<Sheet_Activity_ArenaActivity>;
    readonly arena_reward: IGroupSheet<Sheet_Activity_ArenaReward>;
    readonly arena_reward_display: IGroupSheet<Sheet_Activity_ArenaRewardDisplay>;
    readonly segment_task: IUniqueSheet<Sheet_Activity_SegmentTask>;
    readonly feed_activity_info: IUniqueSheet<Sheet_Activity_FeedActivityInfo>;
    readonly feed_activity_reward: IGroupSheet<Sheet_Activity_FeedActivityReward>;
    readonly vote_activity: IUniqueSheet<Sheet_Activity_VoteActivity>;
    readonly rpg_v2_activity: IUniqueSheet<Sheet_Activity_RpgV2Activity>;
    readonly spot_activity: IUniqueSheet<Sheet_Activity_SpotActivity>;
    readonly activity_item: IUniqueSheet<Sheet_Activity_ActivityItem>;
    readonly upgrade_activity: IUniqueSheet<Sheet_Activity_UpgradeActivity>;
    readonly upgrade_activity_reward: IGroupSheet<Sheet_Activity_UpgradeActivityReward>;
    readonly friend_gift_activity: IUniqueSheet<Sheet_Activity_FriendGiftActivity>;
    readonly upgrade_activity_display: IGroupSheet<Sheet_Activity_UpgradeActivityDisplay>;
    readonly activity_desktop: IGroupSheet<Sheet_Activity_ActivityDesktop>;
    readonly gacha_activity_info: IUniqueSheet<Sheet_Activity_GachaActivityInfo>;
    readonly gacha_pool: IGroupSheet<Sheet_Activity_GachaPool>;
    readonly gacha_control: IGroupSheet<Sheet_Activity_GachaControl>;
    readonly task_display: IGroupSheet<Sheet_Activity_TaskDisplay>;
    readonly simulation_activity_info: IUniqueSheet<Sheet_Activity_SimulationActivityInfo>;
    readonly reward_mail: IUniqueSheet<Sheet_Activity_RewardMail>;
    readonly combining_activity_info: IUniqueSheet<Sheet_Activity_CombiningActivityInfo>;
    readonly combining_craft_pool: IGroupSheet<Sheet_Activity_CombiningCraftPool>;
    readonly combining_map: IGroupSheet<Sheet_Activity_CombiningMap>;
    readonly combining_order: IUniqueSheet<Sheet_Activity_CombiningOrder>;
    readonly combining_craft: IUniqueSheet<Sheet_Activity_CombiningCraft>;
    readonly combining_customer: IUniqueSheet<Sheet_Activity_CombiningCustomer>;
    readonly chest_replace_up: IGroupSheet<Sheet_Activity_ChestReplaceUp>;
    readonly village_activity_info: IUniqueSheet<Sheet_Activity_VillageActivityInfo>;
    readonly village_building: IGroupSheet<Sheet_Activity_VillageBuilding>;
    readonly village_task: IGroupSheet<Sheet_Activity_VillageTask>;
    readonly liver_event_info: IUniqueSheet<Sheet_Activity_LiverEventInfo>;
    readonly liver_text_info: IGroupSheet<Sheet_Activity_LiverTextInfo>;
    readonly festival_activity: IUniqueSheet<Sheet_Activity_FestivalActivity>;
    readonly festival_level: IGroupSheet<Sheet_Activity_FestivalLevel>;
    readonly festival_proposal: IGroupSheet<Sheet_Activity_FestivalProposal>;
    readonly festival_event: IGroupSheet<Sheet_Activity_FestivalEvent>;
    readonly festival_ending: IGroupSheet<Sheet_Activity_FestivalEnding>;
    readonly island_activity: IUniqueSheet<Sheet_Activity_IslandActivity>;
    readonly island_goods: IGroupSheet<Sheet_Activity_IslandGoods>;
    readonly island_bag: IGroupSheet<Sheet_Activity_IslandBag>;
    readonly island_map: IGroupSheet<Sheet_Activity_IslandMap>;
    readonly island_shop: IGroupSheet<Sheet_Activity_IslandShop>;
    readonly island_news: IGroupSheet<Sheet_Activity_IslandNews>;
    readonly summer_story: IGroupSheet<Sheet_Activity_SummerStory>;
    readonly story_activity: IGroupSheet<Sheet_Activity_StoryActivity>;
    readonly story_ending: IGroupSheet<Sheet_Activity_StoryEnding>;
    readonly activity_banner: IUniqueSheet<Sheet_Activity_ActivityBanner>;
    readonly activity_guide: IUniqueSheet<Sheet_Activity_ActivityGuide>;
    readonly summer_story_reward: IGroupSheet<Sheet_Activity_SummerStoryReward>;
    readonly choose_up_activity: IUniqueSheet<Sheet_Activity_ChooseUpActivity>;
    readonly choose_up_replace: IGroupSheet<Sheet_Activity_ChooseUpReplace>;
    readonly progress_reward: IGroupSheet<Sheet_Activity_ProgressReward>;
}
//////////////////// amulet.amulet_activity ////////////////////
interface Sheet_Amulet_AmuletActivity {
    readonly activity_id: number;
    readonly skill_item: number; // 强化道具编号
    readonly init_coin: number; // 初始星币数
    readonly shop_count: number; // 商店货架卡包数量
    readonly record_level: number; // 超过该关卡记录对局记录
    readonly book_unlock_level: number; // 钦定初始护身符功能解锁关卡
    readonly free_effect_goods_id: number; // 初始免费护身符包id
    readonly shop_refresh_coin: number; // 商店首次刷新的价格
    readonly effect_max_count: number; // 持有护身符最多数量
    readonly init_dora_indicator: number; // 初始宝牌指示牌
    readonly init_change_hand: number; // 初始换牌次数
    readonly init_desktop_count: number; // 初始待摸牌次数
    readonly init_open_desktop_count: number; // 初始待摸牌中，公开的数量
    readonly init_shupai_point: number; // 初始数牌分数
    readonly init_zipai_point: number; // 初始数牌分数
    readonly init_mount_count: number; // 初始王牌（确定摸不到）
    readonly init_level: number; // 初始关卡id
    readonly init_tian_count: number; // 初始魂牌数量
    readonly init_badge_weight: number[]; // 初始单卡无印权重
}
//////////////////// amulet.amulet_games ////////////////////
interface Sheet_Amulet_AmuletGames {
    readonly activity_id: number;
    readonly level: number; // 关卡等级
    readonly target_point: string; // 过关分数
    readonly reward_pack: string; // 过关奖励卡包
    readonly reward: number;
    readonly boss: number; // 1=boss
    readonly next_level: number;
    readonly round: number; // 关卡回合数
    readonly clear_mark: number;
    readonly level_group: number;
    readonly level_name: string;
    readonly guaranteed_goods: number; // 保底卡包,填amulet_goods.id
    readonly level_amulet_pool: number; // 关卡使用的护身符池
}
//////////////////// amulet.amulet_rewards ////////////////////
interface Sheet_Amulet_AmuletRewards {
    readonly activity_id: number;
    readonly target_point: number; // 目标分数百分比
    readonly reward_coin: number; // 奖励星币
}
//////////////////// amulet.amulet_buff ////////////////////
interface Sheet_Amulet_AmuletBuff {
    readonly id: number; // buffid
    readonly type: number; // 1-boss，2-商店升级，3-场外升级
    readonly deprecated: number; // 屏蔽标记，0正常，1屏蔽
    readonly common_weight: number; // 随机权重
    readonly ex_weight: number; // record_level后的随机权重
    readonly desc: number; // str/event说明文
    readonly invalid_type: number; // 屏蔽天牌/里宝指示：1万2筒3索0里宝指示牌
    readonly args: number[];
}
//////////////////// amulet.amulet_effect ////////////////////
interface Sheet_Amulet_AmuletEffect {
    readonly id: number; // 护身符id
    readonly book_enabled: number; // 是否允许钦定(1可以,0不行)
    readonly deprecated: number; // 屏蔽标记，0正常，1屏蔽
    readonly weight: number; // 商店刷新权重
    readonly effect_group: number; // 1=秘籍，2=梅兰竹菊
    readonly shop_badge: number; // 在商店中是否必定有印章
    readonly duplicate_enabled: number; // 已有升级卡时是否依旧可以在卡包中出现
    readonly upgrade: number; // 升级后的卡
    readonly rarity: number; // 珍贵度，1SSR，2SR，3R，4N
    readonly price: number; // 商店价格
    readonly sell_price: number; // 商店出售价格
    readonly name: number; // str/event卡名
    readonly desc: number; // str/event效果
    readonly card_image: string; // 卡图
    readonly card_remark: number; // 角标
    readonly init_param_view: number[]; // 前端无成长进度时的初始值
    readonly args: number[];
    readonly tag_id: number[];
}
//////////////////// amulet.amulet_effect_group ////////////////////
interface Sheet_Amulet_AmuletEffectGroup {
    readonly id: number; // 护身符组id
    readonly merge_card: number; // 融合后护身符id
}
//////////////////// amulet.amulet_fan ////////////////////
interface Sheet_Amulet_AmuletFan {
    readonly id: number; // 番种id
    readonly val: number; // 番数（都按照门清役计算，可重复时填写1个）
    readonly desc: number; // str/event的番名，0为普通番
}
//////////////////// amulet.amulet_goods ////////////////////
interface Sheet_Amulet_AmuletGoods {
    readonly id: number; // goods_id
    readonly weight: number; // 在商店中出现的权重
    readonly guaranteed: number; // 保底卡珍贵度，1SSR，2SR，3R，4N
    readonly pack_name: number; // 卡包名称str/event
    readonly pack_desc: number; // 卡包简介str/event
    readonly price: number; // 价格
    readonly rarity_weight: number[]; // SSR权重
    readonly badge_weight: number[]; // 无印权重
}
//////////////////// amulet.amulet_shop_upgrade ////////////////////
interface Sheet_Amulet_AmuletShopUpgrade {
    readonly id: number; // 升级group
    readonly level: number; // 等级
    readonly price: number; // 升级价格
    readonly display_value: number; // 显示数值
}
//////////////////// amulet.amulet_upgrade ////////////////////
interface Sheet_Amulet_AmuletUpgrade {
    readonly id: number; // 升级group
    readonly level: number; // 等级
    readonly skill_point: number; // 所需升级点
    readonly buff_id: number; // 每个等级对应一个buff，args设置效果
    readonly display_value: number; // 前端展示数值
}
//////////////////// amulet.amulet_task ////////////////////
interface Sheet_Amulet_AmuletTask {
    readonly id: number; // 任务id
    readonly amulet_id: number; // 相关护身符id
    readonly activity_id: number; // 活动id
    readonly base_task_id: number; // 基础任务id
    readonly reward: string; // 奖励
}
//////////////////// amulet.amulet_pool ////////////////////
interface Sheet_Amulet_AmuletPool {
    readonly level_amulet_pool_id: number; // 护身符池id
    readonly amulet_id: number; // 护身符id
    readonly amulet_weight: number; // 修改后的权重，默认为100
}
//////////////////// amulet.amulet_badge ////////////////////
interface Sheet_Amulet_AmuletBadge {
    readonly id: number; // 印章id
    readonly deprecated: number; // 屏蔽标记，0正常，1屏蔽
    readonly coverable: number; // 可以被覆盖或删除
    readonly weight: number; // 商店刷新权重
    readonly rarity: number; // 档位，1铜，2银，3金
    readonly volume: number; // 印章体积，0普通1大
    readonly badge_name: number; // str/event印章名
    readonly badge_desc: number; // str/event效果
    readonly badge_image: string; // 印章图
    readonly args: number[];
}
//////////////////// amulet.amulet_tag ////////////////////
interface Sheet_Amulet_AmuletTag {
    readonly tag_id: number; // 关键词id
    readonly tag_name: number; // str/event关键词名
    readonly tag_desc: number; // str/event关键词描述
}
//////////////////// amulet.amulet_large_number ////////////////////
interface Sheet_Amulet_AmuletLargeNumber {
    readonly number_id: string; // 数字id（10的n次方）
    readonly number_unit_cn: string; // str/str万进制单位
    readonly number_unit_en: string; // 千进制单位
}
//////////////////// amulet ////////////////////
interface Table_Amulet {
    readonly amulet_activity: IUniqueSheet<Sheet_Amulet_AmuletActivity>;
    readonly amulet_games: IGroupSheet<Sheet_Amulet_AmuletGames>;
    readonly amulet_rewards: IGroupSheet<Sheet_Amulet_AmuletRewards>;
    readonly amulet_buff: IUniqueSheet<Sheet_Amulet_AmuletBuff>;
    readonly amulet_effect: IUniqueSheet<Sheet_Amulet_AmuletEffect>;
    readonly amulet_effect_group: IUniqueSheet<Sheet_Amulet_AmuletEffectGroup>;
    readonly amulet_fan: IUniqueSheet<Sheet_Amulet_AmuletFan>;
    readonly amulet_goods: IUniqueSheet<Sheet_Amulet_AmuletGoods>;
    readonly amulet_shop_upgrade: IGroupSheet<Sheet_Amulet_AmuletShopUpgrade>;
    readonly amulet_upgrade: IGroupSheet<Sheet_Amulet_AmuletUpgrade>;
    readonly amulet_task: IUniqueSheet<Sheet_Amulet_AmuletTask>;
    readonly amulet_pool: IGroupSheet<Sheet_Amulet_AmuletPool>;
    readonly amulet_badge: IUniqueSheet<Sheet_Amulet_AmuletBadge>;
    readonly amulet_tag: IUniqueSheet<Sheet_Amulet_AmuletTag>;
    readonly amulet_large_number: IUniqueSheet<Sheet_Amulet_AmuletLargeNumber>;
}
//////////////////// animation.animation ////////////////////
interface Sheet_Animation_Animation {
    readonly id: number;
    readonly name: string;
    readonly type: string;
    readonly lifetime: number; // 总时长
    readonly speed: number; // 播放速度
    readonly keypoint: number[]; // 关键帧的时间
}
//////////////////// animation ////////////////////
interface Table_Animation {
    readonly animation: IUniqueSheet<Sheet_Animation_Animation>;
}
//////////////////// audio.audio ////////////////////
interface Sheet_Audio_Audio {
    readonly id: number;
    readonly path: string; // 路径
    readonly time_length: number; // 声音长度
    readonly type: string; // 类型，lobby或是mj或是effect
}
//////////////////// audio.bgm ////////////////////
interface Sheet_Audio_Bgm {
    readonly id: number;
    readonly auto_hide: number;
    readonly name_chs: string; // 名称
    readonly name_chs_t: string;
    readonly name_jp: string;
    readonly name_en: string;
    readonly name_kr: string;
    readonly path: string; // 路径
    readonly time_length: number; // 声音长度
    readonly type: string; // 类型，lobby或是mj
    readonly unlock_desc_chs: string; // 解锁条件描述
    readonly unlock_desc_chs_t: string;
    readonly unlock_desc_jp: string;
    readonly unlock_desc_en: string;
    readonly unlock_desc_kr: string;
    readonly unlock_item: number;
}
//////////////////// audio ////////////////////
interface Table_Audio {
    readonly audio: IUniqueSheet<Sheet_Audio_Audio>;
    readonly bgm: IUniqueSheet<Sheet_Audio_Bgm>;
}
//////////////////// character.emoji ////////////////////
interface Sheet_Character_Emoji {
    readonly charid: number; // 角色ID
    readonly sub_id: number; // 表情ID
    readonly unlock_desc_chs: string; // 解锁条件描述
    readonly unlock_desc_chs_t: string;
    readonly unlock_desc_jp: string;
    readonly unlock_desc_en: string;
    readonly unlock_desc_kr: string;
    readonly type: number;
    readonly view: string; // 特效表情的资源名字
    readonly audio: number; // audio_id
    readonly after_unlock_desc_chs: string; // 解锁后描述
    readonly after_unlock_desc_chs_t: string;
    readonly after_unlock_desc_jp: string;
    readonly after_unlock_desc_en: string;
    readonly after_unlock_desc_kr: string;
    readonly unlock_type: number; // 解锁类型
    readonly unlock_param: number[]; // 解锁参数
}
//////////////////// character.cutin ////////////////////
interface Sheet_Character_Cutin {
    readonly skinid: number; // 皮肤ID
    readonly cutin_name: string; // 本体名
    readonly effect: string; // 特效
    readonly atlas: string;
    readonly char_x: number;
    readonly char_y: number;
    readonly char_width: number;
    readonly char_height: number;
    readonly type: number;
}
//////////////////// character.skin ////////////////////
interface Sheet_Character_Skin {
    readonly skinid: number; // 皮肤ID
    readonly spine_layers: number; // 动皮有几层
    readonly effects: string[]; // 特效只允许存在俩层，每层最多俩，用‘,'分割，前面的是持续存在的，后面是跟对应动画出现的
    readonly audio_celebrate: string; // 庆祝音效
    readonly audio_celebrate_idle: string; // 庆祝待机音效
    readonly audio_idle: string;
    readonly audio_greeting: string; // 打招呼音效
    readonly audio_click: string; // 点击音效1
    readonly audio_click2: string; // 点击音效2
    readonly celebrate_delay: number; // 结局界面的胜利动画是否延迟播放
}
//////////////////// character ////////////////////
interface Table_Character {
    readonly emoji: IGroupSheet<Sheet_Character_Emoji>;
    readonly cutin: IUniqueSheet<Sheet_Character_Cutin>;
    readonly skin: IUniqueSheet<Sheet_Character_Skin>;
}
//////////////////// chest.chest ////////////////////
interface Sheet_Chest_Chest {
    readonly id: number;
    readonly type: number; // 0常驻，1活动
    readonly name_chs: string;
    readonly name_jp: string;
    readonly name_en: string;
    readonly desc_chs: string; // 描述
    readonly desc_jp: string;
    readonly desc_en: string;
    readonly desc_kr: string;
    readonly img: string; // 宣传图
    readonly gift: number; // 赠品（许愿石等）
    readonly currency: number; // 货币ID
    readonly price: number; // 单抽价格
    readonly price10: number; // 十连价格
    readonly ticket_id: number; // 可用道具Id
    readonly ticket_10_id: number; // 十连抽道具
    readonly faith_id: number;
    readonly zone: number; // 0国服，1外服
    readonly sort: number; // 数字越大越靠上
}
//////////////////// chest.pool ////////////////////
interface Sheet_Chest_Pool {

}
//////////////////// chest.pool_seq ////////////////////
interface Sheet_Chest_PoolSeq {

}
//////////////////// chest.item_pool ////////////////////
interface Sheet_Chest_ItemPool {

}
//////////////////// chest.chest_shop ////////////////////
interface Sheet_Chest_ChestShop {
    readonly id: number;
    readonly chest_id: number; // 其实是个faithid
    readonly icon: string; // 图标
    readonly name_chs: string; // 名称
    readonly name_chs_t: string;
    readonly name_jp: string;
    readonly name_en: string;
    readonly item_id: number; // 物品ID
    readonly price: number; // 价格
    readonly need_amount: number; // 指定购买数量
    readonly check_activity: number; // 依赖于某个活动
    readonly launch_time: string; // 起售时间，之后才可兑换
    readonly remove_limit_mark: number; // 标记为1则不显示限定角标
    readonly sort: number; // 排序
}
//////////////////// chest.preview ////////////////////
interface Sheet_Chest_Preview {
    readonly chest_id: number;
    readonly item_id: number;
    readonly type: string; // 类型
    readonly check_activity: number; // 依赖于某个活动
}
//////////////////// chest.up ////////////////////
interface Sheet_Chest_Up {

}
//////////////////// chest.item_price ////////////////////
interface Sheet_Chest_ItemPrice {

}
//////////////////// chest.replace_up ////////////////////
interface Sheet_Chest_ReplaceUp {
    readonly id: number; // id
    readonly replace_pool_id: number; // replace池ID
    readonly count: number; // 触发保底次数
    readonly activity_id: number; // 活动ID
    readonly count_id: number; // 计数id
    readonly type: number; // 区分1人物/2装扮
}
//////////////////// chest.replace_pool ////////////////////
interface Sheet_Chest_ReplacePool {
    readonly id: number;
    readonly resource_id: number; // 资源Id
    readonly is_replace: number; // 是否是当期替换up
    readonly add_count: number; // 增加计数量
}
//////////////////// chest ////////////////////
interface Table_Chest {
    readonly chest: IUniqueSheet<Sheet_Chest_Chest>;
    readonly pool: IGroupSheet<Sheet_Chest_Pool>;
    readonly pool_seq: IGroupSheet<Sheet_Chest_PoolSeq>;
    readonly item_pool: IGroupSheet<Sheet_Chest_ItemPool>;
    readonly chest_shop: IUniqueSheet<Sheet_Chest_ChestShop>;
    readonly preview: IGroupSheet<Sheet_Chest_Preview>;
    readonly up: IGroupSheet<Sheet_Chest_Up>;
    readonly item_price: IGroupSheet<Sheet_Chest_ItemPrice>;
    readonly replace_up: IUniqueSheet<Sheet_Chest_ReplaceUp>;
    readonly replace_pool: IGroupSheet<Sheet_Chest_ReplacePool>;
}
//////////////////// compose.characompose ////////////////////
interface Sheet_Compose_Characompose {
    readonly id: number;
    readonly item_id: number; // 碎片id
    readonly item_num: number; // 碎片数量
    readonly chara_id: number; // 对应角色id
}
//////////////////// compose ////////////////////
interface Table_Compose {
    readonly characompose: IUniqueSheet<Sheet_Compose_Characompose>;
}
//////////////////// contest.contest ////////////////////
interface Sheet_Contest_Contest_KV {
    readonly id: string;
    readonly int_value: number;
}
interface Sheet_Contest_Contest {
    readonly contest_create_price: Sheet_Contest_Contest_KV;
}
//////////////////// contest ////////////////////
interface Table_Contest {
    readonly contest: Sheet_Contest_Contest;
}
//////////////////// desktop.matchmode ////////////////////
interface Sheet_Desktop_Matchmode {
    readonly id: number; // 匹配ID
    readonly is_open: number; // 是否开放
    readonly match_group: number; // 匹配组别，相同的可以同时多个匹配
    readonly type: number; // 匹配类型
    readonly activity_id: number; // 活动ID
    readonly open_guyi: number; // 开启古役
    readonly dora3_mode: number; // 开启宝牌宝牌宝牌模式
    readonly begin_open_mode: number; // 开启配牌open模式
    readonly muyu_mode: number; // 开启目玉模式
    readonly xuezhan_mode: number; // 开启血战到底模式
    readonly chuanma_mode: number; // 开启川麻模式
    readonly huanzhang_mode: number; // 开启换三张模式
    readonly jiuchao_mode: number; // 三透牌模式
    readonly reveal_discard: number; // 暗牌模式
    readonly field_spell_mode: number; // 暗牌模式
    readonly zhanxing_mode: number; // 占星模式
    readonly tianming_mode: number; // 天命模式
    readonly yongchang_mode: number; // 咏唱模式
    readonly hunzhiyiji_mode: number; // 魂之一击模式
    readonly wanxiangxiuluo_mode: number; // 万象修罗
    readonly beishuizhizhan_mode: number; // 背水之战
    readonly room: number; // 匹配房间
    readonly mode: number; // 对局模式
    readonly can_sumup: number; // 是否结算
    readonly room_name_chs: string;
    readonly room_name_chs_t: string;
    readonly room_name_jp: string;
    readonly room_name_en: string;
    readonly room_name_kr: string;
    readonly str_rule: string; // 拼接规则
    readonly interval_image: string; // 规则文本小图
    readonly rule_images: string[]; // 图片
    readonly glimit_floor: number; // 金币下限
    readonly glimit_ceil: number; // 金币上限
    readonly gcarry: number; // 入场金额
    readonly exchange_rate: number; // 兑换比例
    readonly levelpoint1: number; // 1位段位分
    readonly levelpoint2: number; // 2位段位分
    readonly levelpoint3: number; // 3位段位分
    readonly levelpoint4: number; // 4位段位分
    readonly fish_point: number; // 渔点
    readonly init_point: number; // 起始配点
    readonly back_point: number; // 返场点数
    readonly count_point: number; // 精算点数
    readonly buchang: number[]; // 顺位补偿1
    readonly level_limit: number; // 准入段位限制
    readonly level_limit_ceil: number; // 准入段位限制3
    readonly tip: number; // 场代
    readonly friendship: number; // 好感度
    readonly chest_id: number; // 宝箱ID
    readonly chest_exp_add: number[]; // 宝箱经验增加
    readonly level_match: number; // 是否开启等级匹配
    readonly level_match_range: number; // 等级匹配范围
    readonly level_match_max: number; // 等级匹配最高等级
}
//////////////////// desktop.chest ////////////////////
interface Sheet_Desktop_Chest {
    readonly id: number; // 宝箱ID
    readonly exp_step: number; // 经验条长度
    readonly name_chs: string; // 宝箱名字
    readonly name_chs_t: string;
    readonly name_jp: string;
    readonly name_en: string;
    readonly name_kr: string;
    readonly icon: string; // 宝箱图标
    readonly reward_pool: number; // 奖池id
    readonly select_count: number; // 抽取数量
    readonly repeated: number; // 是否可以重复
}
//////////////////// desktop.settings ////////////////////
interface Sheet_Desktop_Settings_KV {
    readonly key: string;
    readonly int_value: number;
}
interface Sheet_Desktop_Settings {
    readonly account_friendship_bar_length: Sheet_Desktop_Settings_KV;
    readonly account_friendship_bar_reward_id: Sheet_Desktop_Settings_KV;
}
//////////////////// desktop.field_spell ////////////////////
interface Sheet_Desktop_FieldSpell {
    readonly field: number; // 位置，取值范围[1,3]
    readonly id: number; // id值，取值范围[1,5]
    readonly cardname: string; // 前端用字段
    readonly sord_card_id: number; // 前端排序用卡编号
}
//////////////////// desktop.friend_room ////////////////////
interface Sheet_Desktop_FriendRoom {
    readonly id: number; // 友人房模式
    readonly pre_rule: string; // 对应activity_room,三人四人无
    readonly sort: number; // 数字小的在前
    readonly str_name: string; // 对局名
    readonly str_rule: string; // 拼接规则
    readonly set_jushu: number; // 创建时允许玩家配置局数
    readonly rule_images: string[]; // 图片
}
//////////////////// desktop.tour_preset_rule ////////////////////
interface Sheet_Desktop_TourPresetRule {
    readonly id: number;
    readonly preset_rule: number; // 预设规则名的strID
    readonly params: number[]; // 默认初始点数
}
//////////////////// desktop ////////////////////
interface Table_Desktop {
    readonly matchmode: IUniqueSheet<Sheet_Desktop_Matchmode>;
    readonly chest: IUniqueSheet<Sheet_Desktop_Chest>;
    readonly settings: Sheet_Desktop_Settings;
    readonly field_spell: IUniqueSheet<Sheet_Desktop_FieldSpell>;
    readonly friend_room: IUniqueSheet<Sheet_Desktop_FriendRoom>;
    readonly tour_preset_rule: IUniqueSheet<Sheet_Desktop_TourPresetRule>;
}
//////////////////// events.soscoin ////////////////////
interface Sheet_Events_Soscoin {
    readonly id: number;
    readonly level_limit: number; // 段位限制
    readonly level3_limit: number; // 段位限制
    readonly gold_limit: number; // 铜币阈值
    readonly gold_num: number; // 奖励铜币数量
    readonly desc_chs: string; // 描述
    readonly desc_chs_t: string;
    readonly desc_jp: string;
    readonly desc_en: string;
    readonly desc_kr: string;
}
//////////////////// events.dailyevent ////////////////////
interface Sheet_Events_Dailyevent {
    readonly id: number;
    readonly reward_type: number; // 奖励类型
    readonly reward_num: number; // 奖励数量
    readonly desc_chs: string; // 描述
    readonly desc_chs_t: string;
    readonly desc_jp: string;
    readonly desc_en: string;
    readonly desc_kr: string;
    readonly active_type: number; // 活动类型
    readonly type: number; // 任务类型
    readonly target: number; // 完成次数
    readonly param: string[];
    readonly level_limit: string; // 段位限制1
}
//////////////////// events.base_task ////////////////////
interface Sheet_Events_BaseTask {
    readonly id: number;
    readonly desc_chs: string; // 描述
    readonly desc_chs_t: string;
    readonly desc_jp: string;
    readonly desc_en: string;
    readonly desc_kr: string;
    readonly type: number; // 任务类型
    readonly target: number; // 完成次数
    readonly param: string[]; // 参数列表
}
//////////////////// events ////////////////////
interface Table_Events {
    readonly soscoin: IUniqueSheet<Sheet_Events_Soscoin>;
    readonly dailyevent: IUniqueSheet<Sheet_Events_Dailyevent>;
    readonly base_task: IUniqueSheet<Sheet_Events_BaseTask>;
}
//////////////////// exchange.exchange ////////////////////
interface Sheet_Exchange_Exchange {
    readonly id: number;
    readonly source_currency: number; // 源币种
    readonly source_value: number; // 金额
    readonly target_currency: number; // 目标币种
    readonly target_value: number; // 金额
    readonly icon: string; // 图标
    readonly name_chs: string; // 名称
    readonly name_chs_t: string;
    readonly name_jp: string;
    readonly name_en: string;
    readonly name_kr: string;
    readonly desc_chs: string; // 描述
    readonly desc_chs_t: string;
    readonly desc_jp: string;
    readonly desc_en: string;
    readonly desc_kr: string;
}
//////////////////// exchange.searchexchange ////////////////////
interface Sheet_Exchange_Searchexchange {
    readonly id: number;
    readonly source_currency: number; // 源币种
    readonly source_value: number; // 金额
    readonly target_currency: number; // 目标币种
    readonly target_value: number; // 金额
    readonly icon: string; // 图标
    readonly name_chs: string; // 名称
    readonly name_chs_t: string;
    readonly name_jp: string;
    readonly name_en: string;
    readonly name_kr: string;
    readonly desc_chs: string; // 描述
    readonly desc_chs_t: string;
    readonly desc_jp: string;
    readonly desc_en: string;
    readonly desc_kor: string;
}
//////////////////// exchange.fushiquanexchange ////////////////////
interface Sheet_Exchange_Fushiquanexchange {
    readonly id: number;
    readonly source_currency: number; // 源币种
    readonly source_value: number; // 金额
    readonly target_currency: number; // 目标币种
    readonly target_value: number; // 金额
    readonly icon: string; // 图标
    readonly name_chs: string; // 名称
    readonly name_chs_t: string;
    readonly name_jp: string;
    readonly name_en: string;
    readonly name_kr: string;
    readonly desc_chs: string; // 描述
    readonly desc_chs_t: string; // 描述
    readonly desc_jp: string;
    readonly desc_en: string;
    readonly desc_kr: string;
}
//////////////////// exchange ////////////////////
interface Table_Exchange {
    readonly exchange: IUniqueSheet<Sheet_Exchange_Exchange>;
    readonly searchexchange: IUniqueSheet<Sheet_Exchange_Searchexchange>;
    readonly fushiquanexchange: IUniqueSheet<Sheet_Exchange_Fushiquanexchange>;
}
//////////////////// fan.fan ////////////////////
interface Sheet_Fan_Fan {
    readonly id: number;
    readonly name_chs: string;
    readonly name_chs_t: string;
    readonly name_jp: string;
    readonly name_en: string;
    readonly name_kr: string;
    readonly xuanshang: number; // 是否悬赏，悬赏不算役
    readonly yiman: number; // 役满
    readonly fan_menqing: number; // 门清时候的番数
    readonly fan_fulu: number; // 副露时候的番数
    readonly show_index: number; // 排序
    readonly sound: string; // 报番语音
    readonly is_guyi: number; // 是否古役
    readonly rarity: number; // 役满特效的珍稀度
    readonly show_range_1: number; // 显示区间三四麻
    readonly show_range_2: string; // 显示区间段位友人活动
    readonly merge_id: number; // 合并至其他役种id
    readonly mark: number; // 特殊标记字色
}
//////////////////// fan ////////////////////
interface Table_Fan {
    readonly fan: IUniqueSheet<Sheet_Fan_Fan>;
}
//////////////////// fandesc.fandesc ////////////////////
interface Sheet_Fandesc_Fandesc {
    readonly id: number;
    readonly tag: number; // 标签
    readonly name_chs: string; // 番名
    readonly name_chs_t: string;
    readonly name_jp: string;
    readonly name_en: string;
    readonly name_kr: string;
    readonly desc_chs: string; // 说明
    readonly desc_chs_t: string;
    readonly desc_jp: string;
    readonly desc_en: string;
    readonly desc_kr: string;
    readonly desc2_chs: string; // 状态说明
    readonly desc2_jp: string;
    readonly desc2_en: string;
    readonly desc2_chs_t: string;
    readonly desc2_kr: string;
    readonly case: string; // 例子
    readonly show: number; // 是否显示
    readonly mode: number; // 0通常 1川麻
}
//////////////////// fandesc ////////////////////
interface Table_Fandesc {
    readonly fandesc: IUniqueSheet<Sheet_Fandesc_Fandesc>;
}
//////////////////// game_live.select_filters ////////////////////
interface Sheet_GameLive_SelectFilters {
    readonly id: number;
    readonly category: number; // 游戏分类
    readonly mode_id: number; // 匹配模式id
    readonly mode: number; // 游戏模式（好友模式）
    readonly tournament_id: number; // 联赛id
    readonly open: number; // 开关
    readonly initial: number; // 初始选项
    readonly name1_chs: string; // 选项名字1
    readonly name1_chs_t: string;
    readonly name1_jp: string;
    readonly name1_en: string;
    readonly name1_kr: string;
    readonly name2_chs: string; // 选项名字2
    readonly name2_chs_t: string;
    readonly name2_jp: string;
    readonly name2_en: string;
    readonly name2_kr: string;
}
//////////////////// game_live ////////////////////
interface Table_GameLive {
    readonly select_filters: IUniqueSheet<Sheet_GameLive_SelectFilters>;
}
//////////////////// global.global ////////////////////
interface Sheet_Global_Global {
    readonly id: number;
    readonly args: string; // 参数
}
//////////////////// global ////////////////////
interface Table_Global {
    readonly global: IUniqueSheet<Sheet_Global_Global>;
}
//////////////////// info.error ////////////////////
interface Sheet_Info_Error {
    readonly id: number;
    readonly chs: string;
    readonly chs_t: string;
    readonly jp: string;
    readonly en: string;
    readonly kr: string;
}
//////////////////// info.forbidden ////////////////////
interface Sheet_Info_Forbidden {
    readonly word: string;
    readonly type_chs: number;
    readonly near_chs: number;
    readonly chs: number;
    readonly type_us: number;
    readonly near_us: number;
    readonly us: number;
    readonly type_jp: number;
    readonly near_jp: number;
    readonly jp: number;
}
//////////////////// info.near ////////////////////
interface Sheet_Info_Near {
    readonly word1: string; // 形近字1
    readonly word2: string; // 形近字2
    readonly word3: string; // 形近字3
    readonly word4: string; // 形近字4
    readonly word5: string; // 形近字5
}
//////////////////// info.translate ////////////////////
interface Sheet_Info_Translate {
    readonly original: string;
    readonly chs: string;
    readonly chs_t: string;
    readonly jp: string;
    readonly en: string;
    readonly kr: string;
}
//////////////////// info ////////////////////
interface Table_Info {
    readonly error: IUniqueSheet<Sheet_Info_Error>;
    readonly forbidden: INoKeySheet<Sheet_Info_Forbidden>;
    readonly near: INoKeySheet<Sheet_Info_Near>;
    readonly translate: IUniqueSheet<Sheet_Info_Translate>;
}
//////////////////// item_definition.currency ////////////////////
interface Sheet_ItemDefinition_Currency {
    readonly id: number;
    readonly name_chs: string; // 名称
    readonly name_chs_t: string; // 名称
    readonly name_jp: string;
    readonly name_en: string;
    readonly name_kr: string;
    readonly desc_chs: string;
    readonly desc_chs_t: string;
    readonly desc_jp: string;
    readonly desc_en: string;
    readonly desc_kr: string;
    readonly icon: string; // 图标
    readonly icon_jpg: string; // 图标
}
//////////////////// item_definition.item ////////////////////
interface Sheet_ItemDefinition_Item {
    readonly id: number;
    readonly sort: number; // 递增 数字大的在后
    readonly name_chs: string; // 名称
    readonly name_chs_t: string;
    readonly name_chs_t2: string;
    readonly name_jp: string;
    readonly name_en: string;
    readonly name_kr: string; // 名称
    readonly desc_func_chs: string; // 描述
    readonly desc_chs: string; // 描述
    readonly desc_func_chs_t: string;
    readonly desc_chs_t: string;
    readonly desc_chs_t2: string;
    readonly desc_func_jp: string;
    readonly desc_jp: string;
    readonly desc_func_en: string;
    readonly desc_en: string;
    readonly desc_func_kr: string;
    readonly desc_kr: string;
    readonly icon: string; // 图标
    readonly icon_transparent: string; // 半透图标
    readonly category: number; // 类别
    readonly type: number; // 子类型
    readonly is_unique: number; // 是否唯一
    readonly max_stack: number; // 物品持有上限
    readonly access: string; // 获取途径
    readonly accessinfo: number; // 获取文本 STRID
    readonly func: string; // 功能
    readonly iargs: number[]; // 数值参数
    readonly sargs: string[]; // 文本参数
    readonly can_sell: number; // 是否可出售
    readonly sell_reward_id: number; // 出售获得id
    readonly sell_reward_count: number; // 出售获得数量
    readonly item_expire: string; // 过期时间
    readonly expire_desc_chs: string; // 过期时间描述
    readonly expire_desc_chs_t: string; // 过期时间描述
    readonly expire_desc_jp: string; // 过期时间描述
    readonly expire_desc_en: string; // 过期时间描述
    readonly expire_desc_kr: string; // 过期时间描述
    readonly region_limit: number; // 1=KR区域不展示
    readonly cross_view: number; // 跨服可视性，1为可跨服，0为不可跨服
    readonly database_cache: number; // 其他玩家可见性
}
//////////////////// item_definition.title ////////////////////
interface Sheet_ItemDefinition_Title {
    readonly id: number;
    readonly name_chs: string; // 名称
    readonly name_chs_t: string;
    readonly name_jp: string;
    readonly name_en: string;
    readonly name_kr: string;
    readonly desc_chs: string; // 描述
    readonly desc_chs_t: string;
    readonly desc_jp: string;
    readonly desc_en: string;
    readonly desc_kr: string;
    readonly icon: string; // 图标
    readonly icon_item: string; // 图标
    readonly priority: number; // 优先级高的限制在前面
    readonly unlock_type: number; // 解锁类型
    readonly unlock_param: number[]; // 解锁参数
    readonly cross_view: number; // 跨服可视性，1为可跨服，0为不可跨服
}
//////////////////// item_definition.character ////////////////////
interface Sheet_ItemDefinition_Character {
    readonly id: number;
    readonly sort: number; // 递增 数字大的在后
    readonly launch_time: string; // 起售时间，之后才显示在声音和仓库
    readonly name_chs: string; // 名称
    readonly name_chs2: string; // 名称
    readonly name_chs_t: string;
    readonly name_chs_t2: string;
    readonly name_jp: string;
    readonly name_jp2: string;
    readonly name_en: string;
    readonly name_kr: string;
    readonly open: number; // 是否开放
    readonly init_skin: number; // 初始皮肤
    readonly full_fetter_skin: number; // 满羁绊皮肤
    readonly hand: number; // 默认手
    readonly favorite: number; // 喜好
    readonly star_5_material: string; // 5星突破材料 1-8
    readonly star_5_cost: number; // 5星突破铜币消耗
    readonly can_marry: number; // 是否可缔结契约
    readonly exchange_item_id: number; // 重复兑换物品ID
    readonly exchange_item_num: number; // 重复兑换物品数量
    readonly emo: string; // 表情
    readonly sound: number; // 语音库
    readonly sound_volume: number; // 声音音效修正
    readonly sex: number; // 性别,1女，2:男
    readonly desc_stature_chs: string; // 身高
    readonly desc_stature_chs_t: string; // 身高
    readonly desc_stature_jp: string;
    readonly desc_stature_en: string;
    readonly desc_stature_kr: string;
    readonly desc_birth_chs: string; // 生日
    readonly desc_birth_chs_t: string;
    readonly desc_birth_jp: string;
    readonly desc_birth_en: string;
    readonly desc_birth_kr: string;
    readonly desc_age_chs: string; // 年龄
    readonly desc_age_chs_t: string;
    readonly desc_age_jp: string;
    readonly desc_age_en: string;
    readonly desc_age_kr: string;
    readonly desc_bloodtype_chs: string; // 血型
    readonly desc_bloodtype_chs_t: string; // 血型
    readonly desc_bloodtype_jp: string; // 血型
    readonly desc_bloodtype_en: string; // 血型
    readonly desc_bloodtype_kr: string; // 血型
    readonly desc_cv_chs: string; // 声优
    readonly desc_cv_chs_t: string;
    readonly desc_cv_jp: string;
    readonly desc_cv_en: string;
    readonly desc_cv_kr: string;
    readonly desc_hobby_chs: string; // 爱好
    readonly desc_hobby_chs_t: string;
    readonly desc_hobby_jp: string;
    readonly desc_hobby_en: string;
    readonly desc_hobby_kr: string;
    readonly desc_chs: string; // 档案描述
    readonly desc_item_chs: string;
    readonly desc_chs_t: string;
    readonly desc_item_chs_t: string;
    readonly desc_jp: string;
    readonly desc_item_jp: string;
    readonly desc_en: string;
    readonly desc_item_en: string;
    readonly desc_kr: string;
    readonly desc_item_kr: string;
    readonly collaboration: number; // 联动标记，12的生日=年级，其他的不替换
    readonly region_limit: number; // 1=KR入口屏蔽
    readonly skin_lib: number[]; // 皮肤库
    readonly ur: number; // UR标记
    readonly ur_ron: number; // 默认自带和牌
    readonly ur_liqi: number; // 默认自带立直
    readonly ur_cutin: string;
    readonly limited: number; // 期间限定雀士标签
    readonly treasure_sp: number; // 抽卡界面固定在左侧
    readonly blink: number; // 传记眨眼
}
//////////////////// item_definition.view ////////////////////
interface Sheet_ItemDefinition_View {
    readonly id: number;
    readonly res_name: string; // 资源名字
    readonly audio_id: number;
    readonly character_id: number; // 专属人物ID
    readonly sargs: string[]; // 额外参数
    readonly old_effect_mark: number; // 旧特效标记
    readonly new_hand: number; // 新版手模型标记
    readonly seat_related: number; // 不同座位特效不同
}
//////////////////// item_definition.skin ////////////////////
interface Sheet_ItemDefinition_Skin {
    readonly id: number;
    readonly type: number; // 是不是原皮
    readonly name_chs: string; // 名称
    readonly name_chs_t: string;
    readonly name_jp: string;
    readonly name_en: string;
    readonly name_kr: string;
    readonly desc_chs: string; // 描述
    readonly desc_chs_t: string; // 描述
    readonly desc_jp: string;
    readonly desc_jp2: string;
    readonly desc_en: string;
    readonly desc_kr: string;
    readonly character_id: number; // 角色id索引
    readonly lock_tips_chs: string; // 未解锁的提示
    readonly lock_tips_chs_t: string;
    readonly lock_tips_jp: string;
    readonly lock_tips_en: string;
    readonly lock_tips_kr: string;
    readonly path: string; // 文件夹路径
    readonly exchange_item_id: number; // 重复兑换物品ID
    readonly exchange_item_num: number; // 重复兑换物品数量
    readonly direction: number; // 立绘朝向1左0右
    readonly no_reverse: number; // 和服不可翻转
    readonly lock_reverse: number; // 全局禁止反转，针对特殊角色
    readonly offset_x: number; // 剧情用偏移
    readonly offset_y: number; // 剧情用偏移
    readonly spot_scale: string; // 剧情用偏移
    readonly effective_time: string; // 生效时间，此服务端时间后才开始展示
    readonly lobby_offset: string; // 大厅偏移数据
    readonly liaoshe_offset: string; // 偏移数据
    readonly shop_offset: string; // 偏移数据
    readonly win_offset: string; // 偏移数据
    readonly gameend_offset: string; // 偏移数据
    readonly starup_offset: string; // 偏移数据
    readonly treasure_offset: string; // 偏移数据
    readonly ck_full_0_offset: string; // 偏移数据
    readonly ck_full_1_offset: string; // 偏移数据
    readonly ck_full_2_offset: string; // 偏移数据
    readonly ck_full_3_offset: string; // 偏移数据
    readonly ck_full_single_offset: string; // 偏移数据
    readonly ck_half_0_offset: string; // 偏移数据
    readonly ck_half_1_offset: string; // 偏移数据
    readonly ck_half_2_offset: string; // 偏移数据
    readonly ck_half_3_offset: string; // 偏移数据
    readonly ck_half_single_offset: string; // 偏移数据
    readonly smallhead_x: number;
    readonly smallhead_y: number;
    readonly smallhead_width: number;
    readonly full_x: number;
    readonly full_y: number;
    readonly full_width: number;
    readonly full_height: number;
    readonly half_x: number;
    readonly half_y: number;
    readonly half_width: number;
    readonly half_height: number;
    readonly spine_type: number; // 皮肤类型
    readonly spine_width: number;
    readonly spine_height: number;
    readonly pivot_x: number;
    readonly pivot_y: number;
    readonly idle: number;
    readonly greeting: number; // 三项span动画时间
    readonly celebrate: number;
    readonly click: number;
    readonly greeting_init: number; // 获得动画持续时间长度
    readonly click2: number;
    readonly celebrate_idle: number;
    readonly illust_data: string;
}
//////////////////// item_definition.item_recovery ////////////////////
interface Sheet_ItemDefinition_ItemRecovery {

}
//////////////////// item_definition.item_manual_pool ////////////////////
interface Sheet_ItemDefinition_ItemManualPool {
    readonly id: number;
    readonly res_id: number; // 资源ID
    readonly res_count: number; // 资源数量
}
//////////////////// item_definition.source_limit ////////////////////
interface Sheet_ItemDefinition_SourceLimit {
    readonly id: number; // 限制ID
    readonly item_id: number; // 道具ID
    readonly item_limit: number; // 获得上限每日
}
//////////////////// item_definition.item_package ////////////////////
interface Sheet_ItemDefinition_ItemPackage {
    readonly id: number;
    readonly res_id: number; // 资源ID
    readonly res_count: number; // 资源数量
}
//////////////////// item_definition.fake_random_pool ////////////////////
interface Sheet_ItemDefinition_FakeRandomPool {
    readonly id: number; // ID
    readonly stage_count: number[];
    readonly stage_weight: number[];
}
//////////////////// item_definition.loading_image ////////////////////
interface Sheet_ItemDefinition_LoadingImage {
    readonly id: number;
    readonly img_path: string; // 大图路径
    readonly thumb_path: string; // 缩略图路径
    readonly sort: number; // 排序，数字大（新）的靠前展示
    readonly unlock_items: number[];
    readonly args: number[];
}
//////////////////// item_definition.function_item ////////////////////
interface Sheet_ItemDefinition_FunctionItem {
    readonly id: number; // 功能道具id
    readonly type: number; // 类型
    readonly args: number[]; // 参数0
    readonly name: number; // 名称strid
    readonly desc_func: number; // 功能描述strid
    readonly desc: number; // 道具描述strid
    readonly icon: string; // 图标
    readonly icon_transparent: string; // 半透图标
}
//////////////////// item_definition ////////////////////
interface Table_ItemDefinition {
    readonly currency: IUniqueSheet<Sheet_ItemDefinition_Currency>;
    readonly item: IUniqueSheet<Sheet_ItemDefinition_Item>;
    readonly title: IUniqueSheet<Sheet_ItemDefinition_Title>;
    readonly character: IUniqueSheet<Sheet_ItemDefinition_Character>;
    readonly view: IUniqueSheet<Sheet_ItemDefinition_View>;
    readonly skin: IUniqueSheet<Sheet_ItemDefinition_Skin>;
    readonly item_recovery: IGroupSheet<Sheet_ItemDefinition_ItemRecovery>;
    readonly item_manual_pool: IGroupSheet<Sheet_ItemDefinition_ItemManualPool>;
    readonly source_limit: IGroupSheet<Sheet_ItemDefinition_SourceLimit>;
    readonly item_package: IGroupSheet<Sheet_ItemDefinition_ItemPackage>;
    readonly fake_random_pool: IUniqueSheet<Sheet_ItemDefinition_FakeRandomPool>;
    readonly loading_image: IUniqueSheet<Sheet_ItemDefinition_LoadingImage>;
    readonly function_item: IUniqueSheet<Sheet_ItemDefinition_FunctionItem>;
}
//////////////////// leaderboard.leaderboard ////////////////////
interface Sheet_Leaderboard_Leaderboard {
    readonly id: number;
    readonly start_time: string; // 开始排名时间
    readonly end_time: string; // 最终排名时间
    readonly refresh_cd: number; // 刷新cd（秒）
    readonly max_count: number; // 上榜最多人数
    readonly show_list: string; // 展示列表（排名）
}
//////////////////// leaderboard ////////////////////
interface Table_Leaderboard {
    readonly leaderboard: IUniqueSheet<Sheet_Leaderboard_Leaderboard>;
}
//////////////////// level_definition.level_definition ////////////////////
interface Sheet_LevelDefinition_LevelDefinition {
    readonly id: number;
    readonly type: number;
    readonly primary_level: number;
    readonly secondary_level: number;
    readonly init_point: number;
    readonly end_point: number;
    readonly primary_icon: string;
    readonly name_chs: string;
    readonly name_chs_t: string;
    readonly name_jp: string;
    readonly name_en: string;
    readonly name_kr: string;
    readonly full_name_chs: string;
    readonly full_name_chs_t: string;
    readonly full_name_jp: string;
    readonly full_name_en: string;
    readonly full_name_kr: string;
    readonly can_degrade: number;
    readonly can_upgrade: number;
    readonly can_getpoint: number;
    readonly rankpt1: number; // 东风场4位扣分
    readonly rankpt2: number; // 南风场4位扣分
    readonly top_rank_id: number; // top_rank规则的id
}
//////////////////// level_definition.character ////////////////////
interface Sheet_LevelDefinition_Character {
    readonly level: number;
    readonly character_id: number;
    readonly exp: number; // 经验槽
    readonly reward: string; // 升级好感后的奖励道具
    readonly unlock_says: number; // 升级后说的话
    readonly unlock_desc_chs: string; // 解锁时的描述
    readonly unlock_desc_chs_t: string;
    readonly unlock_desc_jp: string;
    readonly unlock_desc_en: string;
    readonly unlock_desc_kr: string;
}
//////////////////// level_definition.trail ////////////////////
interface Sheet_LevelDefinition_Trail {
    readonly id: number;
    readonly init_level: number; // 初始等级
    readonly end_level: number; // 截止等级
    readonly trail_icon: number; // 图标
    readonly trail_fire: number; // 火数
}
//////////////////// level_definition.top_rank ////////////////////
interface Sheet_LevelDefinition_TopRank {
    readonly id: number;
    readonly rank_pt: number[]; // 第一名获得pt
    readonly top_rank_pt: number[]; // 巅峰对决第一名
    readonly mode: number;
}
//////////////////// level_definition ////////////////////
interface Table_LevelDefinition {
    readonly level_definition: IUniqueSheet<Sheet_LevelDefinition_LevelDefinition>;
    readonly character: IGroupSheet<Sheet_LevelDefinition_Character>;
    readonly trail: IUniqueSheet<Sheet_LevelDefinition_Trail>;
    readonly top_rank: IGroupSheet<Sheet_LevelDefinition_TopRank>;
}
//////////////////// mail ////////////////////
interface Table_Mail {

}
//////////////////// mall.goods ////////////////////
interface Sheet_Mall_Goods {
    readonly id: number;
    readonly name_chs: string;
    readonly name_chs_t: string;
    readonly name_jp: string;
    readonly name_en: string;
    readonly name_kr: string;
    readonly desc: string; // 描述
    readonly desc_chs: string;
    readonly desc_chs_t: string;
    readonly desc_jp: string;
    readonly desc_en: string;
    readonly desc_kr: string;
    readonly icon: string; // 图标
    readonly resource_id: number; // 资源ID
    readonly resource_count: number; // 资源数量
    readonly vip_exp: number; // 增加的vip经验
    readonly cny: number; // 首充档位ID
    readonly price: string; // 显示用的价格
    readonly first_desc_chs: string;
    readonly first_desc_chs_t: string;
    readonly first_desc_jp: string;
    readonly first_desc_en: string;
    readonly first_desc_kr: string;
    readonly first_extend_add: number; // 首冲额外赠送
    readonly normal_desc_chs: string;
    readonly normal_desc_chs_t: string;
    readonly normal_desc_jp: string;
    readonly normal_desc_en: string;
    readonly normal_desc_kr: string;
    readonly normal_extend_add: number; // 非首冲赠送辉玉
    readonly type: number; // 显示在哪个屋
}
//////////////////// mall.product ////////////////////
interface Sheet_Mall_Product {
    readonly payment_platform: number; // 支付平台
    readonly goods_id: number; // 商品ID
    readonly product_type: number; // 商品类型
    readonly product_id: string; // 上架平台商品ID
    readonly currency_code: string; // 货币标准符号
    readonly currency_price: number; // 货币价格
    readonly actual_code: string; // 实际使用的货币符号
    readonly actual_price: number; // 实际支付价格（用于第三方支付）
    readonly brief_desc: string; // 简要描述
    readonly detail_desc: string; // 详细描述
}
//////////////////// mall.goods_shelves ////////////////////
interface Sheet_Mall_GoodsShelves {
    readonly id: string; // 货架ID
    readonly goods_id: number; // 商品ID
    readonly currency_code: string; // 货币标准符号
    readonly currency_price: number; // 货币价格
    readonly price: string;
    readonly is_monthcard: number; // 是不是月卡
}
//////////////////// mall.zone_params ////////////////////
interface Sheet_Mall_ZoneParams {
    readonly zone_id: string;
    readonly key: string;
    readonly string_value: string;
}
//////////////////// mall.month_ticket ////////////////////
interface Sheet_Mall_MonthTicket {
    readonly id: number; // 月票ID 和goods里的ID是同一个 不要重复
    readonly name_chs: string; // 月票名称
    readonly name_chs_t: string;
    readonly name_jp: string;
    readonly name_en: string;
    readonly name_kr: string;
    readonly resource_id: number; // 资源ID
    readonly resource_count: number; // 一次性交付资源数量
    readonly vip_exp: number; // 增加的vip经验
    readonly effective_time: number; // 有效期(日)
    readonly icon: string; // 图标
    readonly desc_chs: string; // 描述
    readonly desc_chs_t: string;
    readonly desc_jp: string;
    readonly desc_en: string;
    readonly desc_kr: string;
    readonly desc_detail_chs: string; // 购买弹出来的描述
    readonly desc_detail_chs_t: string;
    readonly desc_detail_jp: string;
    readonly desc_detail_en: string;
    readonly desc_detail_kr: string;
    readonly desc_detail2_chs: string; // 购买弹出来的描述
    readonly desc_detail2_chs_t: string;
    readonly desc_detail2_jp: string;
    readonly desc_detail2_en: string;
    readonly desc_detail2_kr: string;
}
//////////////////// mall.channel_config ////////////////////
interface Sheet_Mall_ChannelConfig {
    readonly id: number; // 渠道ID
    readonly currency_platforms: string; // 渠道可消费货币种类
    readonly free_jade_ids: string; // 免费辉玉ID
    readonly paid_jade_ids: string; // 付费辉玉ID
    readonly free_voucher_ids: string; // 免费服饰券ID
    readonly paid_voucher_ids: string; // 付费服饰券ID
    readonly goods_id: number; // 渠道使用的goods_id
    readonly shelves_id: string; // 货架id
    readonly name: string; // 渠道代号
}
//////////////////// mall.month_ticket_info ////////////////////
interface Sheet_Mall_MonthTicketInfo {
    readonly id: number;
}
//////////////////// mall ////////////////////
interface Table_Mall {
    readonly goods: IUniqueSheet<Sheet_Mall_Goods>;
    readonly product: IGroupSheet<Sheet_Mall_Product>;
    readonly goods_shelves: IGroupSheet<Sheet_Mall_GoodsShelves>;
    readonly zone_params: IGroupSheet<Sheet_Mall_ZoneParams>;
    readonly month_ticket: IUniqueSheet<Sheet_Mall_MonthTicket>;
    readonly channel_config: IUniqueSheet<Sheet_Mall_ChannelConfig>;
    readonly month_ticket_info: IUniqueSheet<Sheet_Mall_MonthTicketInfo>;
}
//////////////////// match_shilian.shilian ////////////////////
interface Sheet_MatchShilian_Shilian {
    readonly id: number;
    readonly name: string;
    readonly ticket_id: number;
    readonly currency_id: number;
    readonly currency_count: number;
    readonly mode: number; // 见mode解释
    readonly mode1: number;
    readonly mode2: number;
    readonly init_point: number; // 起始配点
    readonly back_point: number; // 返场点数
}
//////////////////// match_shilian.shilian_reward ////////////////////
interface Sheet_MatchShilian_ShilianReward {
    readonly id: number;
    readonly reward_id: number;
    readonly reward_count: number;
}
//////////////////// match_shilian.shilian_time ////////////////////
interface Sheet_MatchShilian_ShilianTime {
    readonly id: number;
    readonly start: string;
    readonly end: string;
}
//////////////////// match_shilian ////////////////////
interface Table_MatchShilian {
    readonly shilian: IUniqueSheet<Sheet_MatchShilian_Shilian>;
    readonly shilian_reward: IGroupSheet<Sheet_MatchShilian_ShilianReward>;
    readonly shilian_time: IUniqueSheet<Sheet_MatchShilian_ShilianTime>;
}
//////////////////// misc_function.daily_sign_in ////////////////////
interface Sheet_MiscFunction_DailySignIn {
    readonly id: number; // 天数 1-7
    readonly reward_id: number; // 奖励Id
    readonly reward_count: number; // 奖励数量
}
//////////////////// misc_function ////////////////////
interface Table_MiscFunction {
    readonly daily_sign_in: IUniqueSheet<Sheet_MiscFunction_DailySignIn>;
}
//////////////////// outfit_config.ron ////////////////////
interface Sheet_OutfitConfig_Ron {
    readonly id: number; // 道具id
    readonly is_fullscreen: number; // 是含有全屏特效，1有，0无
    readonly queue_change_delay: number; // 牌层级恢复时间
}
//////////////////// outfit_config.liqi ////////////////////
interface Sheet_OutfitConfig_Liqi {
    readonly id: number; // 道具id
}
//////////////////// outfit_config.effect_liqi ////////////////////
interface Sheet_OutfitConfig_EffectLiqi {
    readonly id: number; // 道具id
}
//////////////////// outfit_config.mpzs ////////////////////
interface Sheet_OutfitConfig_Mpzs {
    readonly id: number; // 道具id
}
//////////////////// outfit_config.tablecloth ////////////////////
interface Sheet_OutfitConfig_Tablecloth {
    readonly id: number; // 道具id
}
//////////////////// outfit_config.mjp ////////////////////
interface Sheet_OutfitConfig_Mjp {
    readonly id: number; // 道具id
}
//////////////////// outfit_config.mjpface ////////////////////
interface Sheet_OutfitConfig_Mjpface {
    readonly id: number; // 道具id
}
//////////////////// outfit_config.headframe ////////////////////
interface Sheet_OutfitConfig_Headframe {
    readonly id: number; // 道具id
}
//////////////////// outfit_config.hand ////////////////////
interface Sheet_OutfitConfig_Hand {
    readonly id: number; // 道具id
}
//////////////////// outfit_config ////////////////////
interface Table_OutfitConfig {
    readonly ron: IUniqueSheet<Sheet_OutfitConfig_Ron>;
    readonly liqi: IUniqueSheet<Sheet_OutfitConfig_Liqi>;
    readonly effect_liqi: IUniqueSheet<Sheet_OutfitConfig_EffectLiqi>;
    readonly mpzs: IUniqueSheet<Sheet_OutfitConfig_Mpzs>;
    readonly tablecloth: IUniqueSheet<Sheet_OutfitConfig_Tablecloth>;
    readonly mjp: IUniqueSheet<Sheet_OutfitConfig_Mjp>;
    readonly mjpface: IUniqueSheet<Sheet_OutfitConfig_Mjpface>;
    readonly headframe: IUniqueSheet<Sheet_OutfitConfig_Headframe>;
    readonly hand: IUniqueSheet<Sheet_OutfitConfig_Hand>;
}
//////////////////// rank_introduce.rank ////////////////////
interface Sheet_RankIntroduce_Rank {
    readonly id: number;
    readonly info: string[];
}
//////////////////// rank_introduce.rank3 ////////////////////
interface Sheet_RankIntroduce_Rank3 {
    readonly id: number;
    readonly info: string[];
}
//////////////////// rank_introduce ////////////////////
interface Table_RankIntroduce {
    readonly rank: IUniqueSheet<Sheet_RankIntroduce_Rank>;
    readonly rank3: IUniqueSheet<Sheet_RankIntroduce_Rank3>;
}
//////////////////// season.season ////////////////////
interface Sheet_Season_Season {
    readonly id: number;
    readonly start_time: string; // 开始时间
    readonly end_time: string; // 结束时间
    readonly disappear_time: string; // 消失不显示时间
    readonly match_mode: number; // 匹配房id
    readonly level_ticket_pool: number; // 课题券池
    readonly ticket_retry: number; // 再发行ID
    readonly point_item_id: number; // 积分道具ID
    readonly point_consume: number; // 敲章消耗积分
    readonly desc_chs: string; // 赛季名
    readonly desc_chs_t: string; // 赛季名
    readonly desc_jp: string; // 赛季名
    readonly desc_en: string; // 赛季名
    readonly desc_kr: string; // 赛季名
    readonly desktop_type: number; // 桌类型
}
//////////////////// season.level_ticket ////////////////////
interface Sheet_Season_LevelTicket {
    readonly id: number; // 课题券ID
    readonly level: number; // 难度
    readonly game_count: number; // 最大对局数
    readonly weight: number; // 权重
    readonly task: number[]; // 课题券任务
    readonly reward: string;
}
//////////////////// season.level_ticket_pool ////////////////////
interface Sheet_Season_LevelTicketPool {
    readonly pool_id: number; // 课题券池ID
    readonly level_lower: number; // 等级下限
    readonly level_upper: number; // 等级上限
    readonly ticket_level: number; // 课题券难度
}
//////////////////// season.ticket_retry ////////////////////
interface Sheet_Season_TicketRetry {
    readonly group_id: number; // 组别id
    readonly count: number; // 次数
    readonly cost: number; // 花费铜币
}
//////////////////// season.season_reward ////////////////////
interface Sheet_Season_SeasonReward {
    readonly season_id: number; // 赛季ID
    readonly rank_lower: number; // 排名下限
    readonly rank_upper: number; // 排名上限
    readonly rewards: string; // 奖励列表
}
//////////////////// season ////////////////////
interface Table_Season {
    readonly season: IUniqueSheet<Sheet_Season_Season>;
    readonly level_ticket: IUniqueSheet<Sheet_Season_LevelTicket>;
    readonly level_ticket_pool: IGroupSheet<Sheet_Season_LevelTicketPool>;
    readonly ticket_retry: IGroupSheet<Sheet_Season_TicketRetry>;
    readonly season_reward: IGroupSheet<Sheet_Season_SeasonReward>;
}
//////////////////// shoot.shoot_info ////////////////////
interface Sheet_Shoot_ShootInfo {
    readonly activity_id: number; // 活动id
    readonly missions_group_id: number; // 关卡组id
    readonly level_count: number; // 关卡总数
    readonly bullet_item_id: number; // 子弹道具
}
//////////////////// shoot.shoot_mission ////////////////////
interface Sheet_Shoot_ShootMission {
    readonly group_id: number; // 关卡配置组
    readonly level: number; // 关卡
    readonly enemy_group_id: number; // 敌人组
}
//////////////////// shoot.shoot_enemy ////////////////////
interface Sheet_Shoot_ShootEnemy {
    readonly group_id: number; // 敌人配置组
    readonly enemy_id: number; // 敌人id独立
    readonly hp: number; // 敌人生命值
    readonly reward_group_id: number; // 奖励组
    readonly x: number; // 敌人初始坐标
    readonly y: number; // 敌人所处高度，3最高
    readonly width: number; // 敌人宽度
}
//////////////////// shoot.shoot_reward ////////////////////
interface Sheet_Shoot_ShootReward {
    readonly group_id: number; // 道具奖励组
    readonly reward_id: number; // 奖励id唯一
    readonly reward: string; // 奖励内容，道具id-个数
    readonly reward_level: number; // 奖励等级，3最高1最低
    readonly reward_merge: number; // 合并等级，同一level内数字小的靠前
    readonly activity_id: number; // 活动id
}
//////////////////// shoot ////////////////////
interface Table_Shoot {
    readonly shoot_info: IUniqueSheet<Sheet_Shoot_ShootInfo>;
    readonly shoot_mission: IGroupSheet<Sheet_Shoot_ShootMission>;
    readonly shoot_enemy: IGroupSheet<Sheet_Shoot_ShootEnemy>;
    readonly shoot_reward: IGroupSheet<Sheet_Shoot_ShootReward>;
}
//////////////////// shops.zhp_goods ////////////////////
interface Sheet_Shops_ZhpGoods {
    readonly id: number;
    readonly icon: string; // 图标
    readonly name_chs: string; // 名称
    readonly name_chs_t: string;
    readonly name_jp: string;
    readonly name_en: string;
    readonly item_id: number; // 物品ID
    readonly name_kr: string;
    readonly buy_limit: number; // 购买数量限制
    readonly currency: number; // 货币种类
    readonly price: number; // 单价
    readonly need_amount: number; // 需要指定购买数量
    readonly show_has: number; // 显示已拥有数量
}
//////////////////// shops.zhp_refresh_group ////////////////////
interface Sheet_Shops_ZhpRefreshGroup {

}
//////////////////// shops.zhp_refresh_price ////////////////////
interface Sheet_Shops_ZhpRefreshPrice {
    readonly id: number; // 组id
    readonly refresh_price: number; // 刷新价格
}
//////////////////// shops.goods ////////////////////
interface Sheet_Shops_Goods {
    readonly id: number;
    readonly category: number; // 商店类型
    readonly category_goods: number; // 商品类型
    readonly icon: string; // 图标
    readonly name_chs: string; // 名称
    readonly name_chs_t: string; // 名称
    readonly name_jp: string;
    readonly name_en: string;
    readonly name_kr: string;
    readonly desc_chs: string;
    readonly desc_chs_t: string;
    readonly desc_jp: string;
    readonly desc_en: string;
    readonly desc_kr: string;
    readonly item_id: number; // 物品ID
    readonly price: string; // 价格
    readonly show_original_price: string; // 价格
    readonly need_amount: number; // 指定购买数量
    readonly buy_limit: number; // 购买数量限制
    readonly show_has: number; // 显示已拥有数量
    readonly sort: number; // 排序
    readonly discount: number; // 折扣(万分比)
    readonly sell_activity: number; // 销售期间活动id
    readonly launch_time: string; // 起售时间，之后才可兑换
    readonly func: string;
    readonly discount_activity: number; // 打折期间活动id
    readonly zone: string; // 分服启用，1中文服 2日服 3美服
}
//////////////////// shops.goods_package ////////////////////
interface Sheet_Shops_GoodsPackage {
    readonly id: number;
    readonly good_id: number; // 商品ID
    readonly good_count: number; // 商品数量
}
//////////////////// shops.interval_refresh_goods ////////////////////
interface Sheet_Shops_IntervalRefreshGoods {
    readonly group_id: number;
    readonly goods_id: number;
    readonly interval: number;
    readonly interval_type: number;
}
//////////////////// shops.item_package ////////////////////
interface Sheet_Shops_ItemPackage {
    readonly id: number;
    readonly item_info: string; // 包含道具
}
//////////////////// shops.selected_package ////////////////////
interface Sheet_Shops_SelectedPackage {
    readonly id: number; // 自选服饰商品id
    readonly goods_id: number; // 可选商品id
    readonly price: string; // 价格
}
//////////////////// shops ////////////////////
interface Table_Shops {
    readonly zhp_goods: IUniqueSheet<Sheet_Shops_ZhpGoods>;
    readonly zhp_refresh_group: IUniqueSheet<Sheet_Shops_ZhpRefreshGroup>;
    readonly zhp_refresh_price: IUniqueSheet<Sheet_Shops_ZhpRefreshPrice>;
    readonly goods: IUniqueSheet<Sheet_Shops_Goods>;
    readonly goods_package: IGroupSheet<Sheet_Shops_GoodsPackage>;
    readonly interval_refresh_goods: IGroupSheet<Sheet_Shops_IntervalRefreshGoods>;
    readonly item_package: IUniqueSheet<Sheet_Shops_ItemPackage>;
    readonly selected_package: IGroupSheet<Sheet_Shops_SelectedPackage>;
}
//////////////////// simulation.sim_v2_info ////////////////////
interface Sheet_Simulation_SimV2Info {
    readonly activity_id: number; // 绑定activity表的活动
    readonly player_chara_id: number; // 玩家控制角色一姬（200001）
    readonly event_group_id: number; // 本次雀斗大会使用的事件组
    readonly train_result_fail: number; // 养成数值变动-失败
    readonly train_result_normal: number; // 养成数值变动-成功
    readonly train_result_great: number; // 养成数值变动-大成功
    readonly train_cap: number; // 五维数值的封顶上限
    readonly find_ting_adj: number; // 发现听牌后放铳调整
    readonly shunweima_2: number; // 2位马点
    readonly shunweima_3: number; // 3位马点
    readonly shunweima_4: number; // 4位马点
    readonly match_event_cd: number; // 对局事件的余牌cd
    readonly show_arrow_buff: string; // 显示箭头的buff
    readonly add_sub_buff: string; // 描述内{0}正数需要加+的buff
    readonly attribute_add_buff: string; // 描述内{0}填特性名，{1}填加成值，{1}正数需要加+
    readonly arrow_amount_12001: number; // 单加减号值_自摸和牌
    readonly arrow_amount_12002: number; // 单加减号值_放铳概率
    readonly arrow_amount_12004: number; // 单加减号值_副露倾向
    readonly arrow_amount_12005: number; // 单加减号值_向听推进速度
    readonly arrow_amount_12014: number; // 单加减号值_对手向听推进速度
}
//////////////////// simulation.sim_v2_round ////////////////////
interface Sheet_Simulation_SimV2Round {
    readonly activity_id: number; // 绑定activity表的活动
    readonly round_id: number; // 回合数（1-50）
    readonly round_type: number; // 1=养成 2=比赛
}
//////////////////// simulation.sim_v2_character ////////////////////
interface Sheet_Simulation_SimV2Character {
    readonly activity_id: number; // 绑定activity表的活动
    readonly id: number; // 角色id
    readonly luk: number; // 运气
    readonly tec: number; // 技术
    readonly ins: number; // 洞察
    readonly int: number; // 直觉
    readonly res: number; // 智谋
    readonly leaderboard_score: number; // 排行榜分数
    readonly show_round: string; // 出现回合数
}
//////////////////// simulation.sim_v2_roll ////////////////////
interface Sheet_Simulation_SimV2Roll {
    readonly event_group_id: number; // 事件组ID
    readonly name: number; // 事件（注释）
    readonly value: number; // 值
    readonly weight: number; // 权重（万分制）
}
//////////////////// simulation.sim_v2_event ////////////////////
interface Sheet_Simulation_SimV2Event {
    readonly event_group_id: number; // 雀斗大会事件组
    readonly event_id: number; // 单个事件id
    readonly event_title: number; // 事件标题str_event
    readonly event_desc: number; // 事件描述str_event
    readonly type: number; // 触发时点
    readonly cd_round: number; // 冷却回合数
    readonly trigger_rate: number; // 触发概率
    readonly trigger_sort: number; // 触发优先级
    readonly trigger: number[]; // 触发条件id（且）
}
//////////////////// simulation.sim_v2_trigger ////////////////////
interface Sheet_Simulation_SimV2Trigger {
    readonly trigger_id: number; // 触发条件每个一行
    readonly type: number; // 列举所有用到的条件type
    readonly param: string[]; // 参数0
}
//////////////////// simulation.sim_v2_selection ////////////////////
interface Sheet_Simulation_SimV2Selection {
    readonly event_id: number; // 单个事件ID
    readonly selection_id: number; // 选项ID
    readonly selection_desc: number; // 选项内容，str_event
    readonly type: number; // 1固定显示，2持有特性显示，3持有特性消失
    readonly check: string[]; // 检查五维（1或2种）
    readonly args: number[]; // 特性id
}
//////////////////// simulation.sim_v2_effect ////////////////////
interface Sheet_Simulation_SimV2Effect {
    readonly effect_id: number; // 特性ID
    readonly luk: number; // 运气（1-10000）
    readonly tec: number; // 技术
    readonly ins: number; // 洞察
    readonly int: number; // 直觉
    readonly res: number; // 智谋
    readonly effect_title: number; // 特性名str/event
    readonly effect_desc: number; // 特性描述str/event
}
//////////////////// simulation.sim_v2_selection_result ////////////////////
interface Sheet_Simulation_SimV2SelectionResult {
    readonly selection_id: number; // 选项id组，每个结果配置一行
    readonly selection_result_id: number; // 结果id
    readonly selection_result_type: number; // 结果分类1=大成功，2=成功，3=普通
    readonly initial_weight: number; // 这个结果的初始权重
    readonly luk: number; // 五维变动-运气
    readonly tec: number; // 技术
    readonly ins: number; // 洞察
    readonly int: number; // 直觉
    readonly res: number; // 智谋
    readonly effect: number[]; // 此结果会获得的特性id
    readonly buff: number[]; // 如果是对局事件，此结果会获得的对局buff（种类多）
}
//////////////////// simulation.sim_v2_buff ////////////////////
interface Sheet_Simulation_SimV2Buff {
    readonly buff_id: number; // 对局结果，每种1行
    readonly buff_result_desc: number; // buff的结果页显示文本，str_event
    readonly buff_desc: number; // buff的说明文本，str_event
    readonly type: number; // type
    readonly match_effect: number; // 比赛事件的生效时间，0当局1下局
    readonly param: string[]; // 需要引入的其他参数用
}
//////////////////// simulation.sim_v2_upgrade ////////////////////
interface Sheet_Simulation_SimV2Upgrade {
    readonly activity_id: number; // 活动id
    readonly skill_point: number; // 一个升级点对应属性点个数
    readonly limit: number; // 单维属性加点上限
    readonly item_id: number; // 对应道具id
}
//////////////////// simulation.sim_v2_story ////////////////////
interface Sheet_Simulation_SimV2Story {
    readonly activity_id: number; // 绑定activity表的活动
    readonly story_id: number;
    readonly trigger_type: number; // 触发类型
    readonly weight: number; // 触发几率
    readonly str_id: number; // 文字描述
    readonly args: number[];
}
//////////////////// simulation.sim_v2_reward ////////////////////
interface Sheet_Simulation_SimV2Reward {
    readonly activity_id: number; // 绑定activity表的活动
    readonly rank: number; // 排位 1-4
    readonly ability: number; // 能力值加点
    readonly random_effect: number; // 随机获得特性个数
}
//////////////////// simulation ////////////////////
interface Table_Simulation {
    readonly sim_v2_info: IUniqueSheet<Sheet_Simulation_SimV2Info>;
    readonly sim_v2_round: IGroupSheet<Sheet_Simulation_SimV2Round>;
    readonly sim_v2_character: IGroupSheet<Sheet_Simulation_SimV2Character>;
    readonly sim_v2_roll: IGroupSheet<Sheet_Simulation_SimV2Roll>;
    readonly sim_v2_event: IGroupSheet<Sheet_Simulation_SimV2Event>;
    readonly sim_v2_trigger: IUniqueSheet<Sheet_Simulation_SimV2Trigger>;
    readonly sim_v2_selection: IGroupSheet<Sheet_Simulation_SimV2Selection>;
    readonly sim_v2_effect: IUniqueSheet<Sheet_Simulation_SimV2Effect>;
    readonly sim_v2_selection_result: IGroupSheet<Sheet_Simulation_SimV2SelectionResult>;
    readonly sim_v2_buff: IUniqueSheet<Sheet_Simulation_SimV2Buff>;
    readonly sim_v2_upgrade: IUniqueSheet<Sheet_Simulation_SimV2Upgrade>;
    readonly sim_v2_story: IGroupSheet<Sheet_Simulation_SimV2Story>;
    readonly sim_v2_reward: IGroupSheet<Sheet_Simulation_SimV2Reward>;
}
//////////////////// spot.spot ////////////////////
interface Sheet_Spot_Spot {
    readonly id: number; // 角色ID
    readonly unique_id: number; // 剧情id
    readonly type: number; // 剧情类型
    readonly name_chs: string; // 剧情名字
    readonly name_chs_t: string;
    readonly name_jp: string; // 剧情名字JP
    readonly name_en: string; // 剧情名字en
    readonly name_kr: string; // 剧情名字kr
    readonly level_limit: number; // 解锁条件
    readonly is_married: number; // 缔结契约
    readonly lock_tips_chs: string; // 解锁文字
    readonly lock_tips_chs_t: string;
    readonly lock_tips_jp: string; // 解锁文字JP
    readonly lock_tips_en: string; // 解锁文字EN
    readonly lock_tips_kr: string; // 解锁文字kr
    readonly queque: number; // 排序
    readonly content_chs: string; // 文本剧情的内容CH
    readonly content_chs_t: string;
    readonly content_jp: string; // 文本剧情的内容JP
    readonly content_en: string; // 文本剧情的内容En
    readonly content_kr: string; // 文本剧情的内容kr
    readonly content_path: string; // 交互剧情的路径
    readonly jieju: number[]; // 结局奖励id
}
//////////////////// spot.rewards ////////////////////
interface Sheet_Spot_Rewards {
    readonly id: number; // 奖励ID
    readonly type: number; // 结局种类1好 2普通 3坏
    readonly content_chs: string; // 获得条件
    readonly content_chs_t: string;
    readonly content_jp: string;
    readonly content_en: string;
    readonly content_kr: string;
    readonly reward: string; // 奖励物品
}
//////////////////// spot.event ////////////////////
interface Sheet_Spot_Event {
    readonly id: number; // 唯一id
    readonly activity_id: number; // 活动ID
    readonly key_item_id: number; // 解锁道具id
    readonly key_amount: number; // 解限所需数量，0为不限制
    readonly unlock_task_id: number; // 解锁基础任务id
    readonly sort: number; // 排序从小到大
    readonly unlock_time: string; // 交互剧情的解锁时间
    readonly content_path: string; // 交互剧情的路径
    readonly title_chs: string; // 标题
    readonly title_chs_t: string;
    readonly title_jp: string;
    readonly title_en: string;
    readonly title_kr: string;
    readonly subtitle_chs: string; // 副标题
    readonly subtitle_chs_t: string;
    readonly subtitle_jp: string;
    readonly subtitle_en: string;
    readonly subtitle_kr: string;
    readonly content_chs: string; // 简介
    readonly content_chs_t: string;
    readonly content_jp: string;
    readonly content_en: string;
    readonly content_kr: string;
    readonly ending_id: number[]; // 分支1id
    readonly ending_res: string; // 封面图
}
//////////////////// spot.character_spot ////////////////////
interface Sheet_Spot_CharacterSpot {
    readonly id: number;
    readonly sort: number; // 递增 数字大的在后
    readonly name_chs: string; // 名称
    readonly name_chs2: string; // 名称
    readonly name_chs_t: string;
    readonly name_chs_t2: string;
    readonly name_jp: string;
    readonly name_jp2: string;
    readonly name_en: string;
    readonly name_kr: string;
    readonly open: number; // 是否开放
    readonly init_skin: number; // 初始皮肤
    readonly full_fetter_skin: number; // 满羁绊皮肤
    readonly hand: number; // 默认手
    readonly favorite: number; // 喜好
    readonly star_5_material: string; // 5星突破材料 1-8
    readonly star_5_cost: number; // 5星突破铜币消耗
    readonly can_marry: number; // 是否可缔结契约
    readonly exchange_item_id: number; // 重复兑换物品ID
    readonly exchange_item_num: number; // 重复兑换物品数量
    readonly emo: string; // 表情
    readonly sound: number; // 语音库
    readonly sound_volume: number; // 声音音效修正
    readonly sex: number; // 性别,1女，2:男
    readonly desc_stature_chs: string; // 身高
    readonly desc_stature_chs_t: string; // 身高
    readonly desc_stature_jp: string;
    readonly desc_stature_en: string;
    readonly desc_stature_kr: string;
    readonly desc_birth_chs: string; // 生日
    readonly desc_birth_chs_t: string;
    readonly desc_birth_jp: string;
    readonly desc_birth_en: string;
    readonly desc_birth_kr: string;
    readonly desc_age_chs: string; // 年龄
    readonly desc_age_chs_t: string;
    readonly desc_age_jp: string;
    readonly desc_age_en: string;
    readonly desc_age_kr: string;
    readonly desc_bloodtype_chs: string; // 血型
    readonly desc_bloodtype_chs_t: string; // 血型
    readonly desc_bloodtype_jp: string; // 血型
    readonly desc_bloodtype_en: string; // 血型
    readonly desc_bloodtype_kr: string; // 血型
    readonly desc_cv_chs: string; // 声优
    readonly desc_cv_chs_t: string;
    readonly desc_cv_jp: string;
    readonly desc_cv_en: string;
    readonly desc_cv_kr: string;
    readonly desc_hobby_chs: string; // 爱好
    readonly desc_hobby_chs_t: string;
    readonly desc_hobby_jp: string;
    readonly desc_hobby_en: string;
    readonly desc_hobby_kr: string;
    readonly desc_chs: string; // 档案描述
    readonly desc_item_chs: string;
    readonly desc_chs_t: string;
    readonly desc_item_chs_t: string;
    readonly desc_jp: string;
    readonly desc_item_jp: string;
    readonly desc_en: string;
    readonly desc_item_en: string;
    readonly desc_kr: string;
    readonly desc_item_kr: string;
    readonly collaboration: number; // 联动标记，12的生日=年级，其他的不替换
    readonly skin_lib: number[]; // 皮肤库
    readonly ur: number; // UR标记
    readonly ur_ron: number; // 默认自带和牌
    readonly ur_liqi: number; // 默认自带立直
    readonly ur_cutin: string;
    readonly limited: number; // 期间限定雀士标签
    readonly treasure_sp: number; // 抽卡界面固定在左侧
}
//////////////////// spot.skin_spot ////////////////////
interface Sheet_Spot_SkinSpot {
    readonly id: number;
    readonly type: number; // 是不是原皮
    readonly name_chs: string; // 名称
    readonly name_chs_t: string;
    readonly name_jp: string;
    readonly name_en: string;
    readonly name_kr: string;
    readonly desc_chs: string; // 描述
    readonly desc_chs_t: string; // 描述
    readonly desc_jp: string;
    readonly desc_en: string;
    readonly desc_kr: string;
    readonly character_id: number; // 角色id索引
    readonly lock_tips_chs: string; // 未解锁的提示
    readonly lock_tips_chs_t: string;
    readonly lock_tips_jp: string;
    readonly lock_tips_en: string;
    readonly lock_tips_kr: string;
    readonly path: string; // 文件夹路径
    readonly exchange_item_id: number; // 重复兑换物品ID
    readonly exchange_item_num: number; // 重复兑换物品数量
    readonly direction: number; // 立绘朝向1左0右
    readonly no_reverse: number; // 和服不可翻转
    readonly lock_reverse: number; // 全局禁止反转，针对特殊角色
    readonly offset_x: number; // 剧情用偏移
    readonly offset_y: number; // 剧情用偏移
    readonly spot_scale: string; // 剧情用偏移
    readonly effective_time: string; // 生效时间，此服务端时间后才开始展示
    readonly lobby_offset: string; // 大厅偏移数据
    readonly liaoshe_offset: string; // 偏移数据
    readonly shop_offset: string; // 偏移数据
    readonly win_offset: string; // 偏移数据
    readonly gameend_offset: string; // 偏移数据
    readonly starup_offset: string; // 偏移数据
    readonly treasure_offset: string; // 偏移数据
    readonly ck_full_0_offset: string; // 偏移数据
    readonly ck_full_1_offset: string; // 偏移数据
    readonly ck_full_2_offset: string; // 偏移数据
    readonly ck_full_3_offset: string; // 偏移数据
    readonly ck_full_single_offset: string; // 偏移数据
    readonly ck_half_0_offset: string; // 偏移数据
    readonly ck_half_1_offset: string; // 偏移数据
    readonly ck_half_2_offset: string; // 偏移数据
    readonly ck_half_3_offset: string; // 偏移数据
    readonly ck_half_single_offset: string; // 偏移数据
    readonly smallhead_x: number;
    readonly smallhead_y: number;
    readonly smallhead_width: number;
    readonly full_x: number;
    readonly full_y: number;
    readonly full_width: number;
    readonly full_height: number;
    readonly half_x: number;
    readonly half_y: number;
    readonly half_width: number;
    readonly half_height: number;
    readonly spine_type: number;
    readonly spine_width: number;
    readonly spine_height: number;
    readonly pivot_x: number;
    readonly pivot_y: number;
    readonly idle: string;
    readonly greeting: number; // 三项span动画时间
    readonly celebrate: number;
    readonly click: number;
    readonly greeting_init: number;
    readonly click2: number;
    readonly celebrate_idle: number;
    readonly illust_data: string;
}
//////////////////// spot.audio_spot ////////////////////
interface Sheet_Spot_AudioSpot {
    readonly id: number;
    readonly path: string; // 路径
    readonly time_length: number; // 声音长度
    readonly str: string; // 音效名称
    readonly type: number; // 编辑器用的音乐音效，0=se，1=bgm，2=环境音
}
//////////////////// spot ////////////////////
interface Table_Spot {
    readonly spot: IGroupSheet<Sheet_Spot_Spot>;
    readonly rewards: IUniqueSheet<Sheet_Spot_Rewards>;
    readonly event: IUniqueSheet<Sheet_Spot_Event>;
    readonly character_spot: IUniqueSheet<Sheet_Spot_CharacterSpot>;
    readonly skin_spot: IUniqueSheet<Sheet_Spot_SkinSpot>;
    readonly audio_spot: IUniqueSheet<Sheet_Spot_AudioSpot>;
}
//////////////////// str.str ////////////////////
interface Sheet_Str_Str {
    readonly id: number;
    readonly type: string;
    readonly chs: string;
    readonly chs_t: string;
    readonly jp: string;
    readonly en: string;
    readonly kr: string;
}
//////////////////// str.event ////////////////////
interface Sheet_Str_Event {
    readonly id: number;
    readonly type: string;
    readonly chs: string;
    readonly chs_t: string;
    readonly jp: string;
    readonly en: string;
    readonly kr: string;
}
//////////////////// str ////////////////////
interface Table_Str {
    readonly str: IUniqueSheet<Sheet_Str_Str>;
    readonly event: IUniqueSheet<Sheet_Str_Event>;
}
//////////////////// tournament.tournaments ////////////////////
interface Sheet_Tournament_Tournaments {
    readonly id: number;
    readonly name: string; // 比赛名称
    readonly game_ticket_id: number; // 参与比赛门票Id
}
//////////////////// tournament ////////////////////
interface Table_Tournament {
    readonly tournaments: IUniqueSheet<Sheet_Tournament_Tournaments>;
}
//////////////////// tutorial.init ////////////////////
interface Sheet_Tutorial_Init {
    readonly episode_id: number; // 1-4章
    readonly dora: string; // 宝牌指示牌
    readonly rival: string; // 四家的头像(东-南-西-北)
    readonly init_score: string; // 四家的初始点数
    readonly paihe: string; // 四家牌河，格式：1m,2m,.....3m;1m,2m,.....3m;1m,2m,.....3m;1m,2m,.....3m
    readonly chang: number; // 场（0-1）
    readonly ju: number; // 局（0-3）
    readonly benchang: number; // 0本场，可以写死0
    readonly first_position: number; // 第一回合谁开始打，默认0东家
    readonly view_position: number; // 本局主视角的方位
    readonly start_shoupai: string; // 主视角的初始配牌
    readonly start_ming: string; // 初始鸣牌（如果有的话）
    readonly end_shoupai: string; // 主视角的和牌型
    readonly end_ming: string; // 和牌时显示
    readonly end_yaku: string; // 和牌后的报菜名
    readonly ura_dora: string; // 里宝牌指示牌（如果有）
    readonly end_fu: number; // 符数
    readonly hu_score: number; // 和牌点数
    readonly flow_score: string; // 收取下家-对家-上家点数
}
//////////////////// tutorial.step ////////////////////
interface Sheet_Tutorial_Step {
    readonly episode_id: number; // 章节1234
    readonly id: number; // 唯一步骤id
    readonly seat: number; // 0123=东一局的东南西北
    readonly act_type: number; // 0=摸牌，1=打牌，2=吃牌 3=碰牌，4=暗杠，7=立直 8=自摸，9=荣和， 999= 无action，1000=结束文本
    readonly act_param: string; // 行动的额外参数
    readonly tingpai_param: string; // 听的牌，逗号分隔
    readonly is_zhenting: number; // 1=振听，空/0=没振
    readonly str_type: number; // 0=底部文本，1=顶部文本
    readonly str_id: number; // 教学文本，可能连续播放
    readonly view_ui_hand: number; // 1=UI手牌高亮
    readonly pic_path: string; // 教学图路径，可能为空
    readonly button_show: string; // 哪些吃碰按钮会出现，2=吃，3=碰，7=立直，8=自摸和，9 = 荣和，4=暗杠，5=明杠，6=加杠
    readonly button_pai: string; // 点了按钮后，手牌中哪些牌被移除例5m,6m
    readonly player_act: number; // 玩家行为，0=无行为，1=选按钮, 2=选牌,3=选红色标记，4=选余牌，5=选自风指示，6=选宝牌指示区域

    readonly player_param: string; // 参数
}
//////////////////// tutorial ////////////////////
interface Table_Tutorial {
    readonly init: IUniqueSheet<Sheet_Tutorial_Init>;
    readonly step: IGroupSheet<Sheet_Tutorial_Step>;
}
//////////////////// vip.vip ////////////////////
interface Sheet_Vip_Vip {
    readonly id: number;
    readonly name_chs: string; // 称号名称
    readonly name_chs_t: string;
    readonly name_jp: string;
    readonly name_en: string;
    readonly name_kr: string;
    readonly img: string; // 称号图标
    readonly desc_chs: string; // 等级描述
    readonly desc_chs_t: string;
    readonly desc_jp: string;
    readonly desc_en: string;
    readonly desc_kr: string;
    readonly charge: number; // 所需累计充值金额
    readonly gift_limit: number; // 每日送礼次数上限
    readonly friend_added: number; // 增加好友上限
    readonly shop_free_refresh: number; // 商店每日免费刷新次数
    readonly shop_refresh_limit: number; // 商店每日刷新次数上限
    readonly buddy_bonus: number; // 对局好感度加成
    readonly favourite_limit: number; // 牌谱收藏上限
    readonly title_id: number; // 称号ID
    readonly rewards: string[]; // VIP领取奖励
}
//////////////////// vip ////////////////////
interface Table_Vip {
    readonly vip: IUniqueSheet<Sheet_Vip_Vip>;
}
//////////////////// voice.sound ////////////////////
interface Sheet_Voice_Sound {
    readonly id: number;
    readonly name_chs: string; // 名称
    readonly name_chs_t: string;
    readonly name_jp: string;
    readonly name_en: string;
    readonly name_kr: string;
    readonly words_chs: string; // 台词
    readonly words_chs_t: string;
    readonly words_jp: string;
    readonly words_en: string;
    readonly words_kr: string;
    readonly category: number; // 1.lobby,2.mj
    readonly type: string; // 类型
    readonly level_limit: number; // 羁绊等级限制
    readonly bond_limit: number; // 契约限制 0无限制1限制
    readonly time_length: number; // 音效长度
    readonly path: string; // 语音路径
    readonly hide: number; // 不在语音列表内显示
    readonly date_limit: string; // 限定展示日期
}
//////////////////// voice.event ////////////////////
interface Sheet_Voice_Event {
    readonly id: number;
    readonly words_chs: string; // 台词
    readonly words_chs_t: string;
    readonly words_jp: string;
    readonly words_en: string;
    readonly words_kr: string;
    readonly category: number; // 1.lobby,2.mj
    readonly type: string; // 类型/玩家操作
    readonly stage: number; // 好感度阶段
    readonly time_length: number; // 音效长度
    readonly path: string; // 语音路径
    readonly volume_fix: number; // 声音音效修正
}
//////////////////// voice.spot ////////////////////
interface Sheet_Voice_Spot {
    readonly id: number;
    readonly character: number;
    readonly type: number; // 语音种类14种，定义见右侧
    readonly path: string; // 语音路径
    readonly type_desc: string; // 编辑器内名称
}
//////////////////// voice ////////////////////
interface Table_Voice {
    readonly sound: IGroupSheet<Sheet_Voice_Sound>;
    readonly event: IGroupSheet<Sheet_Voice_Event>;
    readonly spot: IUniqueSheet<Sheet_Voice_Spot>;
}




interface SheetField {
    field_name: string;
    array_length: number;
    pb_type: string;
}

interface SheetMeta {
    category: 'unique' | 'nokey' | 'group' | 'kv'; // 四种类型：唯一、无键、分组、KV对
    key: string;
}

interface SheetRawData {
    table: string; // excel 名字
    sheet: string; // sheet 名字
    meta: SheetMeta; // sheet meta 信息
    header: SheetField[]; // sheet 结构信息
    rows: any[]; // sheet 行数据
}

