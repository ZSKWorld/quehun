declare namespace DO {
	interface IVolumeInfo {
		on: boolean;
		value: number;
	}

	interface IBgmInfo {
		/** 0:顺序播放, 1-随机播放 */
		mode: 0 | 1;
		/** 音乐列表 */
		bgmMap: Record<number, boolean>;
	}

	interface IAudioSetting {
		/** 全局音量 */
		globalVolume: IVolumeInfo;
		/** 背景音乐音量 */
		bgmVolume: IVolumeInfo;
		/** 音效音量 */
		seVolume: IVolumeInfo;
		/** 立直音乐音量 */
		liqiVolume: IVolumeInfo;
		/** 角色音量 */
		charVolume: IVolumeInfo;
		/** 角色音量单独设置 */
		charVolumeMap: Record<number, IVolumeInfo>;
		/** 特殊音效 */
		specialVolume: boolean;
		/** 大厅背景音乐 */
		lobbyBgm: IBgmInfo;
		/** 对局背景音乐 */
		mjBgm: IBgmInfo;
		/** 后台静音 */
		backgroundMute: boolean;
	}

	interface IGraphicSetting {
		fps: number;
		/** 是否开启活动特效 */
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

	interface IOtherSetting {
		/** 是否开启主播模式 */
		streamerOn: boolean;
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

	interface ISettingDO {
		get audio(): IAudioSetting;
		get graphic(): IGraphicSetting;
		get prefer(): IPreferSetting;
		get lang(): ILangSetting;
		get other(): IOtherSetting;
		resetDefaultSetting(): void;
	}
}