import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIItemDetailMsg, IItemOpenJumpInfo, UIItemDetailView } from "../../view/uis/UIItemDetailView";

export class UIItemDetailMediator extends MediatorBase<UIItemDetailView, IUIItemDetailData> {
	private _info: IItemOpenJumpInfo & { reset(): void; } = {
		open: 0,
		go: 0,
		goTitle: "",
		goDesc: "",
		goBtn: false,
		reset() {
			this.open = 0;
			this.go = 0;
			this.goTitle = "";
			this.goDesc = "";
			this.goBtn = false;
		}
	};

	override onAwake() {
		this.addEvent(EUIItemDetailMsg.OnBtnOpen1Click, this.onBtnOpen1Click);
		this.addEvent(EUIItemDetailMsg.OnBtnOpen10Click, this.onBtnOpen10Click);
		this.addEvent(EUIItemDetailMsg.OnBtnGoToClick, this.onBtnGoToClick);
	}

	override onEnable() {
		this._info = this.getItemOpenJumpInfo();
		this.view.refresh(this.data.id, this._info);
	}

	private onBtnOpen1Click() {

	}

	private onBtnOpen10Click() {

	}

	private onBtnGoToClick() {

	}

	private getItemOpenJumpInfo() {
		const { id, from } = this.data;
		const info = this._info;

		const cfgItem = $cfgMgr.item_definition.item[id];
		if (from && cfgItem) {
			const haveOpen = from == 1 && cfgItem.category == EItemCategory.Item && (cfgItem.type == EItemNormalType.SelectReward || cfgItem.type == EItemNormalType.RandomReward);
			info.open = !haveOpen ? 0 : (cfgItem.type == EItemNormalType.RandomReward && $user.bag.getItemCount(id) >= 10 ? 2 : 1);


		}
		return info;
	}
}