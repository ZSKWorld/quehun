
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