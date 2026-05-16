import UIBuyGoods from "../../../../ui/PkgCommon/UIBuyGoods";
import { EUIBuyGoodsType } from "../../Definition";

export const enum EUIBuyGoodsMsg {
	OnBtnSub10Click = "UIBuyGoods_OnBtnSub10Click",
	OnBtnSub1Click = "UIBuyGoods_OnBtnSub1Click",
	OnBtnAdd1Click = "UIBuyGoods_OnBtnAdd1Click",
	OnBtnAdd10Click = "UIBuyGoods_OnBtnAdd10Click",
	OnBtnBuyClick = "UIBuyGoods_OnBtnBuyClick",
}

export class UIBuyGoodsView extends ExtensionClass<IView, UIBuyGoods>(UIBuyGoods) implements IView {

	override onCreate() {
		const { btn_mask, btn_close, btn_sub10, btn_sub1, btn_add1, btn_add10, btn_buy } = this;
		btn_mask.onClick(this, this.closeSelf);
		btn_close.onClick(this, this.closeSelf);
		btn_sub10.onClick(this, this.sendEvent, [EUIBuyGoodsMsg.OnBtnSub10Click, -10]);
		btn_sub1.onClick(this, this.sendEvent, [EUIBuyGoodsMsg.OnBtnSub1Click, -1]);
		btn_add1.onClick(this, this.sendEvent, [EUIBuyGoodsMsg.OnBtnAdd1Click, 1]);
		btn_add10.onClick(this, this.sendEvent, [EUIBuyGoodsMsg.OnBtnAdd10Click, 10]);
		btn_buy.onClick(this, this.sendEvent, [EUIBuyGoodsMsg.OnBtnBuyClick]);
	}

	refresh(data: IUIBuyGoodsData) {
		const { id, currencyId, price, type, showOwn, last, title, multiDesc } = data;
		const { ctrl_c1, txt_title, com_item, txt_desc, txt_desc2, txt_own, img_line, txt_multiPrice, txt_multiLast, txt_multiDesc, com_currency, com_cgCurrency, com_multiCurrency } = this;

		ctrl_c1.selectedIndex = type;
		const itemInfo = $itemUtil.getItemInfo(id);
		txt_title.text = title || itemInfo.name;
		com_item.refresh(id);
		txt_own.visible = !!showOwn;
		showOwn && txt_own.langText(2212, $user.bag.getItemCount(id));

		img_line.visible = txt_desc2.visible = !!itemInfo.func;
		if (itemInfo.func) {
			txt_desc.text = itemInfo.func;
			txt_desc2.text = itemInfo.desc;
		} else {
			txt_desc.text = itemInfo.desc;
		}
		txt_multiDesc.text = multiDesc || "";

		type != EUIBuyGoodsType.Cg && com_currency.refreshIcon(currencyId);
		type == EUIBuyGoodsType.Cg && com_cgCurrency.refreshIcon(currencyId);
		type == EUIBuyGoodsType.Multi2 && (txt_multiLast.text = last);
		if (type == EUIBuyGoodsType.Multi1 || type == EUIBuyGoodsType.Multi2) {
			txt_multiPrice.text = price.toString();
			com_multiCurrency.refreshIcon(currencyId);
		}
	}

	refreshBuyCount(count: number, price: number, ownCount: number) {
		const cost = count * price;
		const txtColor = ownCount >= cost ? EColorString._00ff00 : EColorString._ff0000;

		const { rtxt_cgCost, txt_multiCount, txt_cost, btn_buy } = this;
		rtxt_cgCost.text = $richText().color(txtColor, String(ownCount)).color(EColorString._f7b75d, "/" + cost).end();
		txt_multiCount.text = count.toString();
		txt_cost.text = cost.toString();
		txt_cost.color = txtColor;
		btn_buy.grayed = ownCount < cost;
		btn_buy.touchable = ownCount >= cost;
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
