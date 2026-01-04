import ComName2 from "../../../../ui/PkgCommon/ComName2";

export const enum EComName2Msg {

}

export class ComName2View extends ExtensionClass<IView, ComName2>(ComName2) implements IView {

	override onCreate() {
		
	}

	refresh(data: { nickname: string, verified: number }) {
		const { txt_name, img_vip } = this;
		txt_name.text = data.nickname;
		const isVip = !!data.verified;
		img_vip.visible = isVip;
		if (isVip)
			img_vip.x = txt_name.x + txt_name.textWidth + 5;
	}

}
