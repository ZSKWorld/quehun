export class Stack<T = any> {
    private _data: T[] = [];
    get count() { return this._data.length; }

    push(item: T) {
        this._data.unshift(item);
    }

    pop() {
        return this._data.shift();
    }

    peek() {
        return this._data[0];
    }

    contains(item: T) {
        return this._data.findIndex(v => v === item) > -1;
    }

    clear() {
        this._data.length = 0;
    }

    *[Symbol.iterator]() {
        for (let i = 0, cnt = this._data.length; i < cnt; i++) {
            yield this._data[i];
        }
    }
}