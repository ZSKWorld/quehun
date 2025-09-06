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
        Laya.stage.on(Laya.Event.VISIBILITY_CHANGE, this, () => {
            if (Laya.stage.isVisibility) this.dispatch(NotifyConst.OnGameShow);
            else this.dispatch(NotifyConst.OnGameHide);
        });
    }

}