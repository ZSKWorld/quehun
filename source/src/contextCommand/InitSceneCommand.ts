import { Command } from "../core/mvc/controller/Command";
import { SceneLogin } from "../scene/scene/SceneLogin";
import { SceneMain } from "../scene/scene/SceneMain";

export class InitSceneCommand extends Command {
    override execute(notifyName: string, data?: any) {
        const registerScene = $sceneMgr.registerScene.bind($sceneMgr) as typeof $sceneMgr.registerScene;
        registerScene(new SceneLogin());
        registerScene(new SceneMain());
    }
}