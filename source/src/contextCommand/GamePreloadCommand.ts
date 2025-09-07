import { Command } from "../core/mvc/controller/Command";
import { RedDotManager } from "../core/ui/redDot/RedDotManager";
import { SceneGame } from "../scene/scene/SceneGame";
import { SceneLittleGame } from "../scene/scene/SceneLittleGame";
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
            cfgMgr.init();
            uiMgr.init();
            // WebSocket.Inst.init();
            RedDotManager.Inst.init();
            sceneMgr.init([
                new SceneLogin(),
                new SceneMain(),
                new SceneGame(),
                new SceneLittleGame(),
            ]);
            sceneMgr.enterScene(SceneType.LoginScene);
        });
    }

    private async load() {
        await pbMgr.loadPb();
        await netMgr.fetchConfig();

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

        await loadMgr.load(ResPath.ConfigPath.Config);
    }
}