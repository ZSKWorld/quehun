import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIItemDetailMsg, IItemOpenJumpInfo, UIItemDetailView } from "../../view/uis/UIItemDetailView";

export class UIItemDetailMediator extends MediatorBase<UIItemDetailView, IUIItemDetailData> {
	private _info: IItemOpenJumpInfo = {
		open: 0,
		go: 0,
		goTitle: "",
		goDesc: "",
		goBtn: false,
		goViewID: null,
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
		let d_item = $cfgMgr.item_definition.item[this.data.id];
		if (!d_item || d_item.category != EItemCategory.Item) return;
		if (d_item.type == EItemNormalType.SelectReward) {
			if (d_item.func == "selectskin") {
				// UI_OpenSkin.Inst.show(this.item_id);
				Logger.error("open skin");
			} else {
				// UI_OpenBox.Inst.show(this.item_id);
				Logger.error("open box");
			}
		} else if (d_item.type == EItemNormalType.RandomReward) {
			this.openBlessingBag(1);
		}
	}

	private onBtnOpen10Click() {
		const cfgItem = $cfgMgr.item_definition.item[this.data.id];
		if (!cfgItem || cfgItem.category != EItemCategory.Item || cfgItem.type != EItemNormalType.RandomReward) return;
		this.openBlessingBag(10);
	}

	private onBtnGoToClick() {
		Logger.error("go to " + this._info.goViewID);
	}

	private getItemOpenJumpInfo() {
		const { id, from } = this.data;
		const info = this._info;

		info.open = 0;
		info.go = 0;
		info.goTitle = "";
		info.goDesc = "";
		info.goBtn = false;
		info.goViewID = null;

		const cfgItem = $cfgMgr.item_definition.item[id];
		if (!from || !cfgItem) return info;

		const haveOpen = from == 1 && cfgItem.category == EItemCategory.Item && (cfgItem.type == EItemNormalType.SelectReward || cfgItem.type == EItemNormalType.RandomReward);
		info.open = !haveOpen ? 0 : (cfgItem.type == EItemNormalType.RandomReward && $user.bag.getItemCount(id) >= 10 ? 2 : 1);

		const haveGo1 = (from == 2 || from == 3) && !!cfgItem.access;
		const haveGo2 = from == 1 && cfgItem.category == EItemCategory.Common;
		info.go = !(haveGo1 || haveGo2) ? 0 : 1;
		info.goTitle = $lang(haveGo1 ? 3103 : 0);
		info.goDesc = $lang(haveGo1 ? cfgItem.accessinfo : (haveGo2 ? (cfgItem.type == EItemCommonType.BeiJingYinYue ? 3120 : 3065) : 0));

		const wayId = +cfgItem.access;
		const haveGoBtn = haveGo2 || (haveGo1 && (wayId == 11 || (wayId >= 2 && wayId <= 4)));

		info.goBtn = haveGoBtn;
		info.goViewID = haveGo1 ? (wayId == 11 ? EViewID.UIBagView : EViewID.UIShopView) : (haveGo2 ? cfgItem.type == EItemCommonType.BeiJingYinYue ? EViewID.UISettingView : EViewID.UILiaoSheView : null);
		return info;
	}

	private openBlessingBag(count: number) {
		this.closeSelf();
		$netMgr.requests.openRandomRewardItem({
			item_id: this.data.id,
			count,
		}).then(res => {
			if (res.error) return;
			const rewards = res.results.map(v => v.reward);
			this.openView<IUIGetRewardData>(EViewID.UIGetRewardView, { rewards });
		});
	}
}