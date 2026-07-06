import ComItem1 from "../../../../ui/PkgCommon/ComItem1";

export const enum EBtnItem1Msg {

}

export class ComItem1View extends ExtendClass<IView, ComItem1>(ComItem1) implements IView {

	/** 刷新指定路径icon */
	refreshSkin(url: string) {
		this.com_item.refreshSkin(url);
	}

	/** 刷新半透明icon */
	refreshIcon(id: number) {
		this.com_item.refreshIcon(id);
	}

	/** 刷新不透明icon */
	refreshItemIcon(id: number) {
		this.com_item.refreshItemIcon(id);
	}

	/** 刷新预览图 */
	refreshPreview(id: number) {
		this.com_item.refreshPreview(id);
	}

	/** 刷新loading图 */
	refreshLoadingImage(id: number) {
		this.com_item.refreshLoadingImage(id);
	}
}
