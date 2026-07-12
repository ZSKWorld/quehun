declare namespace DO {
	interface IVolumeInfo {
		on: boolean;
		value: number;
	}

	interface IBgmInfo {
		/** 0:顺序播放, 1-随机播放 */
		mode: 0 | 1;
		list: number[];
	}

	interface IAudioSetting {
		globalVolume: IVolumeInfo;
		bgmVolume: IVolumeInfo;
		seVolume: IVolumeInfo;
		liqiVolume: IVolumeInfo;
		charVolume: IVolumeInfo;
		charVolumeMap: Record<number, IVolumeInfo>;
		specialVolume: boolean;

		lobbyBgm: IBgmInfo;
		mjBgm: IBgmInfo;

		backgroundMute: boolean;
	}

	interface IGraphicSetting {
		fps: number;
		activityEffect: boolean;
	}

	interface IPreferSetting {
		/** 出牌模式, 0: 单击出牌, 1: 双击出牌 */
		dealCardMode: 0 | 1;
		/** 双击过牌 */
		doubleClickPass: boolean;
		/** 右键过牌 */
		rightClickPass: boolean;
	}

	interface ILangSetting {
		language: ELanguage;
	}

	interface IStreamerInfo {
		on: boolean;
		/** 跨服昵称 */
		foreignNickname: boolean;
		/** 同服昵称 */
		localNickname: boolean;
		/** 牌谱昵称 */
		replayNickname: boolean;
		/** 观战昵称 */
		observeNickname: boolean;
		/** 赛事昵称 */
		matchNickname: boolean;
		/** 排行昵称 */
		rankNickname: boolean;
	}

	interface IOtherSetting {
		streamer: IStreamerInfo;
	}

	interface ISettingDO {
		get audio(): IAudioSetting;
		get graphic(): IGraphicSetting;
		get prefer(): IPreferSetting;
		get lang(): ILangSetting;
		get other(): IOtherSetting;

		save(): void;
	}
}