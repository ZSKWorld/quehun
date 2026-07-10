import ComAchieveGroup from "../../../../ui/PkgAchievement/ComAchieveGroup";
import { RenderAchieveGroupView } from "../renders/RenderAchieveGroupView";

export const enum EComAchieveGroupMsg {

}

export class ComAchieveGroupView extends ExtendClass<IView, ComAchieveGroup>(ComAchieveGroup) implements IView {
	private _groupViews: RenderAchieveGroupView[] = [];

	override onCreate() {
		const { _groupViews, graph_empty } = this;
		$user.achievement.statisticsInfo.groups.forEach((v, i) => {
			const view = $facade.createView(EViewID.RenderAchieveGroupView) as RenderAchieveGroupView;
			this.addChild(view);
			view.setXY(160 + i * 220, i % 2 == 0 ? 0 : 350);
			_groupViews.push(view);
			view.onClick(this, this.openView, [EViewID.UIAchievementDetailView, i, EViewOpenType.Hide]);
		});
		graph_empty.x = _groupViews.last?.x || 0;
	}

	override onEnable() {
		this.scrollPane.setPosX(0);
	}

	refresh() {
		$user.achievement.statisticsInfo.groups.forEach((v, i) => {
			this._groupViews[i].refresh(v.id, v.progress, v.haveReward);
		});
	}
}
