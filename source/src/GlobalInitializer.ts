import { LoadManager } from "./core/common/manager/LoadManager";
import { SkeletonManager } from "./core/common/manager/SkeletonManager";
import { CfgManager } from "./core/config/CfgManager";
import { Facade } from "./core/mvc/Facade";
import { NetManager } from "./core/net/NetManager";
import { NetService } from "./core/net/NetService";
import { PbManager } from "./core/net/PbManager";
import { UIManager } from "./core/ui/core/UIManager";
import { RichText } from "./core/ui/tool/RichText";
import { TipManager } from "./core/ui/tool/TipManager";
import { User } from "./core/userData/User";
import { PlatfromManager } from "./platform/PlatfromManager";
import { SceneManager } from "./scene/SceneManager";

windowImmit("facade", Facade.Inst);
windowImmit("userData", new User());
windowImmit("uiMgr", new UIManager());
windowImmit("pbMgr", new PbManager());
windowImmit("tipMgr", new TipManager());
windowImmit("cfgMgr", new CfgManager());
windowImmit("netMgr", new NetManager());
windowImmit("loadMgr", new LoadManager());
windowImmit("netService", new NetService());
windowImmit("sceneMgr", new SceneManager());
windowImmit("platformMgr", new PlatfromManager());
windowImmit("skeletonMgr", new SkeletonManager());

windowImmit("$confirm", (title: string, msg: string, cancel = true) => {
    if (!fgui.UIPackage.getByName(ResPath.PkgName.PkgCommon))
        return platformMgr.showConfirm(title, msg);
    windowImmit("$confirm", (title: string, msg: string, cancel = true) => new Promise<boolean>(resolve => {
        uiMgr.openView(ViewID.UIConfirmView, {
            title,
            content: msg,
            cancel: cancel,
            onCancel: cancel ? Laya.Handler.create(null, resolve, [false]) : null,
            onConfirm: Laya.Handler.create(null, resolve, [true]),
        });
    }));
    return $confirm(title, msg, cancel);
});

windowImmit("$richText", function (text: string = "") {
    return Laya.Pool.createByClass(RichText).start(text);
});

export function GlobalInitialize() {

}