declare namespace DO {
	interface IRecordDO {
		/** 最大可收藏数量 */
		get maxCollect(): number;
		/** 收藏牌谱列表简要 */
		get collectList(): ProtoObject<IRecordCollectedData>[];

		/**
		 * 加载牌谱列表
		 * @param type 总览（全部）=0/段位=1/友人=2/活动=3/赛事=4/收藏=5
		 */
		loadRecord(type: 0 | 1 | 2 | 3 | 4 | 5): void;
		/** 获取牌谱详情数据 */
		getRecordDetail(uuid: string): IRecordListEntry;
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