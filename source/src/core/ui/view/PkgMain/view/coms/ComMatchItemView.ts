import ComMatchItem from "../../../../ui/PkgMain/ComMatchItem";

export class ComMatchItemView extends ComMatchItem {

	override onCreate() {
		const { btn_bg, btn_info } = this;
		// btn_bg.onClick(this, this.event, [EComMatchItemMsg.OnBtnBgClick]);
		btn_info.onClick(this, this.onBtnInfoClick);
		this.y = -220;
	}

	onItemClick(thisObj: any, listener: Function, args?: any[]) {
		this.btn_bg.onClick(thisObj, listener, args);
	}

	refresh(data: IComMatchModeData) {
		this.data = data;
		const { ctrl_type, btn_bg, loader_icon, btn_info, img_delete, img_rest, txt_name, txt_time } = this;
		ctrl_type.selectedIndex = data.type;
		$dynamicResMgr.setLoader(loader_icon, data.icon);
		txt_time.visible = data.refreshTime > 0;
		if (data.refreshTime > 0) {

		}
		txt_name.langText(data.descLangId);
		img_delete.visible = data.delete;
		img_rest.visible = !data.open;

		btn_bg.enabled = data.open;
		loader_icon.enabled = data.open;
		btn_info.enabled = data.open;
		img_delete.enabled = data.open;
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
		$confirmMid(1, $lang(data.infoLangId));
	}
}
