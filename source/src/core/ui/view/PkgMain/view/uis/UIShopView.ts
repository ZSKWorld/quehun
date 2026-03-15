import UIShop from "../../../../ui/PkgMain/UIShop";
import { EUIShopTabType } from "../../Definition";

export const enum EUIShopMsg {
	OnBtnZhwRefreshClick = "UIShop_OnBtnZhwRefreshClick",
}

export class UIShopView extends ExtensionClass<IView, UIShop>(UIShop) implements IView {

	get tabBtns() { return [this.btn_item0, this.btn_item1, this.btn_item2, this.btn_item3, this.btn_item4, this.btn_item5]; }

	override onCreate() {
		const { com_back, btn_zhwRefresh } = this;
		com_back.onBackClick(this, this.closeSelf);
		btn_zhwRefresh.onClick(this, this.sendEvent, [EUIShopMsg.OnBtnZhwRefreshClick]);
	}
	
	/** 杂货屋 */
	refreshZHW(){
		this.ctrl_c1.selectedIndex = EUIShopTabType.ZHW;
	}
	/** 背景屋 */
	refreshBJW(){
		this.ctrl_c1.selectedIndex = EUIShopTabType.BJW;
	}
	/** 祈愿屋 */
	refreshQYW(){
		this.ctrl_c1.selectedIndex = EUIShopTabType.QYW;
	}
	/** 星之屋 */
	refreshXZW(){
		this.ctrl_c1.selectedIndex = EUIShopTabType.XZW;
	}
	/** 插画屋 */
	refreshCHW(){
		this.ctrl_c1.selectedIndex = EUIShopTabType.CHW;
	}
	/** 福袋屋 */
	refreshFDW(){
		this.ctrl_c1.selectedIndex = EUIShopTabType.FDW;
	}

	override onOpenAni() {
		$uiUtil.playTrans(this.trans_show);
		return this.com_back.onOpenAni();
	}

	override onCloseAni() {
		$uiUtil.playTrans(this.trans_show, true);
		return this.com_back.onCloseAni();
	}
}
