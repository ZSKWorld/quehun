export const enum LocalDataKey {
    /** 可以自动登录 */
    AutoLogin = "LocalDataKey_AutoLogin",
    LoginRemeber = "LocalDataKey_LoginRemeber",
    /** 上次登录账号 */
    LastLoginAccount = "LocalDataKey_LastLoginAccount",
    /** 战斗速度 */
    BattleSpeed = "LocalDataKey_BattleSpeed",
    DeviceId = "LocalDataKey_DeviceId",
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
