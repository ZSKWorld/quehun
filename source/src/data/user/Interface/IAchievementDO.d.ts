declare namespace DO {
	interface IAchieveGroupInfo {
		id: number;
		progress: number;
		haveReward: boolean;
		achievements: number[];
	}
	interface IAchieveStatisticsInfo {
		gold: number;
		silver: number;
		copper: number;
		total: number;
		groups: IAchieveGroupInfo[];
		groupMap: Record<number, IAchieveGroupInfo>;
	}

	interface IAchievementDO {
		get statisticsInfo(): IAchieveStatisticsInfo;
	}
}