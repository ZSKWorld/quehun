import { Command } from "../core/mvc/controller/Command";
import { LoginProxy } from "../core/ui/view/PkgLogin/proxy/LoginProxy";
import { BagProxy } from "../core/ui/view/PkgMain/proxy/BagProxy";
import { MainProxy } from "../core/ui/view/PkgMain/proxy/MainProxy";

export class InitModelCommand extends Command {
    override execute(notifyName: string, data?: any) {
        const registerProxy = $facade.registerProxy.bind($facade) as typeof $facade.registerProxy;
        registerProxy(EProxyID.Bag, BagProxy);
        registerProxy(EProxyID.Login, LoginProxy);
        registerProxy(EProxyID.Main, MainProxy);
    }
}