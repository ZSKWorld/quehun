import { TimeUtil } from "./TimeUtil";


export class GameUtil {

    static createUUID() {
        let d = TimeUtil.milliSecond();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
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
        const userAgent = navigator.userAgent;
        const device: IClientDeviceInfo = {
            hardware: 'pc',
            platform: 'pc',
            os: 'windows',
            os_version: 'win10',
            sale_platform: 'web',
            is_browser: true,
            software: 'Chrome',
            model_number: '',
            screen_height: window.innerHeight,
            screen_width: window.innerWidth,
            user_agent: userAgent,
            screen_type: 'ontouchstart' in window || navigator.maxTouchPoints > 0 ? 2 : 1,
            hardware_vendor: ""
        };
        /;\s+([a-zA-Z0-9-_\s]+)\s+Build/.exec(userAgent);
        const type = (RegExp.$1).toLowerCase();
        if (type) device.model_number = type;
        return device;
    }
}