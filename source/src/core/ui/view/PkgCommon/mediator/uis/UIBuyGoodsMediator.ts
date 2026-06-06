import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIBuyGoodsMsg, EUIBuyGoodsType, UIBuyGoodsView } from "../../view/uis/UIBuyGoodsView";

export class UIBuyGoodsMediator extends MediatorBase<UIBuyGoodsView, IUIBuyGoodsData> {
	private _count: number = 0;

	protected override onDataChanged(data: IUIBuyGoodsData, oldData?: IUIBuyGoodsData) {
		if (!data) return;
		data.priceCount = data.priceCount ?? 1;
		data.showOwn = data.showOwn ?? false;

		const max = data.max ?? -1;
		data.max = max <= 0 ? Number.MAX_SAFE_INTEGER : max;
	}

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
		this.changeBuyCount();
	}

	private changeBuyCount(change: number = 0) {
		const { max, currencyId, price, priceCount } = this.data;
		this._count = $mathUtil.clamp(this._count + change, 1, max);
		const ownCount = $user.bag.getItemCount(currencyId);
		this.view.refreshBuyCount(this._count, price, priceCount, ownCount);
	}

	private onBtnBuyClick() {
		this.data.onBuy?.(this._count);
		this.closeSelf();
	}

}