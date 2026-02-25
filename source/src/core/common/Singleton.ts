export function Singleton<T>() {
	return class Singleton {
		private static _inst: T;
		static get Inst() {
			return this._inst || (this._inst = new this() as unknown as T);
		}
		protected constructor() { }
	};
}

