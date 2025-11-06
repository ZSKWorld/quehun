declare interface Object {
	/** 对象类名 */
	$name: string;
}

declare interface Array<T> {
	/** 最后一个元素 */
	get last(): T;
	/** 打乱数组 */
	upset(): this;
	/** 删除元素 */
	remove(value: T): void;
	/** 添加唯一值 */
	pushUnique(value: T): void;
}

declare interface StringConstructor {
	format(template: string, ...args: any[]): string;
}