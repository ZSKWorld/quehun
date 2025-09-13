import { NotifyConst } from "../../../../common/NotifyConst";
import { GameUtil } from "../../../../common/utils/GameUtil";
import { ProxyBase } from "../../../../mvc/model/ProxyBase";
import { UIUtil } from "../../../tool/UIUtil";

export class BagProxy extends ProxyBase {
    private useItem(input: IUseItemInput, output: IUseItemOutput) {
        if (input.id == 2010)
            uiMgr.openView(ViewID.UISectView);
        else
            UIUtil.showRewardsTip(`使用${ GameUtil.getItemCountStr(input.id, input.count) }获得`, output.rewards);
    }

    private sellItem(input: ISellItemInput, output: ISellItemOutput) {
        UIUtil.showRewardsTip(`出售${ GameUtil.getItemCountStr(input.id, input.count) }获得`, output.rewards);
    }

    private buyGoods(input: IBuyGoodsInput, output: IBuyGoodsOutput) {
        const titleStr = $richText("消耗");
        const item = cfgMgr.Shop[input.id];
        item.sellPrice.forEach(v => titleStr.append(GameUtil.getItemCountStr(v.id, v.count * input.count)));
        titleStr.append("购买");
        UIUtil.showRewardsTip(titleStr.end(), output.rewards);
    }

    private changeCollect(input: IChangeCollectInput) {
        const tipStr: string = input.collect ? "收藏成功" : "取消收藏";
        facade.dispatch(NotifyConst.AddGameLog, tipStr);
        tipMgr.showTip(tipStr);
    }

    private sellEquip(input: ISellEquipInput, output: ISellEquipOutput) {
        if (output.rewards?.length) {
            UIUtil.showRewardsTip(`出售${ GameUtil.getItemCountStr(input.id) }获得`, output.rewards);
        }
    }
}