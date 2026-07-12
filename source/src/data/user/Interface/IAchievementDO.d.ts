declare namespace DO {
	interface IAchieveGroupInfo {
		id: number;
		progress: number;
		percentage: boolean;
		haveReward: boolean;
		groupRewardState: ERewardState;
		achieveCount: number;
		achievements: number[];
	}
	interface IAchieveStatisticsInfo {
		gold: number;
		silver: number;
		copper: number;
		total: number;
		groups: IAchieveGroupInfo[];
		groupMap: Record<number, IAchieveGroupInfo>;
		segmentAchieves: Record<number, number[]>;
	}

	interface IAchievementDO {
		get statisticsInfo(): IAchieveStatisticsInfo;
		getProgress(id: number): ProtoObject<IAchievementProgress>;
		getSegmentAchievesAchieved(segmentId: number): boolean;
	}
}