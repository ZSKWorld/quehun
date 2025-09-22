import { LoadManager } from "./core/common/manager/LoadManager";
import { ELocalDataKey, LocalDataManager } from "./core/common/manager/LocalDataManager";
import { SkeletonManager } from "./core/common/manager/SkeletonManager";
import { GameUtil } from "./core/common/utils/GameUtil";
import { ConfigManager } from "./core/config/ConfigManager";
import { Facade } from "./core/mvc/Facade";
import { NetManager } from "./core/net/NetManager";
import { PbManager } from "./core/net/PbManager";
import { UIManager } from "./core/ui/core/UIManager";
import { RichText } from "./core/ui/tool/RichText";
import { TipManager } from "./core/ui/tool/TipManager";
import { UserData } from "./core/userData/UserData";
import { GameManager } from "./GameManager";
import { SceneManager } from "./scene/SceneManager";

windowImmit("GameUtil", GameUtil);
windowImmit("facade", Facade.Inst);
windowImmit("userData", new UserData());
windowImmit("uiMgr", new UIManager());
windowImmit("pbMgr", new PbManager());
windowImmit("tipMgr", new TipManager());
windowImmit("netMgr", new NetManager());
windowImmit("ELocalDataKey", ELocalDataKey);
windowImmit("loadMgr", new LoadManager());
windowImmit("gameMgr", new GameManager());
windowImmit("cfgMgr", new ConfigManager());
windowImmit("sceneMgr", new SceneManager());
windowImmit("skeletonMgr", new SkeletonManager());
windowImmit("localDataMgr", new LocalDataManager());

windowImmit("$localizeTxt", function (id: number, ...args: any[]) {
    const d_excel = cfgMgr.str.str[id];
    let s = "";
    if (d_excel) {
        s = d_excel[gameMgr.language];
        if (args) {
            for (let i = 0; i < args.length; i++) {
                const reg = new RegExp(`{${ i }}`, 'g');
                s = s.replace(reg, args[i]);
            }
        }
    }
    return s;
});

windowImmit("$confirm", (title: string, msg: string, cancel = true) => {
    if (!fgui.UIPackage.getByName(ResPath.PkgName.PkgCommon))
        return gameMgr.showConfirm(msg);
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