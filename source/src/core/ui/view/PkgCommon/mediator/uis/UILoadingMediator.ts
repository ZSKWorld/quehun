import { ENotifyConst } from "../../../../../common/NotifyConst";
import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { UILoadingView } from "../../view/uis/UILoadingView";

export interface IUILoadingData {

}

export class UILoadingMediator extends MediatorBase<UILoadingView, IUILoadingData> {

	override onEnable() {
		this.view.refreshContent();
	}

	override onUpdate() {
		this.view.updateBlockPos();
	}

	@InterestNotify(ENotifyConst.OnSceneLoadProgress)
	protected onSceneLoadProgrss(pro: number) {
		this.view.refreshProgress(pro);
	}
}