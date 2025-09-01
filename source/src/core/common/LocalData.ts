export const enum LocalDataKey {
    /** 可以自动登录 */
    AutoLogin = "AutoLogin",
    LoginRemeber = "LoginRemeber",
    /** 上次登录账号 */
    LastLoginAccount = "LastLoginAccount",
    /** 战斗速度 */
    BattleSpeed = "BattleSpeed",
}

export class LocalData {
    static set<T>(key: string, value: T) {
        Laya.LocalStorage.setJSON(key, value);
    }

    static get<T = any>(key: string): T {
        return Laya.LocalStorage.getJSON(key);
    }

    static remove(key: string) {
        Laya.LocalStorage.removeItem(key);
    }

    static removeAll() {
        Laya.LocalStorage.clear();
    }
}
