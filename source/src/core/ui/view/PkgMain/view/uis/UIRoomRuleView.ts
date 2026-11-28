import UIRoomRule from "../../../../ui/PkgMain/UIRoomRule";

export class UIRoomRuleView extends UIRoomRule {
	private _tabData: Partial<ISheetData_Desktop_Matchmode & ISheetData_Desktop_FriendRoom>[];
	private _tabIndex = 0;
	private _imgs: string[];
	private _imgIndex: number = 0;

	override onCreate() {
		const { btn_mask, ctrl_type, btn_detail, btn_rule, btn_left, btn_right, btn_close, list_points, list_tab } = this;
		btn_mask.onClick(this, this.closeSelf);
		btn_close.onClick(this, this.closeSelf);
		btn_detail.onClick(this, () => { ctrl_type.selectedIndex = 0; });
		btn_rule.onClick(this, () => { ctrl_type.selectedIndex = 1; });
		btn_left.onClick(this, this.refreshDetailImage, [-1]);
		btn_right.onClick(this, this.refreshDetailImage, [1]);

		$uiUtil.initList<fgui.GButton>(
			list_tab, false, this,
			(index, item) => {
				const data = this._tabData[index];
				if (data.str_name) item.langText(+data.str_name);
				else item.text = data.langField(ECfgLangField.room_name);
			},
			(item, e, index) => {
				if (this._tabIndex != index) this.onListTabClick(index);
			}
		);

		$uiUtil.initList<fgui.GButton>(
			list_points, false, this, null,
			(item, e, index) => {
				this._imgIndex = index;
				this.refreshDetailImage();
			}
		);
	}

	refresh(targetId: number, modeIds: number[]) {
		if (modeIds) this._tabData = modeIds.map(v => $cfgMgr.desktop.matchmode[v]);
		else this._tabData = $user.friend.room.getOpenModes;

		this.ctrl_type.selectedIndex = 0;

		let index = this._tabData.findIndex(v => v.id == targetId);
		index = index == -1 ? 0 : index;

		this.list_tab.numItems = this._tabData.length;
		this.list_tab.selectedIndex = index;
		this.onListTabClick(index);
	}

	private onListTabClick(index: number) {
		this._tabIndex = index;
		this._imgIndex = 0;
		this.label_ruleTxt.langText(+this._tabData[index].str_rule);
		this._imgs = this._tabData[index].rule_images.filter(v => !!v);
		this.list_points.numItems = this._imgs.length;
		this.refreshDetailImage();
	}

	private refreshDetailImage(step: number = 0) {
		this._imgIndex += step;
		this.list_points.selectedIndex = this._imgIndex;
		this.btn_left.visible = this._imgIndex > 0;
		this.btn_right.visible = this._imgIndex < this._imgs.length - 1;
		this.list_points.visible = this._imgs.length > 1;
		$dynamicResMgr.setLoader(this.loader_detailImg, $langRes(this._imgs[this._imgIndex]));
	}

	protected override onDisable() {
		$dynamicResMgr.clearLoader(this.loader_detailImg);
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
