
declare namespace fgui {
	interface GObject {
		/** 设置本地化文本 */
		langText(id: number, ...args: any[]): void;
		tweenMove(endX: number, endY: number, duration: number): GTweener;
		tweenMoveX(endX: number, duration: number): GTweener;
		tweenMoveY(endY: number, duration: number): GTweener;
		tweenScale(endX: number, endY: number, duration: number): GTweener;
		tweenScaleX(endX: number, duration: number): GTweener;
		tweenScaleY(endY: number, duration: number): GTweener;
		tweenResize(endW: number, endH: number, duration: number): GTweener;
		tweenFade(endValue: number, duration: number): GTweener;
		tweenRotate(endValue: number, duration: number): GTweener;

		addComponentIntance<T extends Laya.Component>(component: T): T;
		addComponent<T extends Laya.Component>(componentType: Class<T>): T;
		getComponent<T extends Laya.Component>(componentType: Class<T>): T;
		getComponents<T extends Laya.Component>(componentType: Class<T>): T[];
		event(type: string, data?: any): boolean;
		once(type: string, caller: any, listener: Function, args?: any[]): Laya.EventDispatcher;
		offAll(type?: string): Laya.EventDispatcher;
		offAllCaller(caller: any): Laya.EventDispatcher;

		/**
		 * 给当前GObject添加用on注册的事件锁，为空则为全局锁。
		 * 全局锁 会阻止所有的事件触发， 而指定事件的锁只阻止指定的事件触发。全局锁和事件锁可以同时存在，所以只有全局锁和事件锁都移除才会触发事件
		 * @param type 事件名称
		 * @param lockChild 是否加锁子节点，默认true。 如果为true， 则子节点也会加对应事件锁
		 */
		addEventLock(type?: string, lockChild?: boolean): void;

		hasEventLock(type?: string): boolean;

		/**
		 * 移除当前GObject的事件锁，为空则移除全局锁
		 * @param type 事件名称
		 */
		removeEventLock(type?: string): void;

		/**移除所有事件锁 */
		removeAllEventLock(): void;
	}

	interface GComponent {
		addChild<T extends GObject>(child: T): T;
		addChildAt<T extends GObject>(child: T, index: number): T;
		removeChild<T extends GObject>(child: T, dispose?: boolean): T;
	}

	interface GTextInput {
		/** 设置本地化提示文本 */
		langPrompt(id: number, ...args: any[]): void;
	}
}