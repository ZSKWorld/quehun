import UIVisit from "../../../../ui/PkgMain/UIVisit";
import { RenderVisitVoiceInfoView } from "../renders/RenderVisitVoiceInfoView";

export const enum EUIVisitMsg {
}

export class UIVisitView extends UIVisit {
	private _charId: number;
	private _voices: ISheetData_Voice_Sound[];
	private _playingIndex: number = -1;

	override onCreate() {
		const { com_back, ctrl_type, list_voice } = this;
		com_back.onClick(this, this.closeSelf);
		ctrl_type.on(fgui.Events.STATE_CHANGED, this, () => {
			if (ctrl_type.selectedIndex != 1) {
				this.stopVoice();
			}
		});
		$uiUtil.setList(list_voice, true, this, (index, item: RenderVisitVoiceInfoView) => {
			item.refresh(this._charId, this._voices[index], this._playingIndex == index);
			item.onBtnPlayClick(this, this.onListVoicePlayClick, [index]);
		});
	}

	refresh(charId: number) {
		this._charId = charId;
		this.ctrl_type.selectedIndex = 0;
		this.com_intro.refresh(charId);

		const cfgChar = $cfgMgr.item_definition.character[charId];
		this._voices = $cfgMgr.voice.sound[cfgChar.sound].filter(v => v.hide <= 0);
		this.list_voice.numItems = this._voices.length;
	}

	private onListVoicePlayClick(index: number) {
		const playing = this._playingIndex != index;
		this.stopVoice();
		playing && this.playAudio(index);
	}

	private playAudio(index: number) {
		if (index == this._playingIndex)
			return;
		this.stopVoice();
		this._playingIndex = index;
		Laya.timer.once(3000, this, this.stopVoice);
		Logger.error("播放音频", index);
		Laya.timer.callLater(this.list_voice, this.list_voice.refreshVirtualList);
	}

	private stopVoice() {
		if (this._playingIndex < 0)
			return;
		Logger.error("停止音频", this._playingIndex);
		this._playingIndex = -1;
		Laya.timer.callLater(this.list_voice, this.list_voice.refreshVirtualList);
	}

	override onOpenAni() {
		return Promise.all([
			$uiUtil.playTrans(this.trans_show),
			this.com_back.onOpenAni(),
		]);
	}

	override onCloseAni() {
		this.stopVoice();
		return Promise.all([
			$uiUtil.playTrans(this.trans_show, true),
			this.com_back.onCloseAni(),
		]);
	}
}
