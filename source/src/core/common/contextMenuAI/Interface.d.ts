declare interface IMenuItem {
	title: string;
	icon?: string;
	callback?: Function;
	children?: IMenuItem[]; // 子菜单数据
	isSeparator?: boolean;
}

declare interface IMenuPanel {
	init(data: IMenuItem[], onSelect: (item: IMenuItem) => void): void;
	show(x: number, y: number): void;
	dispose(): void;
}

declare interface IContextMenuManager {
	bindMenu(target: fgui.GObject, data: IMenuItemData[]): IContextMenu;
	unbindMenu(target: fgui.GObject): void;
}