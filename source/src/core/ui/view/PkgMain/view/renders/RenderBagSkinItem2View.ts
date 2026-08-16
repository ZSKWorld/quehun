import RenderBagSkinItem2 from "../../../../ui/PkgMain/RenderBagSkinItem2";

export const enum ERenderBagSkinItem2Msg {

}

export class RenderBagSkinItem2View extends RenderBagSkinItem2 {

	override onCreate() {

	}

	refresh(skinId: number, own: boolean) {
		this.com_head.refreshBigHead(skinId);
		const cfgSkin = $cfgMgr.item_definition.skin[skinId];
		this.ctrl_lock.selectedIndex = own ? 0 : (cfgSkin.type ? 2 : 1);
		this.ctrl_dynamic.selectedIndex = cfgSkin.spine_type ? 1 : 0;
		if (!own) {
			if ($gameMgr.language == ELanguage.EN)
				this.txt_desc.text = cfgSkin.name_en;
			else
				this.txt_desc.text = cfgSkin.langField(ECfgLangField.lock_tips);
		}
	}
}
