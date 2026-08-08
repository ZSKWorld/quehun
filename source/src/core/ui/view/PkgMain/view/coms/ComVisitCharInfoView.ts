import ComVisitCharInfo from "../../../../ui/PkgMain/ComVisitCharInfo";

export class ComVisitCharInfoView extends ExtendClass<IView, ComVisitCharInfo>(ComVisitCharInfo) implements IView {
	private _charId: number = 0;

	override onCreate() {
		const { btn_skin } = this;
		btn_skin.onClick(this, this.onBtnSkinClick);
	}

	refresh(charId: number) {
		this._charId = charId;
		const charInfo = $user.character.getCharInfo(charId);
		this.com_head.refresh(charInfo.skin, 1);

	}

	private onBtnSkinClick() {
		this.openView(EViewID.UIChangeSkinView, { charId: this._charId }, EViewOpenType.Hide);
	}
}
