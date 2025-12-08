import RenderBagItem from "../../../../ui/PkgMain/RenderBagItem";

export const enum ERenderBagItemMsg {

}

export class RenderBagItemView extends ExtensionClass<IView, RenderBagItem>(RenderBagItem) implements IView {

	override onCreate() {

	}

	refresh(id: number, count: number) {
		this.com_item.refresh(id);
		this.txt_count.text = String(count);
	}
}
