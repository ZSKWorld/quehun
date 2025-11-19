import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { ComRankItemView } from "../view/coms/ComRankItemView";
import { ComRankPullUpReleaseView } from "../view/coms/ComRankPullUpReleaseView";
import { EUIRankMsg, UIRankView } from "../view/UIRankView";

export interface IUIRankData {

}

export class UIRankMediator extends MediatorBase<UIRankView, IUIRankData> {
	private _curLevelType: number = -1;

	override onAwake() {
		this.addEvent(EUIRankMsg.OnBtnCloseClick, this.onBtnCloseClick);
		this.addEvent(EUIRankMsg.OnBtnSiMaClick, this.setLevelType, [4]);
		this.addEvent(EUIRankMsg.OnBtnSanMaClick, this.setLevelType, [3]);
		const { list_level } = this.view;
		$uiUtil.setList(list_level, true, this, this.onListLevelRender, this.onListLevelItemClick);
		list_level.on(fgui.Events.PULL_UP_RELEASE, this, this.onListLevelPullUpRelease);
	}

	override onEnable() {
		this.setLevelType(4);
	}

	private onBtnCloseClick() {
		this.closeSelf();
	}

	private setLevelType(type: 3 | 4) {
		if (this._curLevelType == type) return;
		this._curLevelType = type;
		this.view.refreshLevelType(type);
		this.view.refreshList([null, null, null, null, null, null, null, null, null, null, null, null]);
	}

	private onListLevelRender(index: number, item: ComRankItemView) {
		item.refresh();
	}

	private onListLevelItemClick(item: ComRankItemView) {

	}

	private async onListLevelPullUpRelease() {
		const { list_level } = this.view;
		const footer = list_level.scrollPane.footer as ComRankPullUpReleaseView;
		if (!footer.readyToRefresh) return;
		Logger.error("开始刷新");
		footer.refreshStatus(2);
		list_level.scrollPane.lockFooter(footer.sourceHeight);
		$timeUtil.wait(2000)
			.then(() => list_level.scrollPane.lockFooter(0))
			.then(() => $timeUtil.wait(300))
			.then(() => {
				footer.refreshStatus(0);
				Logger.error("刷新完毕");
			});
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this.view); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this.view); }
}