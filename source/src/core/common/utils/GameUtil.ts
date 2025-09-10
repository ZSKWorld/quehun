import { TimeUtil } from "./TimeUtil";


export class GameUtil {

    static createUUID() {
        let d = TimeUtil.milliSecond();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        const uuid = 'xyxyxyxyxyxyxyxy'.replace(/[xy]/g, function (c) {
            const r = (d + Math.random() * 36) % 36 | 0;
            d = Math.floor(d / 36);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(36);
        });
        return uuid;
    }

    static getColorStr(id: number, text: string) {
        return $richText(text).color(cfgMgr.Color[id].color).end();
    }

    /** 获取物品数量字符串 */
    static getItemCountStr(id: number, count?: number) {
        const { name, quality } = cfgMgr.Item[id];
        const color = GameUtil.getColorStr(quality, name);
        return $richText().space().append(`${ color }${ count != null ? " x" + count : "" }`).space().end();
    }

    /**获取多个物品字符串 */
    static getItemString(items: OriginData<IGoods>[], hasCount = true, color = false) {
        let str = "";
        items.forEach((v, index) => str += (color ? this.getColorStr(cfgMgr.Item[v.id].quality, cfgMgr.Item[v.id].name) : cfgMgr.Item[v.id].name)
            + (hasCount ? `x${ v.count }` : "") + (index == items.length - 1 ? "" : "、"));
        return str;
    }

    /** 物理分辨率x坐标转逻辑分辨率x坐标 */
    static PRX2LRX(x: number) {
        return Math.round(x * Laya.stage.width / Laya.Browser.clientWidth);
    }

    /** 物理分辨率y坐标转逻辑分辨率y坐标 */
    static PRY2LRY(y: number) {
        return Math.round(y * Laya.stage.height / Laya.Browser.clientHeight);
    }

    /** 逻辑分辨率x坐标转物理分辨率x坐标 */
    static LRX2PRX(x: number) {
        return Math.round(x / (Laya.stage.width / Laya.Browser.clientWidth));
    }

    /** 逻辑分辨率y坐标转物理分辨率y坐标 */
    static LRY2PRY(y: number) {
        return Math.round(y / (Laya.stage.height / Laya.Browser.clientHeight));
    }

    /** 随机颜色字符串 */
    static randomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return "#" + r.toString(16).padStart(2, "0")
            + g.toString(16).padStart(2, "0")
            + b.toString(16).padStart(2, "0");
    }

    static HmacSHA256(msg: string) {
        return String(CryptoJS.HmacSHA256(msg, "lailai"));
    }

    
    static getDeviceInfo() {
        const device = {
            hardware: '',
            platform: '',
            os: '',
            os_version: '',
            sale_platform: '',
            pkg: '',
            is_browser: true,
            software: '',
            model_number: '',
            screen_height: 0,
            screen_width: 0,
            user_agent: '',
            screen_type: 0, // 1:普通屏幕 2:触摸屏幕
        };

        device['hardware'] = 'unknown';
        device['platform'] = 'unknown';
        device['os'] = 'unknown';
        if (GameMgr.client_type == 'kr') {
            device['sale_platform'] = 'kr_web';
        } else {
            device['sale_platform'] = GameMgr.inDmm ? 'web_dmm' : 'web';
        }

        device['pkg'] = GameMgr.inDmm ? 'dmm_web' : 'web';
        device['is_browser'] = true;

        if (GameMgr.inConch) {
            device['platform'] = 'mobile';
            device['hardware'] = 'phone';
        } else if (GameMgr.iniOSWebview) {
            device['platform'] = 'mobile';
            device['hardware'] = 'phone';
        } else {
            if (Laya.Browser.onPC) {
                device['platform'] = 'pc';
                device['hardware'] = 'pc';
            }
            if (Laya.Browser.onIPad) {
                device['platform'] = 'ipad';
                device['hardware'] = 'ipad';
            }
            if (Laya.Browser.onMobile) {
                device['platform'] = 'mobile';
                device['hardware'] = 'phone';
            }
        }
        // if(this.headless) {
        //     de
        // }
        var sUserAgent = navigator.userAgent;
        if (Laya.Browser.onPC) {
            device['os'] = 'windows';
            if (!sUserAgent) {

            } else if (sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1) {
                device['os_version'] = 'win7';
            } else if (sUserAgent.indexOf("Windows8") > -1) {
                device['os_version'] = 'win8';
            } else if (sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1) {
                device['os_version'] = 'win10';
            }
        }
        if (Laya.Browser.onMac) device['os'] = 'mac';
        if (Laya.Browser.onIOS) {
            device['os'] = 'ios';
            var str = sUserAgent.toLowerCase();
            var ver = str.match(/cpu iphone os (.*?) like mac os/);
            if (!ver) { }
            else { device['os_version'] = 'ios' + ver[1].replace(/_/g, "."); }
        }
        if (Laya.Browser.onAndriod || Laya.Browser.onAndroid) {
            let version = sUserAgent.substr(sUserAgent.indexOf('Android') + 8, sUserAgent.indexOf(";", sUserAgent.indexOf("Android")) - sUserAgent.indexOf('Android') - 8);
            device['os'] = 'android';
            device['os_version'] = 'android' + version;
        }


        if (sUserAgent.indexOf("Opera") > -1) device['software'] = 'Opera';
        else if (sUserAgent.indexOf("compatible") > -1
            && sUserAgent.indexOf("MSIE") > -1) device['software'] = 'IE';
        else if (sUserAgent.indexOf("Edge") > -1) device['software'] = 'Edge';
        else if (sUserAgent.indexOf("Firefox") > -1) device['software'] = 'Firefox';
        else if (sUserAgent.indexOf("Safari") > -1
            && sUserAgent.indexOf("Chrome") == -1) device['software'] = 'Safari';
        else if (sUserAgent.indexOf("Chrome") > -1
            && sUserAgent.indexOf("Safari") > -1) device['software'] = 'Chrome';

        var type = '';
        var reg = /;\s+([a-zA-Z0-9-_\s]+)\s+Build/;
        reg.exec(sUserAgent);
        type = (RegExp.$1).toLowerCase();
        if (type) {
            device['model_number'] = type;
        }
        device['screen_height'] = window.innerHeight;
        device['screen_width'] = window.innerWidth;
        device['user_agent'] = sUserAgent;
        device['screen_type'] = game.PlatformUtil.isTouchDevice() ? 2 : 1; // 1:普通屏幕 2:触摸屏幕
        app.Log.log('device_info:'+ JSON.stringify(device));
        return device;
    }
}