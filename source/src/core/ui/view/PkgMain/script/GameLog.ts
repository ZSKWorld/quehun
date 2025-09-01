import { MathUtil } from "../../../../common/math/MathUtil";
import { NotifyConst } from "../../../../common/NotifyConst";
import { UIScriptBase } from "../../../core/UIScriptBase";
import { UIUtil } from "../../../tool/UIUtil";
import { RenderTextView } from "../view/renders/RenderTextView";

/** 历练日志 */
export class GameLog extends UIScriptBase<fgui.GList> {
    private static _constLogs = [
        "[color=#FF0000]欢迎回来~[/color]",
        "[color=#FF0000]签到送V零充满V不是梦[/color]",
        "[color=#FF0000]★帮会跑商★宝石合成★[/color]",
        "[color=#FF0000]★套装打造★神装兑换★[/color]",
        "[color=#FF0000]★手工装备★时装坐骑★[/color]",
        "[color=#FF0000]★法宝暗器★良心放置★[/color]",
        "[color=#FF0000]副本通关三次无条件扫荡[/color]",
        "[color=#FF0000]我们的口号是：[/color]<br/>[color=#FF0000]上线10分钟，挂机24小时[/color]",
        "[color=#FF0000]一时修仙一爽，一直修仙一直爽[/color]",
    ];
    private _logs: string[] = [];

    override onAdded() {
        UIUtil.setList(this.gowner, true, this, this.onListLogRenderer);
    }

    override onEnable() {
        const logs = GameLog._constLogs;
        this.addLog(logs[MathUtil.randomInt(0, logs.length - 1)]);
    }

    override onReset() {
        super.onReset();
        this._logs.length = 0;
        Laya.timer.clearAll(this);
    }

    private refreshLogList() {
        if (!this.gowner.visible) return;
        this.gowner.numItems = this._logs.length;
        this.gowner.scrollToView(this._logs.length - 1);
    }

    private onListLogRenderer(index: number, item: RenderTextView) {
        item.refreshText(this._logs[index]);
    }

    @InterestNotify(NotifyConst.AddGameLog)
    private addLog(log: string | string[]) {
        if (Array.isArray(log)) this._logs.push(...log);
        else this._logs.push(log);
        Laya.timer.callLater(this, this.refreshLogList);
    }

    @InterestNotify(NotifyConst.ClearGameLog)
    private clearLog() {
        this._logs.length = 0;
        Laya.timer.callLater(this, this.refreshLogList);
    }
}