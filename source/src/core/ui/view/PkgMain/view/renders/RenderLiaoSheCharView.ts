import RenderLiaoSheChar from "../../../../ui/PkgMain/RenderLiaoSheChar";

export class RenderLiaoSheCharView extends ExtensionClass<IView, RenderLiaoSheChar>(RenderLiaoSheChar) implements IView {

	override onCreate() {
		const { btn_star } = this;
		btn_star.onClick(this, this.onBtnStarClick);
	}

	refresh(data: ProtoObject<ICharacter>, using: boolean) {
		const { charid, level, exp, views, skin, is_upgraded } = data;
		const charInfo = $itemUtil.getItemInfo(charid);
		const cfgChar = $cfgMgr.item_definition.character[charid];
		const {
			loader_bg, com_head, loader_border, loader_nameBg, btn_star, img_using, img_redDot, img_new,
			txt_name
		} = this;
		com_head.refreshBigHead(skin);
		loader_bg.icon = is_upgraded ? "ui://PkgMain/img_3245" : "ui://PkgMain/img_3244";
		loader_border.icon = cfgChar.ur ? "ui://PkgMain/img_3372" : "ui://PkgMain/img_895";

		if (cfgChar.ur)
			loader_nameBg.icon = is_upgraded ? "ui://PkgMain/img_1739" : "ui://PkgMain/img_1738";
		else
			loader_nameBg.icon = is_upgraded ? "ui://PkgMain/img_1741" : "ui://PkgMain/img_1740";

		const isStarChar = $userData.character.isStarChar(charid);
		if (isStarChar)
			btn_star.icon = is_upgraded ? "ui://PkgMain/img_862" : "ui://PkgMain/img_864";
		else
			btn_star.icon = is_upgraded ? "ui://PkgMain/img_861" : "ui://PkgMain/img_863";

		txt_name.text = charInfo.name.split("").join("\n");
		img_using.visible = using;
		img_new.visible = false;
		img_redDot.visible = false;
	}

	private onBtnStarClick(e: Laya.Event) {
		e.stopPropagation();
	}
}
