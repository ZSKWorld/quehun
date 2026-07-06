import RenderBagItem from "../../../../ui/PkgMain/RenderBagItem";

export const enum ERenderBagItemMsg {

}

export class RenderBagItemView extends ExtendClass<IView, RenderBagItem>(RenderBagItem) implements IView {

	override onCreate() {

	}

	refreshWithCount(id: number, count: number) {
		this.com_item.refreshItemIcon(id);
		this.txt_count.text = String(count);
		this.txt_count.visible = true;
	}

	refreshWithoutCount(id: number) {
		this.com_item.refreshItemIcon(id);
		this.txt_count.visible = false;
	}
}
