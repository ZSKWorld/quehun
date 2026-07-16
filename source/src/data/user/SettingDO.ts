import { BaseDO } from "./BaseDO";
class VolumeInfo implements DO.IVolumeInfo {
	private _on: boolean;
	private _value: number;
	get on() { return this._on; }
	set on(v) { this._on = v; }
	get value() { return this._value; }
	set value(v) { this._value = v; }

	constructor(data: VolumeInfo) {
		this._on = data._on;
		this._value = data._value;
	}

}

class BgmInfo implements DO.IBgmInfo {
	private _mode: 0 | 1;
	private _list: number[];

	get mode() { return this._mode; }
	set mode(v) { this._mode = v; }
	get list() { return this._list; }

	constructor(data: BgmInfo) {
		this._mode = data._mode;
		this._list = data._list;
	}

	add(id: number) {

	}

	remove(id: number) {

	}

}

class AudioSetting implements DO.IAudioSetting {
	private _globalVolume: DO.IVolumeInfo;
	private _bgmVolume: DO.IVolumeInfo;
	private _seVolume: DO.IVolumeInfo;
	private _liqiVolume: DO.IVolumeInfo;
	private _charVolume: DO.IVolumeInfo;
	private _charVolumeMap: Record<number, DO.IVolumeInfo>;
	private _specialVolume: boolean;
	private _lobbyBgm: DO.IBgmInfo;
	private _mjBgm: DO.IBgmInfo;
	private _backgroundMute: boolean;
	get globalVolume() { return this._globalVolume; }
	get bgmVolume() { return this._bgmVolume; }
	get seVolume() { return this._seVolume; }
	get liqiVolume() { return this._liqiVolume; }
	get charVolume() { return this._charVolume; }
	get charVolumeMap() { return this._charVolumeMap; }
	get specialVolume() { return this._specialVolume; }
	set specialVolume(v) { this._specialVolume = v; }
	get lobbyBgm() { return this._lobbyBgm; }
	get mjBgm() { return this._mjBgm; }
	get backgroundMute() { return this._backgroundMute; }
	set backgroundMute(v) { this._backgroundMute = v; }

	constructor(data: AudioSetting) {
		this._globalVolume = data._globalVolume;
		this._bgmVolume = data._bgmVolume;
		this._seVolume = data._seVolume;
		this._liqiVolume = data._liqiVolume;
		this._charVolume = data._charVolume;
		this._charVolumeMap = data._charVolumeMap;
		this._specialVolume = data._specialVolume;
		this._lobbyBgm = data._lobbyBgm;
		this._mjBgm = data._mjBgm;
		this._backgroundMute = data._backgroundMute;
	}
}

class GraphicSetting implements DO.IGraphicSetting {
	private _fps: number;
	private _activityEffect: boolean;
	get fps() { return this._fps; }
	set fps(v) { this._fps = v; }
	get activityEffect() { return this._activityEffect; };
	set activityEffect(v) { this._activityEffect; }

	constructor(data: GraphicSetting) {
		this._fps = data._fps;
		this._activityEffect = data._activityEffect;
	}

}

class PreferSetting implements DO.IPreferSetting {
	private _dealCardMode: 0 | 1;
	private _doubleClickPass: boolean;
	private _rightClickPass: boolean;
	get dealCardMode() { return this._dealCardMode; }
	set dealCardMode(v) { this._dealCardMode = v; }
	get doubleClickPass() { return this._doubleClickPass; }
	set doubleClickPass(v) { this._doubleClickPass = v; }
	get rightClickPass() { return this._rightClickPass; }
	set rightClickPass(v) { this._rightClickPass = v; }

	constructor(data: PreferSetting) {
		this._dealCardMode = data._dealCardMode;
		this._doubleClickPass = data._doubleClickPass;
		this._rightClickPass = data._rightClickPass;
	}

}

class LangSetting implements DO.ILangSetting {
	private _language: ELanguage;
	get language() { return this._language; }
	set language(v) { this._language = v; }

	constructor(data: LangSetting) {
		this._language = data._language;
	}

}

class OtherSetting implements DO.IOtherSetting {
	private _streamerOn: boolean;
	private _foreignNickname: boolean;
	private _localNickname: boolean;
	private _replayNickname: boolean;
	private _observeNickname: boolean;
	private _matchNickname: boolean;
	private _rankNickname: boolean;
	get streamerOn() { return this._streamerOn; }
	set streamerOn(v) { this._streamerOn = v; }
	get foreignNickname() { return this._foreignNickname; }
	set foreignNickname(v) { this._foreignNickname = v; }
	get localNickname() { return this._localNickname; }
	set localNickname(v) { this._localNickname = v; }
	get replayNickname() { return this._replayNickname; }
	set replayNickname(v) { this._replayNickname = v; }
	get observeNickname() { return this._observeNickname; }
	set observeNickname(v) { this._observeNickname = v; }
	get matchNickname() { return this._matchNickname; }
	set matchNickname(v) { this._matchNickname = v; }
	get rankNickname() { return this._rankNickname; }
	set rankNickname(v) { this._rankNickname = v; }

	constructor(data: OtherSetting) {
		this._streamerOn = data._streamerOn;
		this._foreignNickname = data._foreignNickname;
		this._localNickname = data._localNickname;
		this._replayNickname = data._replayNickname;
		this._observeNickname = data._observeNickname;
		this._matchNickname = data._matchNickname;
		this._rankNickname = data._rankNickname;
	}
}

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
		Laya.timer.once(1000, this, this.doSave);
	}

	private doSave() {
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

			const audio = this._audio;
			$cfgMgr.item_definition.character.forEach(v => {
				if (!audio.charVolumeMap[v.id])
					audio.charVolumeMap[v.id] = { on: true, value: 0.5 };
			});
		} else
			this.resetDefault();
	}

	private resetDefault() {
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
		$cfgMgr.item_definition.character.forEach(v => {
			if (!audio.charVolumeMap[v.id])
				audio.charVolumeMap[v.id] = { on: true, value: 0.5 };
		});
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
			streamerOn: false,
			foreignNickname: true,
			localNickname: true,
			replayNickname: true,
			observeNickname: true,
			matchNickname: true,
			rankNickname: true
		};
	}
}

const HadSyncKey = Symbol("HadSyncKey");
function getProxy<T extends object>(target: T) {
	if (target != null && typeof target === "object" && !target[HadSyncKey]) {
		target[HadSyncKey] = true;
		Object.keys(target).forEach(key => target[key] = getProxy(target[key]));
		const result = new Proxy(target, {
			set(target: any, p: string, value: any, receiver: any) {
				// if (typeof p === "string")
				// 	target[p] = value;
				// else
				// 	target[p] = getProxy(value);
				Logger.error(target, p, value, receiver);
				target[p] = value;
				return true;
			},
			// get(target: T, p: string, receiver: any) {
			//     return target[ p ];
			// }
		});
		return result;
	} else
		return target;
}
$windowImmit("getProxy", getProxy);