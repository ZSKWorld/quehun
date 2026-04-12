import RenderLiaoSheChar from "../../../../ui/PkgMain/RenderLiaoSheChar";

export class RenderLiaoSheCharView extends ExtensionClass<IView, RenderLiaoSheChar>(RenderLiaoSheChar) implements IView {

	override onCreate() {

	}

	refresh(data: ProtoObject<ICharacter>, using: boolean, selected: boolean) {
		const { charid, skin, is_upgraded } = data;
		const charInfo = $itemUtil.getItemInfo(charid);
		const cfgChar = $cfgMgr.item_definition.character[charid];
		const {
			loader_bg, com_head, loader_border, loader_nameBg, btn_star, img_using, img_redDot, img_new,
			txt_name
		} = this;
		com_head.refreshBigHead(skin);
		loader_bg.icon = `ui://PkgMain/img_${ is_upgraded ? 3245 : 3244 }`;
		loader_border.icon = `ui://PkgMain/img_${ cfgChar.ur ? 3372 : 895 }`;

		if (cfgChar.ur)
			loader_nameBg.icon = `ui://PkgMain/img_${ is_upgraded ? 1739 : 1738 }`;
		else
			loader_nameBg.icon = `ui://PkgMain/img_${ is_upgraded ? 1741 : 1740 }`;

		txt_name.text = charInfo.name.split("").join("\n");
		img_using.visible = using;
		img_new.visible = false;
		img_redDot.visible = false;

		btn_star.offClick(this, this.onBtnStarClick);
		btn_star.onClick(this, this.onBtnStarClick, [charid]);
		const isStarChar = $user.character.isStarChar(charid);
		if (isStarChar)
			btn_star.icon = `ui://PkgMain/img_${ is_upgraded ? 862 : 864 }`;
		else
			btn_star.icon = `ui://PkgMain/img_${ is_upgraded ? 861 : 863 }`;
		this.refreshSelected(selected, charid);
	}

	refreshSelected(selected: boolean, charId: number) {
		const { btn_star, img_selected } = this;
		img_selected.visible = selected;
		btn_star.visible = selected || $user.character.isStarChar(charId);
		btn_star.touchable = selected;
	}

	private onBtnStarClick(charId: number, evt: Laya.Event) {
		evt.stopPropagation();
		$user.character.changeCharStar(charId);
	}
}
