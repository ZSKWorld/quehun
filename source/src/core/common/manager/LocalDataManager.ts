export class LocalDataManager extends Singleton<LocalDataManager>() implements ILocalDataManager {
	set<T>(key: string, value: T) {
		Laya.LocalStorage.setJSON(key, value);
	}

	get<T = any>(key: string, defaultValue?: T) {
		const value = Laya.LocalStorage.getJSON(key);
		return (value == null ? defaultValue : value) as T;
	}

	remove(key: string) {
		Laya.LocalStorage.removeItem(key);
	}

	removeAll() {
		Laya.LocalStorage.clear();
	}
}
