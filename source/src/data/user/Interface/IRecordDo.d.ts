declare namespace DO {
	interface IMakaDataD0 {
		uuid: string;
		state: EMakaState;
		/** 过期时间 */
		expire_time: number;
		player_scores: ISeerScore[];
		/** 创建时间 */
		create_time: number;
	}
	interface IMakaDO {
		get remainCount(): number;
		init(): void;
		/** 是否是可maka分析的牌谱 */
		canAnalysis(record: IRecordListEntry): boolean;
		/** 分析牌谱 */
		analysisRecord(uuid: string): void;
		/** 获取牌谱分析数据 */
		getAnalysisData(uuid: string): IMakaDataD0;
	}
	interface IRecordDO {
		/** 最大可收藏数量 */
		get maxCollect(): number;
		/** 收藏牌谱简要列表 */
		get collectBriefs(): ProtoObject<IRecordCollectedData>[];
		get filter(): IReqGameRecordListV2;
		get maka(): IMakaDO;

		/**
		 * 加载牌谱列表
		 * @param type 总览（全部）=0/段位=1/友人=2/活动=3/赛事=4/收藏=5
		 */
		loadRecord(type: ERecordTag): void;
		/** 重置对应牌谱加载器 */
		resetLoader(type: ERecordTag): void;
		/** 获取对应牌谱id数组 */
		getRecordIds(type: ERecordTag): string[];
		/** 获取牌谱详情数据 */
		getRecordDetail(uuid: string): IRecordListEntry;
		/** 是否是收藏牌谱 */
		isCollect(uuid: string): boolean;
		/** 获取收藏牌谱简要 */
		getCollectBrief(uuid: string): ProtoObject<IRecordCollectedData>;
		/** 添加牌谱收藏 */
		addCollect(uuid: string, remarks?: string): void;
		/** 移除牌谱收藏 */
		removeCollect(uuid: string): void;
		/** 修改收藏牌谱备注 */
		changeCollectRemarks(uuid: string, remarks: string): void;
	}
}