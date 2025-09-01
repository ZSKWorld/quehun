import { NotifyConst } from "../../../../common/NotifyConst";
import { ProxyBase } from "../../../../mvc/model/ProxyBase";
import { SocketEvent } from "../../../../net/WebSocket";

export class BattleProxy extends ProxyBase {

    @InterestMessage(MessageID.EnterBattle)
    private enterBattle(input: IEnterBattleInput, output: IEnterBattleOutput) {
        facade.dispatch(NotifyConst.EnterBattle, input);
        uiMgr.openView(ViewID.UIBattleView, input);
    }

    @InterestNotify(SocketEvent.Close)
    @InterestMessage(MessageID.ExitBattle)
    private existBattle(input: IExitBattleInput, output: IExitBattleOutput) {
        facade.dispatch(NotifyConst.ExitBattle);
        uiMgr.openView(ViewID.UIChooseBattleView);
    }

    @InterestMessage(MessageID.StartGather)
    private startGather() {
        facade.dispatch(NotifyConst.StartGather);
    }
}