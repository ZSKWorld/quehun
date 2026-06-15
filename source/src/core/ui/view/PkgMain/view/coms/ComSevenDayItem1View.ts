import ComSevenDayItem1 from "../../../../ui/PkgMain/ComSevenDayItem1";

export const enum EComSevenDayItem1Msg {

}

export class ComSevenDayItem1View extends ExtendClass<IView, ComSevenDayItem1>(ComSevenDayItem1) implements IView {

	override onCreate() {

	}

	refresh(id: number, count: number) {
		this.com_item.refreshItemIcon(id);
		this.txt_count.text = count.toString();
	}
}
