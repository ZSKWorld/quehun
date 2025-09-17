import { Command } from "../core/mvc/controller/Command";
import { BattleProxy } from "../core/ui/view/PkgBattle/proxy/BattleProxy";
import { LoginProxy } from "../core/ui/view/PkgLogin/proxy/LoginProxy";
import { BagProxy } from "../core/ui/view/PkgMain/proxy/BagProxy";
import { MainProxy } from "../core/ui/view/PkgMain/proxy/MainProxy";

export class InitGameCommand extends Command {
    override execute(notifyName: string, data?: any) {
        
    }
}