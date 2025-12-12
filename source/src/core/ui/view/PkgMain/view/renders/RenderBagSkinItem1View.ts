import RenderBagSkinItem1 from "../../../../ui/PkgMain/RenderBagSkinItem1";

export const enum ERenderBagSkinItem1Msg {

}

export class RenderBagSkinItem1View extends ExtensionClass<IView, RenderBagSkinItem1>(RenderBagSkinItem1) implements IView {

	override onCreate() {

	}

	refresh(charId: number, own: boolean) {
		const cfgChar = $cfgMgr.item_definition.character[charId];
		const skinId = cfgChar ? cfgChar.init_skin : 0;
		this.com_head.refresh(skinId, own ? 1 : 3);
	}
}
