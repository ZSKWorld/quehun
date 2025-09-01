import { MathUtil } from "../../../../common/math/MathUtil";
import { UserUtil } from "../../../../userData/UserUtil";
import UIMain from "../../../ui/PkgMain/UIMain";

export const enum UIMainMsg {
	OnBtnTrainClick = "UIMain_OnBtnTrainClick",
	OnBtnCharClick = "UIMain_OnBtnCharClick",
	OnBtnGoodsClick = "UIMain_OnBtnGoodsClick",
	OnBtnShopClick = "UIMain_OnBtnShopClick",
	OnBtnAbodeClick = "UIMain_OnBtnAbodeClick",
	OnBtnChatClick = "UIMain_OnBtnChatClick",
	OnBtnSettingClick = "UIMain_OnBtnSettingClick",
	OnBtnRankClick = "UIMain_OnBtnRankClick",
	OnBtnSphereClick = "UIMain_OnBtnSphereClick",
	OnBtnSphereDraged = "OnBtnSphereDraged",
}

export class UIMainView extends ExtensionClass<IView, UIMain>(UIMain) implements IView {

	override onCreate() {
		const { btn_train, btn_char, btn_goods, btn_shop, btn_abode, btn_chat, btn_setting, btn_rank, btn_sphere } = this;
		btn_train.onClick(this, this.sendEvent, [UIMainMsg.OnBtnTrainClick]);
		btn_char.onClick(this, this.sendEvent, [UIMainMsg.OnBtnCharClick]);
		btn_goods.onClick(this, this.sendEvent, [UIMainMsg.OnBtnGoodsClick]);
		btn_shop.onClick(this, this.sendEvent, [UIMainMsg.OnBtnShopClick]);
		btn_abode.onClick(this, this.sendEvent, [UIMainMsg.OnBtnAbodeClick]);
		btn_chat.onClick(this, this.sendEvent, [UIMainMsg.OnBtnChatClick]);
		btn_setting.onClick(this, this.sendEvent, [UIMainMsg.OnBtnSettingClick]);
		btn_rank.onClick(this, this.sendEvent, [UIMainMsg.OnBtnRankClick]);
		btn_sphere.onClick(this, this.sendEvent, [UIMainMsg.OnBtnSphereClick]);
		btn_sphere.on(fgui.Events.DRAG_START, this, this.sendEvent, [UIMainMsg.OnBtnSphereDraged, true]);
		btn_sphere.on(fgui.Events.DRAG_END, this, this.sendEvent, [UIMainMsg.OnBtnSphereDraged, false]);

		btn_sphere.draggable = true;
	}

	refreshPlayerInfo() {
		this.txt_nickname.text = userData.account.nickname;
		const { level, exp, coin, vcoin, sect } = userData.base;

		const nextLevelExp = UserUtil.levelExp(level);
		this.txt_level.text = UserUtil.getLevelStr(level);
		this.txt_exp.text = nextLevelExp == 0 ? "(最高境界)" : (MathUtil.toGroupNumber(exp) + "/" + MathUtil.toGroupNumber(nextLevelExp));
		this.txt_coin.text = "金币:" + MathUtil.toGroupNumber(coin);
		this.txt_ingot.text = "元宝:" + MathUtil.toGroupNumber(vcoin);
		this.txt_sect.text = "门派：" + (cfgMgr.Sect[sect]?.name || "无");
	}

}
