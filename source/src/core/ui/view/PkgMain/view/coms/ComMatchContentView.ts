import ComMatchContent from "../../../../ui/PkgMain/ComMatchContent";

export const enum EComMatchContentMsg {

}

export class ComMatchContentView extends ExtensionClass<IView, ComMatchContent>(ComMatchContent) implements IView {

	override onCreate() {

	}

	async transIn() {
		const { com_item0, com_item1, com_item2, com_item3, com_item4, scrollPane } = this;
		scrollPane.percY = 0
		const coms = [com_item4, com_item3, com_item2, com_item1, com_item0];
		for (let i = 0; i < coms.length; i++) {
			const com = coms[i];
			com.alpha = 1;
			const oldY = 166 * (coms.length - 1 - i);
			if (i > 0) {
				com.y = -220;
				com.tweenMoveY(oldY, 0.25).setEase(fgui.EaseType.ExpoOut).setDelay((i - 1) * 0.083);
			} else {
				com.y = oldY;
			}
		}
		this.visible = true;
		await $timeUtil.wait(500);
	}

	async transOut() {
		const { com_item0, com_item1, com_item2, com_item3, com_item4 } = this;
		const coms = [com_item0, com_item1, com_item2, com_item3, com_item4];
		for (let i = 0; i < coms.length; i++) {
			const com = coms[i];
			com.tweenFade(0, 0.167).setEase(fgui.EaseType.Linear);
			com.tweenMoveY(com.y - 40, 0.167).setEase(fgui.EaseType.Linear);
		}
		await $timeUtil.wait(167);
		this.visible = false;
	}

}
