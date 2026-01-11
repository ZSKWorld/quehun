import RenderFriendRecent from "../../../../ui/PkgMain/RenderFriendRecent";


export class RenderFriendRecentView extends ExtensionClass<IView, RenderFriendRecent>(RenderFriendRecent) implements IView {

	override onCreate() {
		const { btn_add } = this;
	}

	refresh(data: IPlayerBaseView) {

	}
}
