export class Queue<T = any> {
	private _data: T[] = [];
	get count() { return this._data.length; }

	enqueue(item: T) {
		this._data.push(item);
	}

	dequeue() {
		return this._data.shift();
	}

	peek() {
		return this._data.first;
	}

	clear() {
		this._data.clear();
	}

	contains(item: T) {
		return this._data.findIndex(v => v === item) > -1;
	}

	*[Symbol.iterator]() {
		const cnt = this._data.length;
		for (let i = 0; i < cnt; i++) {
			yield this._data[i];
		}
	}
}