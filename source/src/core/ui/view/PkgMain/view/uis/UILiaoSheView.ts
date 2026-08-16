import UILiaoShe from "../../../../ui/PkgMain/UILiaoShe";
import { EUILiaoSheEvent } from "../../Definition";

export const enum EUILiaoSheMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
}

export class UILiaoSheView extends UILiaoShe {
	private _curCharId = -1;

	override onCreate() {
		const { com_back, btn_dynamic, btn_visit, btn_skin, btn_char, btn_deco, com_character } = this;
		btn_dynamic.mode = fgui.ButtonMode.Check;
		btn_dynamic.onClick(this, () => $user.setting.prefer.dynamicSkin = btn_dynamic.selected);
		com_back.onBackClick(this, this.closeSelf);
		btn_visit.onClick(this, this.onBtnVisitClick);
		btn_skin.onClick(this, this.onBtnSkinClick);
		btn_char.onClick(this, this.refreshContent, [0, true]);
		btn_deco.onClick(this, this.refreshContent, [1, true]);
		com_character.on(EUILiaoSheEvent.OnLiaoSheCharSelected, this, this.onLiaoSheCharSelected);
	}

	refreshContent(type: 0 | 1, anim: boolean) {
		if (anim && this.ctrl_type.selectedIndex == type) return;
		const showChar = type == 0;
		const { ctrl_type, btn_dynamic, btn_char, btn_deco, trans_toChar, trans_toDeco, com_character, com_decorate } = this;
		btn_dynamic.selected = $user.setting.prefer.dynamicSkin;
		btn_char.selected = showChar;
		btn_deco.selected = !showChar;
		btn_char.sortingOrder = +showChar;
		btn_deco.sortingOrder = +!showChar;
		ctrl_type.selectedIndex = type;
		const trans = showChar ? trans_toChar : trans_toDeco;
		trans.play(null, 1, 0, anim ? 0 : trans.totalDuration);
		type == 0 ? com_character.refresh(!anim) : com_decorate.refresh();
	}

	private onLiaoSheCharSelected(charId: number) {
		this._curCharId = charId;
		const cfgChar = $cfgMgr.item_definition.character[charId];
		const { txt_name, txt_cvName } = this;
		txt_name.text = cfgChar.langField(ECfgLangField.name);
		txt_cvName.text = "CV: " + cfgChar.langField(ECfgLangField.desc_cv);
	}

	private onBtnVisitClick() {
		this.openView<IUIVisitData>(EViewID.UIVisitView, { charId: this._curCharId }, EViewOpenType.Hide);
	}

	private onBtnSkinClick() {
		this.openView<IUIChangeSkinData>(EViewID.UIChangeSkinView, { charId: this._curCharId }, EViewOpenType.Hide);
	}

	override onOpenAni() {
		this.com_character.alpha = 0;
		this.com_decorate.alpha = 0;
		return Promise.all([
			$uiUtil.playTrans(this.trans_show),
			this.com_back.onOpenAni(),
		]);
	}

	override onCloseAni() {
		return Promise.all([
			$uiUtil.playTrans(this.trans_close),
			this.com_back.onCloseAni(),
		]);
	}
}
