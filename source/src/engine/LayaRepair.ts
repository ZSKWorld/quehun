/** Laya修复 */
export class LayaRepair {
    static repair() {
        this.fixLayaPoolSign();
        this.fixStatUISize();
        this.fixTween();
    }

    /** 修复Laya.Pool._getClassSign方法，原方法会导致子类和父类回收到一个对象池中 */
    private static fixLayaPoolSign() {
        const pool = Laya.Pool;
        pool["_getClassSign"] = function (cla: any) {
            var className = cla["__className"] || (Object.prototype.hasOwnProperty.call(cla, "_$gid") ? cla["_$gid"] : null);
            if (!className) {
                cla["_$gid"] = className = Laya.Pool["_CLSID"] + "";
                Laya.Pool["_CLSID"]++;
            }
            return className;
        }

        // var className = cla["__className"] || cla["_$gid"];
        // if (!className) {
        //     cla["_$gid"] = className = Pool._CLSID + "";
        //     Pool._CLSID++;
        // }
        // return className;
    }

    private static fixStatUISize() {
        const prototype = Laya.StatUI.prototype;
        const oldFunc = prototype["createUI"];
        prototype["createUI"] = function () {
            oldFunc.call(this);
            const sp = <Laya.Sprite>this._sp;
            const txt1 = sp.getChildAt(0) as Laya.Text;
            const txt2 = sp.getChildAt(1) as Laya.Text;
            txt1.fontSize = txt2.fontSize = 30;
            txt1.singleCharRender = txt2.singleCharRender = false;

            txt2.pos(txt1.textWidth + 20, 5);
            
            sp.size(txt1.textWidth + 150, txt1.textHeight + 10);
            sp.graphics.clear();
            sp.graphics.alpha(0.5);
            sp.graphics.drawRect(0, 0, sp.width, sp.height, "#999999");
            sp.graphics.alpha(2);
        }
    }

    private static fixTween() {
        const prototype = Laya.Tween.prototype;
        const oldKill = prototype.kill;
        prototype.kill = function (complete?: boolean) {
            if (this._queue.length == 0)
                return;
            oldKill.call(this, complete);
            this._par = null;
        };
    }
}