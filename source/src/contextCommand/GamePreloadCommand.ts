import { Command } from "../core/mvc/controller/Command";
import { WebSocket } from "../core/net/WebSocket";
import { RedDotManager } from "../core/ui/redDot/RedDotManager";
import { SceneGame } from "../scene/scene/SceneGame";
import { SceneLittleGame } from "../scene/scene/SceneLittleGame";
import { SceneLogin } from "../scene/scene/SceneLogin";
import { SceneMain } from "../scene/scene/SceneMain";
import { SceneEvent, SceneType } from "../scene/SceneDefine";

interface IGameConfig {
    readonly stat: boolean;
    readonly released: boolean;
}

export class GamePreloadCommand extends Command {
    override execute(notifyName: string, data?: any) {
        this.load().then(() => {
            cfgMgr.init();
            uiMgr.init();
            WebSocket.Inst.init();
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
        await loadMgr.load(ResPath.PrescreenPath.Prescreen);
        await this.showPrescreen();
        facade.on(SceneEvent.OnEnterScene, this, this.clearPrescreen, null, true);

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

    private showPrescreen() {
        const pmask = Laya.stage.addChild(new Laya.Sprite());
        pmask.zOrder = 998;
        pmask.name = "premask";
        pmask.mouseEnabled = true;
        pmask.size(Laya.stage.width, Laya.stage.height);
        pmask.graphics.drawRect(0, 0, pmask.width, pmask.height, "#000000");

        const pscreen = new Laya.Sprite();
        pscreen.name = "prescreen";
        pscreen.zOrder = 999;
        pscreen.alpha = 0;
        pscreen.scale(0.1, 0.1);
        pscreen.pivot(181, 189);
        pscreen.pos(Laya.stage.width / 2, Laya.stage.height / 2);
        pscreen.loadImage(ResPath.PrescreenPath.Prescreen);
        Laya.stage.addChild(pscreen);

        return new Promise(resolve => {
            Laya.Tween.create(pscreen, pscreen).duration(500).ease(Laya.Ease.quartOut).to("alpha", 1).to("scaleX", 1).to("scaleY", 1).then(resolve)
                .chain(pscreen).duration(20000).to("scaleX", 1.2).to("scaleY", 1.2);
        });
    }

    private clearPrescreen() {
        const pmask = Laya.stage.findChild("premask") as Laya.Sprite;
        const pscreen = Laya.stage.findChild("prescreen") as Laya.Sprite;
        Laya.Tween.killAll(pscreen);
        Laya.Tween.create(pmask).duration(250).to("alpha", 0)
            .parallel(pscreen).duration(250).to("alpha", 0).then(() => {
                pmask.destroy();
                pscreen.destroy();
                Laya.loader.clearRes(ResPath.PrescreenPath.Prescreen);
            });
    }
}