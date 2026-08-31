declare interface Object {
	/** 对象类名 */
	$name: string;
}

declare interface Array<T> {
	/** 第一个元素 */
	get first(): T;
	/** 最后一个元素 */
	get last(): T;
	/** 打乱数组 */
	upset(): this;
	/** 随机一个元素 */
	random(): T;
	/** 删除元素 */
	remove(value: T): void;
	/** 添加唯一值 */
	pushUnique(value: T): void;
	/** 清除数组 */
	clear(): void;
}

declare interface String {
	split2Num(sign: string): number[];
}

declare interface StringConstructor {
	format(template: string, ...args: any[]): string;
}