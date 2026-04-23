declare function RDTriggerEvent(eventName: ERDTriggerType): MethodDecorator;

declare interface IRedDotNode {
	readonly id: number;
	enable: boolean;
	parent: IRedDotNode;
	children: ReadonlyArray<IRedDotNode>;
	triggers: ERDTriggerType[];
	comp: fgui.GComponent;
	refresh(): void;
	trigger(): void;
	addChild(child: IRedDotNode): void;
	getChild(id: number): IRedDotNode;
	removeChild(id: number): IRedDotNode;
	removeSelf(): void;
	recover(): void;
}

declare type IRDRegisterInfo = [ERDName, ERDName?, string?, ERDTriggerType[]?];
declare interface IRDRegister {
	/** [name, parentName, path, triggers] */
	get rdInfos(): IRDRegisterInfo[];
}

declare interface IRedDotManager {
	/** 红点检测事件监听器 */
	get checkListener(): Laya.EventDispatcher;
	/** 红点刷新事件监听器 */
	get triggerListener(): Laya.EventDispatcher;
	setTriggered(type: ERDTriggerType, triggered: boolean | number): void;
}