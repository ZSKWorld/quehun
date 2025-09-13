import { NotifyConst } from "../../../../common/NotifyConst";
import { GameUtil } from "../../../../common/utils/GameUtil";
import { ProxyBase } from "../../../../mvc/model/ProxyBase";
import { UIUtil } from "../../../tool/UIUtil";

export class MainProxy extends ProxyBase {
    private decomposeGem(input: IDecomposeGemInput, output: IDecomposeGemOutput) {
        if (output.rewards?.length) {
            UIUtil.showRewardsTip(`分解${ input.level }级宝石获得`, output.rewards);
        }
    }

    private decomposeEquip(input: IDecomposeEquipInput, output: IDecomposeEquipOutput) {
        if (output.rewards?.length) {
            UIUtil.showRewardsTip(`分解${ input.star }星装备获得`, output.rewards);
        }
    }

    private clearAccount(input: IClearAccountInput, output: IClearAccountOutput) {
        facade.dispatch(NotifyConst.ClearAccount);
    }

    private clearAccountError(input: IClearAccountInput, output: IClearAccountOutput) {

    }
}