import ComMatchItem from "../../../../ui/PkgMain/ComMatchItem";

export class ComMatchItemView extends ComMatchItem {

	override onCreate() {
		this.y = -220;
		this.btn_info.onClick(this, this.onBtnInfoClick);
	}

	onItemClick(thisObj: any, listener: Function, args?: any[]) {
		this.btn_bg.offAll(Laya.Event.CLICK);
		this.btn_bg.onClick(thisObj, listener, args);
	}

	refresh(data: IComMatchModeData) {
		this.data = data;
		const { ctrl_type, btn_bg, loader_icon, img_delete, img_rest, txt_name, txt_time, img_unmet1, img_unmet2 } = this;
		ctrl_type.selectedIndex = data.type;
		$dynamicResMgr.setLoader(loader_icon, data.icon);
		txt_time.visible = data.refreshTime > 0;
		if (data.refreshTime > 0) {
			txt_time.text = $lang(2674, $timeUtil.timeFormat4(data.refreshTime, false));
		}
		txt_name.text = data.desc;
		img_delete.visible = data.delete;
		img_rest.visible = !data.open;

		btn_bg.enabled = data.open;
		loader_icon.grayed = !data.open;
		img_delete.grayed = !data.open;

		img_unmet1.visible = !!data.unmet;
		img_unmet2.visible = !!data.unmet;
	}

	protected override onEnable() {
		if (this.data)
			$dynamicResMgr.setLoader(this.loader_icon, this.data.icon);
	}

	protected override onDisable() {
		$dynamicResMgr.clearLoader(this.loader_icon);
	}

	private onBtnInfoClick() {
		const data = this.data as IComMatchModeData;
		this.openView(EViewID.UIInfoView, $lang(data.infoLangId));
	}
}
