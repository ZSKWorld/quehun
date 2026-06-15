import ComMJItem from "../../../../ui/PkgCommon/ComMJItem";

interface IMjpSignMap {
	["0m"]: number;["1m"]: number;["2m"]: number;["3m"]: number;["4m"]: number;["5m"]: number;["6m"]: number;["7m"]: number;["8m"]: number;["9m"]: number;
	["0p"]: number;["1p"]: number;["2p"]: number;["3p"]: number;["4p"]: number;["5p"]: number;["6p"]: number;["7p"]: number;["8p"]: number;["9p"]: number;
	["0s"]: number;["1s"]: number;["2s"]: number;["3s"]: number;["4s"]: number;["5s"]: number;["6s"]: number;["7s"]: number;["8s"]: number;["9s"]: number;
	["1z"]: number;["2z"]: number;["3z"]: number;["4z"]: number;["5z"]: number;["6z"]: number;["7z"]: number;
	["b"]: number;["back"]: number;["bd"]: number;
}

const MjpSignMap: IMjpSignMap = {
	"0m": 1, "1m": 1, "2m": 1, "3m": 1, "4m": 1, "5m": 1, "6m": 1, "7m": 1, "8m": 1, "9m": 1,
	"0p": 1, "1p": 1, "2p": 1, "3p": 1, "4p": 1, "5p": 1, "6p": 1, "7p": 1, "8p": 1, "9p": 1,
	"0s": 1, "1s": 1, "2s": 1, "3s": 1, "4s": 1, "5s": 1, "6s": 1, "7s": 1, "8s": 1, "9s": 1,
	"1z": 1, "2z": 1, "3z": 1, "4z": 1, "5z": 1, "6z": 1, "7z": 1,
	b: 1, back: 1, bd: 1
};

export const enum EComMJItemMsg {

}

export class ComMJItemView extends ExtendClass<IView, ComMJItem>(ComMJItem) implements IView {

	override onCreate() {

	}

	refresh(str: keyof IMjpSignMap) {
		if (MjpSignMap[str] != 1) {
			Logger.error("unknown mjp sign: " + str);
			return;
		}
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
