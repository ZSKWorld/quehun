import RenderVisitVoiceInfo from "../../../../ui/PkgMain/RenderVisitVoiceInfo";

export class RenderVisitVoiceInfoView extends ExtendClass<IView, RenderVisitVoiceInfo>(RenderVisitVoiceInfo) implements IView {
	get playing() { return this.ctrl_playing.selectedIndex === 1; }
	set playing(v) { this.ctrl_playing.selectedIndex = v ? 1 : 0; }

	onBtnPlayClick(caller: any, listener: Function, args?: any[]) {
		this.btn_play.onClick(caller, listener, args);
	}

	refresh(charId: number, data: ISheetData_Voice_Sound, playing: boolean) {
		const { ctrl_type, txt_name, txt_lock } = this;
		this.playing = playing;
		txt_name.text = data.langField(ECfgLangField.name);
		const charInfo = $user.character.getCharInfo(charId);

		const isUnlock = data.bond_limit > 0 && charInfo.is_upgraded || (charInfo.level >= data.level_limit && data.bond_limit <= 0);
		ctrl_type.selectedIndex = isUnlock ? 1 : 0;
		if (!isUnlock) {
			txt_lock.langText(data.bond_limit <= 0 ? 2192 : 3067, data.level_limit);
		}
	}
}
