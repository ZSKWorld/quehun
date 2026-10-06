import UIActivityOverview from "../../../../ui/PkgActivityOverview/UIActivityOverview";
import { ActivityOverviewManager } from "../../script/ActivityOverviewManager";
import { RenderOverviewTabView } from "../renders/RenderOverviewTabView";

export const enum EUIActivityOverviewMsg {

}

export class UIActivityOverviewView extends UIActivityOverview {
	private _overviews: IOverviewView[];

	override onCreate() {
		const { btn_mask, btn_back, list_list } = this;
		btn_mask.onClick(this, this.closeSelf);
		btn_back.onClick(this, this.closeSelf);
		$uiUtil.setList(list_list, false, this, this.onListRender, this.onListItemClick);
	}

	override onEnable() {
		$dynamicResMgr.setLoader(this.loader_bg, ResPath.ETexturePath.PNG_Img_4188);
		const activityIds = $user.activity.getOpenedActivityIds();
		this._overviews = activityIds.map(v => ActivityOverviewManager.Inst.getView(v)).filter(v => !!v);
		this.list_list.numItems = this._overviews.length;
		this.list_list.selectedIndex = 0;
		this.setChooseIndex(0);
	}

	private onListRender(index: number, item: RenderOverviewTabView) {
		const data = this._overviews[index];
		item.refresh(data.activityId, data.activityName);
	}

	private onListItemClick(_, __, index: number) {
		this.setChooseIndex(index);
	}

	private setChooseIndex(index: number) {
		this.com_content.removeChildren();
		this.com_content.addChild(this._overviews[index]);
	}

	override onDisable() {
		$dynamicResMgr.clearLoader(this.loader_bg);
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}