import { Command } from "../core/mvc/controller/Command";
import { SceneLogin } from "../scene/scene/SceneLogin";
import { SceneMain } from "../scene/scene/SceneMain";
import { ESceneType } from "../scene/SceneDefine";

export class InitSceneCommand extends Command {
    override execute(notifyName: string, data?: any) {
        const registerScene = $sceneMgr.registerScene.bind($sceneMgr) as typeof $sceneMgr.registerScene;
        const registerView = $sceneMgr.registerView.bind($sceneMgr) as typeof $sceneMgr.registerView;
        registerScene(ESceneType.LoginScene, SceneLogin);
        registerView(ESceneType.LoginScene, EViewID.UIEntranceView);
        registerView(ESceneType.LoginScene, EViewID.UILoginView);
        registerView(ESceneType.LoginScene, EViewID.UIBindPhoneView);
        registerView(ESceneType.LoginScene, EViewID.UILoginQueueView);


        registerScene(ESceneType.MainScene, SceneMain);
    }
}