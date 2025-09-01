export function Singleton<T>() {
    return class Singleton {
        private static _inst: T;
        static get Inst() {
            return this._inst || (this._inst = new this() as unknown as T);
        }
        protected constructor() { }
    };
}

export function SingletonExtend<T, E>(extendCls: Class<E>) {
    return SingletonExtend2<T, Class<E>>(extendCls);
}

function SingletonExtend2<T, E extends Class<any>>(extendCls: E) {
    return class Singleton extends extendCls {
        private static _inst: T;
        static get Inst() {
            return this._inst || (this._inst = new this() as unknown as T);
        }
        protected constructor(...args: any[]) { super(...args); }
    };
}

