import { Command } from "../core/mvc/controller/Command";
import { RedDotManager } from "../core/ui/redDot/RedDotManager";
import { SceneLogin } from "../scene/scene/SceneLogin";
import { SceneMain } from "../scene/scene/SceneMain";
import { ESceneType } from "../scene/SceneDefine";

interface IGameConfig {
    readonly stat: boolean;
    readonly released: boolean;
}

export class GamePreloadCommand extends Command {
    override execute(notifyName: string, data?: any) {
        $uiMgr.init();
        $redDotMgr.init();
        this.load();
    }

    private async load() {
        const config: IGameConfig = await $loadMgr.fetch(ResPath.EUnclassifiedPath.Gameconfig, "json");
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
        // await $loadMgr.loadPackage(ResPath.EPkgPath.PkgEntrance);
        // $uiMgr.openView(EViewID.UIEntranceView);
        // await $gameMgr.init();
        // await $pbMgr.init();
        // await $cfgMgr.init();
        // await $netMgr.init();
        


		const spineRoot = Laya.stage.addChild(new Laya.Sprite());
		const spinePath = [
			$langRes("extendRes/charactor/archer_hf/spine/spine_0.skel.txt"),
			$langRes("extendRes/charactor/archer_hf/spine/spine_1.skel.txt"),
		];
        $loadMgr.load(spinePath, Laya.Loader.SPINE).then((a) => {
            Logger.error(a);
			spinePath.forEach(v => {
				const sp = spineRoot.addChild(new Laya.Sprite());
				const spine = sp.addComponent(Laya.Spine2DRenderNode);
				spine.source = v;
				spine.skinName = "default";
                spine.play("idle", true);
                Logger.error(spine);
            });
		});
    }
}