import { BaseDO } from "./BaseDO";

const HadSyncKey = Symbol("HadSyncKey");
function settingProxy<T extends object>(target: T, caller: any, listener: Function): T {
	if (target != null && typeof target === "object" && !target[HadSyncKey]) {
		target[HadSyncKey] = true;
		Object.keys(target).forEach(key => target[key] = settingProxy(target[key], caller, listener));
		const result = new Proxy(target, {
			set(target: any, p: string, value: any, receiver: any) {
				const typeStr = typeof value;
				if (typeStr != "number" && typeStr != "string" && typeStr != "boolean") {
					Logger.error("设置数据只能是number,string,boolean:", p, value);
					return false;
				}
				if (target[p] == value) return;
				target[p] = value;
				listener.call(caller);
				return true;
			},
		});
		return result;
	} else
		return target;
}

export class SettingDO extends BaseDO implements DO.ISettingDO {
	private _audio: DO.IAudioSetting;
	private _graphic: DO.IGraphicSetting;
	private _prefer: DO.IPreferSetting;
	private _lang: DO.ILangSetting;
	private _other: DO.IOtherSetting;
	private _audioChanged: boolean = false;
	private _graphicChanged: boolean = false;
	private _preferChanged: boolean = false;
	private _langChanged: boolean = false;
	private _otherChanged: boolean = false;
	get audio() { return this._audio; }
	get graphic() { return this._graphic; }
	get prefer() { return this._prefer; }
	get lang() { return this._lang; }
	get other() { return this._other; }

	@InjectGlobalEvent(EGlobalEvent.OnInitGameCompleted)
	private onInitGameCompleted() {
		this._audio = $localDataMgr.getObj(ELocalDataKey.AudioSetting, this.getAudioDefaultSetting());
		this._graphic = $localDataMgr.getObj(ELocalDataKey.GraphicSetting, this.getGraphicDefaultSetting());
		this._prefer = $localDataMgr.getObj(ELocalDataKey.PreferSetting, this.getPreferDefaultSetting());
		this._lang = $localDataMgr.getObj(ELocalDataKey.LangSetting, this.getLangDefaultSetting());
		this._other = $localDataMgr.getObj(ELocalDataKey.OtherSetting, this.getOtherDefaultSetting());
		this.processAfterInitData();
	}

	resetDefaultSetting() {
		$localDataMgr.remove(ELocalDataKey.AudioSetting);
		$localDataMgr.remove(ELocalDataKey.GraphicSetting);
		$localDataMgr.remove(ELocalDataKey.PreferSetting);
		$localDataMgr.remove(ELocalDataKey.LangSetting);
		$localDataMgr.remove(ELocalDataKey.OtherSetting);
		this._audio = this.getAudioDefaultSetting();
		this._graphic = this.getGraphicDefaultSetting();
		this._prefer = this.getPreferDefaultSetting();
		this._lang = this.getLangDefaultSetting();
		this._other = this.getOtherDefaultSetting();
		this.processAfterInitData();
	}

	private getAudioDefaultSetting() {
		const setting: DO.IAudioSetting = {
			globalVolume: { on: true, value: 1 },
			bgmVolume: { on: true, value: 0.5 },
			seVolume: { on: true, value: 0.5 },
			liqiVolume: { on: true, value: 0.5 },
			charVolume: { on: true, value: 0.5 },
			charVolumeMap: {},
			specialVolume: true,
			lobbyBgm: { mode: 0, bgmMap: {} },
			mjBgm: { mode: 0, bgmMap: {} },
			backgroundMute: false
		};
		return setting;
	}
	private getGraphicDefaultSetting() {
		const setting: DO.IGraphicSetting = { fps: 60, activityEffect: true };
		return setting;
	}
	private getPreferDefaultSetting() {
		const setting: DO.IPreferSetting = { dealCardMode: 0, doubleClickPass: false, rightClickPass: false };
		return setting;
	}
	private getLangDefaultSetting() {
		const setting: DO.ILangSetting = { language: ELanguage.CHS };
		return setting;
	}
	private getOtherDefaultSetting() {
		const setting: DO.IOtherSetting = {
			streamerOn: false,
			foreignNickname: true,
			localNickname: true,
			replayNickname: true,
			observeNickname: true,
			matchNickname: true,
			rankNickname: true
		};
		return setting;
	}
	private processAfterInitData() {
		const audio = this._audio;
		$cfgMgr.item_definition.character.forEach(v => {
			if (!audio.charVolumeMap[v.id])
				audio.charVolumeMap[v.id] = { on: true, value: 0.5 };
		});
		$cfgMgr.audio.bgm.forEach(v => {
			if (v.type == EBgmType.Lobby && audio.lobbyBgm.bgmMap[v.id] == null)
				audio.lobbyBgm.bgmMap[v.id] = true;
			else if (v.type == EBgmType.Mj && audio.mjBgm.bgmMap[v.id] == null)
				audio.mjBgm.bgmMap[v.id] = true;
		});

		this._audio = settingProxy(this._audio, this, () => this._audioChanged = true);
		this._graphic = settingProxy(this._graphic, this, () => this._graphicChanged = true);
		this._prefer = settingProxy(this._prefer, this, () => this._preferChanged = true);
		this._lang = settingProxy(this._lang, this, () => this._langChanged = true);
		this._other = settingProxy(this._other, this, () => this._otherChanged = true);

		Laya.timer.loop(500, this, this.checkSaveSetting);
	}

	private checkSaveSetting() {
		if (this._audioChanged) {
			this._audioChanged = false;
			$localDataMgr.setObj(ELocalDataKey.AudioSetting, this._audio);
		}
		if (this._graphicChanged) {
			this._graphicChanged = false;
			$localDataMgr.setObj(ELocalDataKey.GraphicSetting, this._graphic);
		}
		if (this._preferChanged) {
			this._preferChanged = false;
			$localDataMgr.setObj(ELocalDataKey.PreferSetting, this._prefer);
		}
		if (this._langChanged) {
			this._langChanged = false;
			$localDataMgr.setObj(ELocalDataKey.LangSetting, this._lang);
		}
		if (this._otherChanged) {
			this._otherChanged = false;
			$localDataMgr.setObj(ELocalDataKey.OtherSetting, this._other);
		}
	}
}