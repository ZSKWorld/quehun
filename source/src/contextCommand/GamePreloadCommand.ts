import { Command } from "../core/mvc/controller/Command";
import { RedDotManager } from "../core/ui/redDot/RedDotManager";
import { SceneLogin } from "../scene/scene/SceneLogin";
import { SceneMain } from "../scene/scene/SceneMain";
import { SceneType } from "../scene/SceneDefine";

interface IGameConfig {
    readonly stat: boolean;
    readonly released: boolean;
}

export class GamePreloadCommand extends Command {
    override execute(notifyName: string, data?: any) {
        this.load().then(() => {
            uiMgr.init();
            RedDotManager.Inst.init();
            sceneMgr.init([
                new SceneLogin(),
                new SceneMain(),
            ]);
            sceneMgr.enterScene(SceneType.LoginScene);
        });
    }

    private async load() {
        await gameMgr.init();
        await pbMgr.init();
        await cfgMgr.loadCfg();
        await netMgr.init();

        await loadMgr.load(ResPath.UnclassifiedPath.Gameconfig);
        const config: IGameConfig = loadMgr.getRes<Laya.TextResource>(ResPath.UnclassifiedPath.Gameconfig).data;
        config.stat && Laya.Stat.show(0, 0, [
            Laya.Stat.FPSStatUIParams,
            Laya.Stat.NodeStatUIParams,
            Laya.Stat.Sprite3DStatUIParams,
            Laya.Stat.DrawCall,
            Laya.Stat.TriangleFace,
            Laya.Stat.GPUMemory,
            Laya.Stat.TextureMemeory,
            Laya.Stat.RenderTextureMemory,
            Laya.Stat.BufferMemory,
        ]);
    }
}