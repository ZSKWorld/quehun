import ComLevel1 from "../../../../ui/PkgCommon/ComLevel1";

export const enum EComLevel1Msg {

}

export class ComLevel1View extends ExtendClass<IView, ComLevel1>(ComLevel1) implements IView {

	override onCreate() {

	}

	refresh(data: IAccountLevel) {
		const { ctrl_ht, ctrl_star, txt_htScore, com_level } = this;
		com_level.refresh(data);
		$uiUtil.refreshLevel({ ctrl_ht, ctrl_star, txt_htScore }, data);
	}
}
