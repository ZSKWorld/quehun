export class LocalDataManager extends Singleton<LocalDataManager>() implements ILocalDataManager {
	getNum(key: ELocalDataKey, defaultValue: number = 0): number {
		const value = Laya.LocalStorage.getItem(key);
		if (value === void 0) return defaultValue;
		const num = +value;
		return isNaN(num) ? defaultValue : num;
	}
	setNum(key: ELocalDataKey, value: number): void {
		Laya.LocalStorage.setItem(key, value.toString());
	}

	getStr(key: ELocalDataKey, defaultValue: string = ""): string {
		const value = Laya.LocalStorage.getItem(key);
		return value === void 0 ? defaultValue : value;
	}
	setStr(key: ELocalDataKey, value: string): void {
		Laya.LocalStorage.setItem(key, value);
	}

	getBool(key: ELocalDataKey, defaultValue: boolean = false): boolean {
		const value = Laya.LocalStorage.getItem(key);
		if (value === void 0) return defaultValue;
		return value === "true";
	}
	setBool(key: ELocalDataKey, value: boolean): void {
		Laya.LocalStorage.setItem(key, value.toString());
	}

	getObj<T>(key: ELocalDataKey, defaultValue: T = null): T {
		try {
			const value = Laya.LocalStorage.getJSON(key);
			return value === void 0 ? defaultValue : value;
		} catch (error) {
			Logger.error("LocalDataManager get error", key, error);
			return defaultValue;
		}
	}
	setObj<T>(key: ELocalDataKey, value: T) {
		try {
			Laya.LocalStorage.setJSON(key, value);
		} catch (error) {
			Logger.error("LocalDataManager set error", key, value, error);
		}
	}

	remove(key: ELocalDataKey) {
		Laya.LocalStorage.removeItem(key);
	}

	removeAll() {
		Laya.LocalStorage.clear();
	}
}
