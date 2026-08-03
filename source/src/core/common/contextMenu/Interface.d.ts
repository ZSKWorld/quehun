declare interface IMenuItem {
	title: string;
	icon?: string;
	children?: IMenuItem[]; // 子菜单数据
	isSeparator?: boolean;
	onClick?: () => void;
}

declare interface IMenuPanel {
	get view(): fgui.GObject;
	show(x: number, y: number): void;
	checkHit(target: Laya.Node): boolean;
	hide(): void;
	recover(): void;
}

declare interface IContextMenuManager {
	bindMenu(target: fgui.GObject, data: IMenuItem[]): IMenuPanel;
	unbindMenu(target: fgui.GObject): void;
}