import RenderLiaoSheDecoTab from "../../../../ui/PkgMain/RenderLiaoSheDecoTab";

export const enum ERenderLiaoSheDecoTabMsg {

}

export class RenderLiaoSheDecoTabView extends ExtensionClass<IView, RenderLiaoSheDecoTab>(RenderLiaoSheDecoTab) implements IView {

	override onCreate() {

	}

	refresh(data: ProtoObject<IResAllcommonViews_Views>, using: boolean) {
		this.title = data.name;
		this.img_using.visible = using;
	}
}
