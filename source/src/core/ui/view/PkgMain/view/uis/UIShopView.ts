import { RadioGroup } from "../../../../extention/RadioGroup";
import UIShop from "../../../../ui/PkgMain/UIShop";
import { EUIShopTabType } from "../../Definition";

export const enum EUIShopMsg {
	OnTabSelectChanged = "UIShop_OnTabSelectChanged",
	OnBtnZhwRefreshClick = "UIShop_OnBtnZhwRefreshClick",
}

export class UIShopView extends UIShop {
	private _tabGroup = new RadioGroup();

	get tabIndex() { return this._tabGroup.selectIndex; }

	override onCreate() {
		const {
			com_back, btn_zhwRefresh, btn_tab0, btn_tab1, btn_tab2, btn_tab3,
			btn_tab4, btn_tab5, btn_tab6
		} = this;
		com_back.onBackClick(this, this.closeSelf);
		btn_zhwRefresh.onClick(this, this.event, [EUIShopMsg.OnBtnZhwRefreshClick]);

		this._tabGroup.init([
			btn_tab0, btn_tab1, btn_tab2, btn_tab3,
			btn_tab4, btn_tab5, btn_tab6
		], this, this.onTabChanged, EColorString._d9b263, EColorString._8cb65f);
	}

	refreshTab(type: EUIShopTabType) {
		this._tabGroup.clearSelection();
		this._tabGroup.selectIndex = type;
	}

	/** 服饰屋 */
	refreshFSW() {
		this.ctrl_c1.selectedIndex = EUIShopTabType.FSW;
	}

	/** 杂货屋 */
	refreshZHW() {
		this.ctrl_c1.selectedIndex = EUIShopTabType.ZHW;
	}
	/** 背景屋 */
	refreshBJW() {
		this.ctrl_c1.selectedIndex = EUIShopTabType.BJW;
	}
	/** 祈愿屋 */
	refreshQYW() {
		this.ctrl_c1.selectedIndex = EUIShopTabType.QYW;
	}
	/** 星之屋 */
	refreshXZW() {
		this.ctrl_c1.selectedIndex = EUIShopTabType.XZW;
	}
	/** 插画屋 */
	refreshCHW() {
		this.ctrl_c1.selectedIndex = EUIShopTabType.CHW;
	}
	/** 福袋屋 */
	refreshFDW() {
		this.ctrl_c1.selectedIndex = EUIShopTabType.FDW;
	}

	private onTabChanged(type: EUIShopTabType) {
		this.event(EUIShopMsg.OnTabSelectChanged, type);
	}

	override onOpenAni() {
		$uiUtil.playTrans(this.trans_show);
		return this.com_back.onOpenAni();
	}

	override onCloseAni() {
		$uiUtil.playTrans(this.trans_show, true);
		return this.com_back.onCloseAni();
	}

	override onDisable() {
		const anis = [this.trans_show];
		anis.forEach(v => {
			v.playing && v.stop(true, true);
		});
		this._tabGroup.clearSelection();
	}
}
