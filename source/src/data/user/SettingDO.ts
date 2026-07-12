import { BaseDO } from "./BaseDO";

export class SettingDO extends BaseDO implements DO.ISettingDO {
	private _audio: DO.IAudioSetting;
	private _graphic: DO.IGraphicSetting;
	private _prefer: DO.IPreferSetting;
	private _lang: DO.ILangSetting;
	private _other: DO.IOtherSetting;
	get audio() { return this._audio; }
	get graphic() { return this._graphic; }
	get prefer() { return this._prefer; }
	get lang() { return this._lang; }
	get other() { return this._other; }

	save() {
		$localDataMgr.setObj(ELocalDataKey.Setting, this);
	}

	@InjectGlobalEvent(EGlobalEvent.OnInitGameCompleted)
	private onInitGameCompleted() {
		const data = $localDataMgr.getObj<SettingDO>(ELocalDataKey.Setting);
		if (data) {
			this._audio = data._audio;
			this._graphic = data._graphic;
			this._prefer = data._prefer;
			this._lang = data._lang;
			this._other = data._other;
		} else
			this.resetDefaultSetting();

		const audio = this._audio;
		$cfgMgr.item_definition.character.forEach(v => {
			if (!audio.charVolumeMap[v.id])
				audio.charVolumeMap[v.id] = { on: true, value: 0.5 };
		});
	}

	private resetDefaultSetting() {
		this._audio = {
			globalVolume: { on: true, value: 1 },
			bgmVolume: { on: true, value: 0.5 },
			seVolume: { on: true, value: 0.5 },
			liqiVolume: { on: true, value: 0.5 },
			charVolume: { on: true, value: 0.5 },
			charVolumeMap: {},
			specialVolume: true,
			lobbyBgm: { mode: 0, list: [] },
			mjBgm: { mode: 0, list: [] },
			backgroundMute: false
		};
		const audio = this._audio;
		$cfgMgr.audio.bgm.forEach(v => {
			if (v.type == "lobby")
				audio.lobbyBgm.list.push(v.id);
			else if (v.type == "mj")
				audio.mjBgm.list.push(v.id);
		});
		this._graphic = { fps: 60, activityEffect: true };
		this._prefer = { dealCardMode: 0, doubleClickPass: false, rightClickPass: false };
		this._lang = { language: ELanguage.CHS };
		this._other = {
			streamer: {
				on: false,
				foreignNickname: true,
				localNickname: true,
				replayNickname: true,
				observeNickname: true,
				matchNickname: true,
				rankNickname: true
			}
		};
	}
}