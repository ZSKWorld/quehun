import { NotifyConst } from "../../../../common/NotifyConst";
import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { BattleType } from "../../../../userData/const/BattleEnums";
import { UIUtil } from "../../../tool/UIUtil";
import { UIBattleConfirmView } from "../view/UIBattleConfirmView";
export interface UIBattleConfirmData {
    type: BattleType;
    data: BattleCfgData;
}

export class UIBattleConfirmMediator extends MediatorBase<UIBattleConfirmView, UIBattleConfirmData> {

    override onEnable() {
        this.view.com_panel.mediator.data = this.data;
    }

    override onOpenAni() {
        return UIUtil.animAlphaIn(this.view.graph_bg, this.view.com_panel);
    }

    override onCloseAni() {
        return UIUtil.animAlphaOut(this.view.graph_bg, this.view.com_panel);
    }

    @InterestNotify(NotifyConst.EnterBattle)
    @InterestNotify(NotifyConst.StartGather)
    private onEnterBattle() {
        this.closeSelf();
    }
}