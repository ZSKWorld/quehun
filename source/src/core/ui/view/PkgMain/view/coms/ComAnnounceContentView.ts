import ComAnnounceContent from "../../../../ui/PkgMain/ComAnnounceContent";

export const enum EComAnnounceContentMsg {

}

export class ComAnnounceContentView extends ExtensionClass<IView, ComAnnounceContent>(ComAnnounceContent) implements IView {

	override onCreate() {
		this.rtxt_content.on(Laya.Event.LINK, this, this.onContentHref);
	}

	refresh(data: ProtoObject<IAnnouncement>) {
		const { header_image, title, content } = data;
		const { loader_header, txt_title, rtxt_content } = this;

		$dynamicResMgr.clearLoader(loader_header);
		const imgPath = this.getHeaderImgPath(header_image);
		loader_header.visible = !!imgPath;
		if (imgPath) $dynamicResMgr.setLoader(loader_header, imgPath);

		txt_title.text = title;

		rtxt_content.text = $uiUtil.parseUBBText(content);

		this.scrollPane.posY = 0;
	}

	override onDisable() {
		$dynamicResMgr.clearLoader(this.loader_header);
	}

	private getHeaderImgPath(imgPath: string) {
		if (!imgPath) return imgPath;
		if (imgPath.startsWith("internal://")) {
			imgPath = imgPath.replace("internal://", "myres/info/");
			if ($gameMgr.clientType == EClientType.EN && $gameMgr.language == ELanguage.CHST)
				imgPath = imgPath.replace("/9.jpg", "/9_en.jpg");
			imgPath = $langRes(imgPath);
		}
		return imgPath;
	}

	private onContentHref(href: string) {
		$gameUtil.openHref(href);
	}
}
