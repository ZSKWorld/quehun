import BtnItem1 from "../../../../ui/PkgCommon/BtnItem1";

export const enum EBtnItem1Msg {

}

export class BtnItem1View extends ExtensionClass<IView, BtnItem1>(BtnItem1) implements IView {

	override onCreate() {

	}

	refreshDownScale(id: number) {
		this.downEffect = 2;
		this.refresh(id);
	}

	refreshNoDownScale(id: number) {
		this.downEffect = 0;
		this.refresh(id);
	}

	private refresh(id: number) {
		this.com_item.refresh(id);
	}
}
