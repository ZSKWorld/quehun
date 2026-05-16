import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIBuyGoodsType } from "../../Definition";
import { EUIBuyGoodsMsg, UIBuyGoodsView } from "../../view/uis/UIBuyGoodsView";

export class UIBuyGoodsMediator extends MediatorBase<UIBuyGoodsView, IUIBuyGoodsData> {
	private _count: number = 0;

	override onAwake() {
		this.addEvent(EUIBuyGoodsMsg.OnBtnSub10Click, this.changeBuyCount);
		this.addEvent(EUIBuyGoodsMsg.OnBtnSub1Click, this.changeBuyCount);
		this.addEvent(EUIBuyGoodsMsg.OnBtnAdd1Click, this.changeBuyCount);
		this.addEvent(EUIBuyGoodsMsg.OnBtnAdd10Click, this.changeBuyCount);
		this.addEvent(EUIBuyGoodsMsg.OnBtnBuyClick, this.onBtnBuyClick);
	}

	override onEnable() {
		this._count = 1;
		const { data, view } = this;
		view.refresh(data);
		(data.type == EUIBuyGoodsType.Multi1 || data.type == EUIBuyGoodsType.Multi2) && this.changeBuyCount();
	}

	private changeBuyCount(change: number = 0) {
		const { max, currencyId, price } = this.data;
		this._count = $mathUtil.clamp(this._count + change, 1, max ?? 1);
		const ownCount = $user.bag.getItemCount(currencyId);
		this.view.refreshBuyCount(this._count, price, ownCount);
	}

	private onBtnBuyClick() {

	}

}