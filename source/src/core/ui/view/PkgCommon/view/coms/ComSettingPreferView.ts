import ComSettingPrefer from "../../../../ui/PkgCommon/ComSettingPrefer";

export class ComSettingPreferView extends ExtendClass<IView, ComSettingPrefer>(ComSettingPrefer) implements IView {

	override onCreate() {
		const {
			btn_doubleClickPass, btn_rightClickPass, btn_charShowSet, btn_dynamicSkin, btn_aiLookTip,
			cmb_dealCardMode, cmb_aiLookMode, cmb_clickEffectMode, scrollPane
		} = this;
		btn_doubleClickPass.onClick(this, () => $user.setting.prefer.doubleClickPass = btn_doubleClickPass.selected);
		btn_rightClickPass.onClick(this, () => $user.setting.prefer.rightClickPass = btn_rightClickPass.selected);
		btn_charShowSet.onClick(this, () => { });
		btn_dynamicSkin.onClick(this, () => $user.setting.prefer.dynamicSkin = btn_dynamicSkin.selected);
		btn_aiLookTip.onClick(this, () => { });
		cmb_dealCardMode.on(fgui.Events.STATE_CHANGED, this, () => $user.setting.prefer.dealCardMode = cmb_dealCardMode.selectedIndex as any);
		cmb_aiLookMode.on(fgui.Events.STATE_CHANGED, this, () => $user.setting.prefer.aiLook = cmb_aiLookMode.selectedIndex as any);
		cmb_clickEffectMode.on(fgui.Events.STATE_CHANGED, this, () => $user.setting.prefer.clickEffect = cmb_clickEffectMode.selectedIndex as any);

		scrollPane.owner.on(fgui.Events.SCROLL, this, () => fgui.GRoot.inst.hidePopup());

		cmb_aiLookMode.dropdown._children[0].scaleY = -1;
		cmb_clickEffectMode.dropdown._children[0].scaleY = -1;
		const margin = new fgui.Margin();
		margin.top = 5, margin.bottom = 20;
		cmb_aiLookMode.dropdown._children[1].asList.margin = margin;
		cmb_clickEffectMode.dropdown._children[1].asList.margin = margin;

	}

	override onEnable() {
		const {
			btn_doubleClickPass, btn_rightClickPass, btn_charShowSet, btn_dynamicSkin, btn_aiLookTip,
			cmb_dealCardMode, cmb_aiLookMode, cmb_clickEffectMode, scrollPane
		} = this;

		const { dealCardMode, doubleClickPass, rightClickPass, dynamicSkin, aiLook, clickEffect } = $user.setting.prefer;

		cmb_dealCardMode.selectedIndex = dealCardMode;
		btn_doubleClickPass.selected = doubleClickPass;
		btn_rightClickPass.selected = rightClickPass;
		btn_dynamicSkin.selected = dynamicSkin;
		cmb_aiLookMode.selectedIndex = aiLook;
		cmb_clickEffectMode.selectedIndex = clickEffect;
	}
}
