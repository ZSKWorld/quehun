import ComHead2 from "../../../../ui/PkgCommon/ComHead2";

export const enum EComHead1Msg {

}

export class ComHead2View extends ExtensionClass<IView, ComHead2>(ComHead2) implements IView {

	override onCreate() {

	}

	refresh(data: { account_id: number, avatar_id: number, avatar_frame?: number }) {
		const { avatar_id, avatar_frame, account_id } = data;
		this.com_head.refreshSmallHead(avatar_id);
		this.com_frame.refreshIcon(avatar_frame);
	}

}
