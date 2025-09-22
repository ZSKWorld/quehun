export enum ELocalDataKey {
    /** 自动登录 */
    AutoLogin = "LocalDataKey_AutoLogin",
    /** 上次登录账号 */
    LastLoginData = "LocalDataKey_LastLoginData",
    DeviceId = "LocalDataKey_DeviceId",
}

export class LocalDataManager {
    set<T>(key: string, value: T) {
        Laya.LocalStorage.setJSON(key, value);
    }

    get<T = any>(key: string) {
        return Laya.LocalStorage.getJSON(key) as T;
    }

    remove(key: string) {
        Laya.LocalStorage.removeItem(key);
    }

    removeAll() {
        Laya.LocalStorage.clear();
    }
}
