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

	refresh(fandescId: number, fans: string[]) {
		const { _mjps, txt_name, txt_desc, txt_limit } = this;
		const cfgFanDesc = $cfgMgr.fandesc.fandesc[fandescId];
		txt_name.text = $langCfg(cfgFanDesc, "name");
		txt_desc.text = $langCfg(cfgFanDesc, "desc");
		txt_limit.text = $langCfg(cfgFanDesc, "desc2");
		let x = 45;
		for (let i = 0, cnt = _mjps.length, j = 0; i < cnt; i++, j++) {
			const fan = fans[j];
			if (fan == "|") {
				x += 20;
				i--;
				continue;
			}
			const v = _mjps[i];
			v.visible = !!fan;
			fan && (v.x = x);
			fan && (x += v.width);
			fan && v.refresh(fan as any);
		}
	}
}
