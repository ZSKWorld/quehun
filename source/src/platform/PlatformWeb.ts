import { NotifyConst } from "../core/common/NotifyConst";
import { PlatformBase } from "./PlatformBase";

export class PlatformWeb extends PlatformBase {
    override get safeArea() {
        if (!this._safeArea) {
            const { width, height } = Laya.stage;
            this._safeArea = { width, height, top: 0, bottom: height, left: 0, right: width, };
        }
        return this._safeArea;
    }
    override get menuBtnArea() {
        if (!this._menuBtnArea) {
            this._menuBtnArea = { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0, };
        }
        return this._menuBtnArea;
    }

    override showConfirm(title: string, msg: string) {
        return Promise.resolve(confirm(msg));
    }

    protected onFix() {

    }

    protected onInit() {
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.Config.defaultFont = ResPath.FontName.Font08;
        fgui.UIConfig.defaultFont = ResPath.FontName.Font08;

        this.config.stat && Laya.Stat.show(0, 0, [
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
        Laya.InputManager.multiTouchEnabled = false;
        Laya.stage.on(Laya.Event.VISIBILITY_CHANGE, this, () => {
            if (Laya.stage.isVisibility) this.dispatch(NotifyConst.OnGameShow);
            else this.dispatch(NotifyConst.OnGameHide);
        });
    }

}