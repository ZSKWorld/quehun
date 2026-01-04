import ComHead2 from "../../../../ui/PkgCommon/ComHead2";

export const enum EComHead1Msg {

}

export class ComHead2View extends ExtensionClass<IView, ComHead2>(ComHead2) implements IView {

	override onCreate() {

	}

	refresh(avatarId:number, frameId:number) {
		this.com_head.refreshSmallHead(avatarId);
		this.com_frame.refreshIcon(frameId);
	}
}
