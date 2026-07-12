@Singleton
export class LocalDataManager implements ILocalDataManager {
	getNum(key: ELocalDataKey, defaultValue: number = 0): number {
		const value = this.getItem(key);
		if (value === void 0 || value === null) return defaultValue;
		const num = +value;
		return isNaN(num) ? defaultValue : num;
	}
	setNum(key: ELocalDataKey, value: number): void {
		this.setItem(key, value.toString());
	}

	getStr(key: ELocalDataKey, defaultValue: string = ""): string {
		const value = this.getItem(key);
		return (value === void 0 || value === null) ? defaultValue : value;
	}
	setStr(key: ELocalDataKey, value: string): void {
		this.setItem(key, value);
	}

	getBool(key: ELocalDataKey, defaultValue: boolean = false): boolean {
		const value = this.getItem(key);
		if (value === void 0 || value === null) return defaultValue;
		return value === "true";
	}
	setBool(key: ELocalDataKey, value: boolean): void {
		this.setItem(key, (!!value).toString());
	}

	getObj<T>(key: ELocalDataKey, defaultValue: T = null): T {
		const value = this.getItem(key);
		if (value === void 0 || value === null) return defaultValue;
		try {
			return JSON.parse(value);
		} catch (error) {
			Logger.error("LocalDataManager get error", key, error);
			return defaultValue;
		}
	}
	setObj<T>(key: ELocalDataKey, value: T) {
		try {
			this.setItem(key, JSON.stringify(value));
		} catch (error) {
			Logger.error("LocalDataManager set error", key, value, error);
		}
	}

	remove(key: ELocalDataKey) {
		Laya.LocalStorage.removeItem($gameUtil.encrypt(key));
	}

	removeAll() {
		Laya.LocalStorage.clear();
	}

	private getItem(key: string): string {
		return $gameUtil.decrypt(Laya.LocalStorage.getItem($gameUtil.encrypt(key)));
	}

	private setItem(key: string, value: string): void {
		Laya.LocalStorage.setItem($gameUtil.encrypt(key), $gameUtil.encrypt(value));
	}
}
