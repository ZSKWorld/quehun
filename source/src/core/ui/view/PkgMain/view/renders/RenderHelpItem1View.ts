import RenderHelpItem1 from "../../../../ui/PkgMain/RenderHelpItem1";
import { ComMJItemView } from "../../../PkgCommon/view/coms/ComMJItemView";

export const enum ERenderHelpItem1Msg {

}

export class RenderHelpItem1View extends ExtensionClass<IView, RenderHelpItem1>(RenderHelpItem1) implements IView {

	private _mjps: ComMJItemView[] = [];

	override onCreate() {
		for (let i = 1; i <= 19; i++) {
			this._mjps.push(this.getChildAt(i) as ComMJItemView);
		}
	}

	refresh() {
		this._mjps.forEach((v, i) => v.refresh((i % 10 + "m") as any));
	}
}
