import ComName1 from "../../../../ui/PkgCommon/ComName1";

export const enum EComName1Msg {

}

export class ComName1View extends ExtensionClass<IView, ComName1>(ComName1) implements IView {

	override onCreate() {

	}

	refresh(data: { account_id: number, nickname: string, verified: number }) {
		const { txt_name, img_vip } = this;
		txt_name.text = data.nickname;
		const isVip = !!data.verified;
		img_vip.visible = isVip;
		if (isVip)
			img_vip.x = txt_name.x + txt_name.textWidth + 5;
	}
}
