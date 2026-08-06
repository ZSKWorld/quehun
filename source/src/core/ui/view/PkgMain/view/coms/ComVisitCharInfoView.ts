import ComVisitCharInfo from "../../../../ui/PkgMain/ComVisitCharInfo";

export const enum EComVisitCharInfoMsg {
	OnBtnSkinClick = "ComVisitCharInfo_OnBtnSkinClick",
}

export class ComVisitCharInfoView extends ExtendClass<IView, ComVisitCharInfo>(ComVisitCharInfo) implements IView {
	private _charId: number = 0;

	override onCreate() {
		const { btn_skin } = this;
		btn_skin.onClick(this, this.sendEvent, [EComVisitCharInfoMsg.OnBtnSkinClick]);
	}

	refresh(charId: number) {
		this._charId = charId;
		const charInfo = $user.character.getCharInfo(charId);
	}
}
