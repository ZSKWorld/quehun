import ComLevel2 from "../../../../ui/PkgCommon/ComLevel2";

export const enum EComLevel2Msg {

}

export class ComLevel2View extends ComLevel2 {

	refresh(data: IAccountLevel) {
		const { ctrl_ht, ctrl_star, loader_icon, txt_htLevel } = this;
		$uiUtil.refreshLevel({ ctrl_ht, ctrl_star, loader_icon, txt_htLevel }, data);
	}

}
