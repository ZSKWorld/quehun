export class LocalDataManager extends Singleton<LocalDataManager>() implements ILocalDataManager {
	set<T>(key: string, value: T) {
		try {
			Laya.LocalStorage.setJSON(key, value);
		} catch (error) {
			Logger.error("LocalDataManager set error", key, value, error);
		}
	}

	get<T = any>(key: string, defaultValue?: T) {
		let value = null;
		try {
			value = Laya.LocalStorage.getJSON(key);
		} catch (error) {
			Logger.error("LocalDataManager get error", key, error);
		}
		return (value == null ? defaultValue : value) as T;
	}

	remove(key: string) {
		Laya.LocalStorage.removeItem(key);
	}

	removeAll() {
		Laya.LocalStorage.clear();
	}
}
