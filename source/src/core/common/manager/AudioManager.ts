import { Observer } from "../../mvc/provider/Observer";

let AudioID = 1;

@Singleton
export class AudioManager extends Observer implements IAudioManager {
	private _audioPathMap: Record<number, string> = {};
	private _charVoiceInfo: Record<string, string> = {};

	private _audioMap: Record<number, Laya.SoundChannel> = {};
	getAudioPath(id: number) {
		if (this._audioPathMap[id])
			return this._audioPathMap[id];

		const cfgAudio = $cfgMgr?.audio?.audio[id];
		if (!cfgAudio) return "";
		const result = `res/${ cfgAudio.path }.mp3`;
		this._audioPathMap[id] = result;
		return result;
	}

	getCharVoiceInfo(id: number, type: EVoiceType) {
		const { month, date } = $timeUtil;
		const key = `${ id }_${ type }_${ month }_${ date }`;
		if (this._charVoiceInfo[key])
			return this._charVoiceInfo[key];
		const cfgChar = $cfgMgr?.item_definition?.character[id];
		if (!cfgChar) return null;
		const cfgVoice = $cfgMgr?.voice?.sound[cfgChar.sound];
		if (!cfgVoice || cfgVoice.length == 0) return null;
		const charInfo = $user.character.getCharInfo(id);
		if (!charInfo) return null;

		const ss: ISheetData_Voice_Sound[] = [];
		const ssLimit: ISheetData_Voice_Sound[] = [];
		for (let i = 0, n = cfgVoice.length; i < n; i++) {
			const e = cfgVoice[i];
			if (e.type != type && e.type != EVoiceType.lobby_limited) continue;
			const levelLimit = e.level_limit <= charInfo.level;
			const bondLimit = !e.bond_limit || !!charInfo.is_upgraded;
			if (!levelLimit || !bondLimit) continue;
			if (e.date_limit) {
				const dateArr = e.date_limit.split2Num("-");
				if (dateArr[0] != month || dateArr[1] != date) continue;
				if (e.type == type) ss.push(e);
				else ssLimit.push(e);
			} else {
				if (e.type == type)
					ss.push(e);
			}
		}

		const targetSS = type == EVoiceType.lobby_playerlogin && ssLimit.length > 0 ? ssLimit : ss;
		if (!targetSS.length) return null;
		const targetCfgVoice = targetSS.random();
		const result = `res/audio/sound/${ cfgChar.sound_folder }/${ targetCfgVoice.path }.mp3`;
		this._charVoiceInfo[key] = result;
		return result;
	}

	playAudio(id: number): void;
	playAudio(path: string): void;
	playAudio(idOrPath: string | number) {
		let audioPath: string;
		if (typeof idOrPath == "number") {
			audioPath = this.getAudioPath(idOrPath);
		} else
			audioPath = idOrPath;
		return this.playAudioByPath(audioPath, 1);
	}

	playCharVoice(id: number, type: EVoiceType): void;
	playCharVoice(path: string, type: EVoiceType): void;
	playCharVoice(idOrPath: string | number, type: EVoiceType) {
		let voicePath: string;
		if (typeof idOrPath == "number") {
			voicePath = this.getCharVoiceInfo(idOrPath, type);
		} else
			voicePath = idOrPath;
		return this.playAudioByPath(voicePath, 1);
	}

	playBgm(id: number): void;
	playBgm(path: string): void;
	playBgm(idOrPath: string | number) {
		let bgmPath: string;
		if (typeof idOrPath == "number") {
			bgmPath = $itemUtil.getItemInfo(idOrPath).resPath;
		} else
			bgmPath = idOrPath;
		return this.playBgmByPath(bgmPath, 1);
	}

	private playAudioByPath(path: string, volume: number) {
		if (!path) return 0;
		const id = AudioID++;
		const channel = Laya.SoundManager.playSound(path, 1, Laya.Handler.create(this, this.onAudioEnd, [id]));
		channel.volume = volume;
		this._audioMap[id] = channel;
		return id;
	}
	private playBgmByPath(path: string, volume: number) {
		if (!path) return 0;
		const id = AudioID++;
		const channel = Laya.SoundManager.playMusic(path, 0, Laya.Handler.create(this, this.onBgmEnd, [id]));
		channel.volume = volume;
		this._audioMap[id] = channel;
		return id;
	}

	private onAudioEnd(id: number, success: boolean) {
		delete this._audioMap[id];
	}

	private onBgmEnd(id: number, success: boolean) {
		delete this._audioMap[id];
	}
}