import ComMJItem from "../../../../ui/PkgCommon/ComMJItem";

interface MjpSignMap {
	["0m"]: boolean;["1m"]: boolean;["2m"]: boolean;["3m"]: boolean;["4m"]: boolean;["5m"]: boolean;["6m"]: boolean;["7m"]: boolean;["8m"]: boolean;["9m"]: boolean;
	["0p"]: boolean;["1p"]: boolean;["2p"]: boolean;["3p"]: boolean;["4p"]: boolean;["5p"]: boolean;["6p"]: boolean;["7p"]: boolean;["8p"]: boolean;["9p"]: boolean;
	["0s"]: boolean;["1s"]: boolean;["2s"]: boolean;["3s"]: boolean;["4s"]: boolean;["5s"]: boolean;["6s"]: boolean;["7s"]: boolean;["8s"]: boolean;["9s"]: boolean;
	["1z"]: boolean;["2z"]: boolean;["3z"]: boolean;["4z"]: boolean;["5z"]: boolean;["6z"]: boolean;["7z"]: boolean;
	["b"]: boolean;["back"]: boolean;["bd"]: boolean;
}

export const enum EComMJItemMsg {

}

export class ComMJItemView extends ExtensionClass<IView, ComMJItem>(ComMJItem) implements IView {

	override onCreate() {

	}

	refresh(str: keyof MjpSignMap) {
		const mjpBack = $user.commonView.curMjpBack;
		const mjpFront = $user.commonView.curMjpFront;

		const mjpBackInfo = $itemUtil.getItemInfo(mjpBack);
		const mjpFrontInfo = $itemUtil.getItemInfo(mjpFront);

		if (str == "b" || str == "back") {
			this.loader_back.icon = mjpBackInfo.resPath + "back.png";
			this.loader_front.icon = mjpFrontInfo.resPath + "5z.png";
		} else {
			this.loader_back.icon = mjpBackInfo.resPath + "front.png";
			this.loader_front.icon = mjpFrontInfo.resPath + str + ".png";
		}
	}
}
