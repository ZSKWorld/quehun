const Recycled = Symbol("Recycled");
const RecyclablePool = Symbol("RecyclablePool");
const InPool = Symbol("InPool");

export function recyclable<T>(cls: Class<T>) {
	if (!cls[Recycled]) {
		cls[Recycled] = true;
		cls[RecyclablePool] = [];
	}

	const pool = cls[RecyclablePool] as T[];
	let obj: T;
	if (pool.length > 0) {
		obj = pool.pop() as any;
	} else
		obj = new cls() as any;

	typeof (<IRecyclable>obj).onUse === "function" && (<IRecyclable>obj).onUse();
	obj[InPool] = false;

	return obj;
}

function recycleOne(obj: IRecyclable) {
	if (!obj || typeof obj != "object" || obj[InPool]) return;

	const cls = obj.constructor;
	if (!cls || !cls[Recycled]) return;

	typeof obj.onRecycle === "function" && obj.onRecycle();
	obj[InPool] = true;

	const pool = cls[RecyclablePool];
	pool.push(obj);
}

export function recycle(...objs: any[]) {
	for (let i = 0; i < objs.length; i++) {
		recycleOne(objs[i]);
	}
}