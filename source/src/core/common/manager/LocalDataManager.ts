export class LocalDataManager implements ILocalDataManager{
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
