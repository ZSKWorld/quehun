declare interface IMenuItemData {
	title: string;
	icon?: string;
	disabled?: boolean;
	children?: IMenuItemData[];
	onClick?: () => void;
}

declare interface IContextMenu {
	init(root: fgui.GComponent, data: IMenuItemData[]): void;
	show(x: number, y: number): void;
	/**
	 * 
	 * @param ani default true
	 */
	close(): void;
}

declare interface IContextMenuManager {
	bindMenu(target: fgui.GObject, data: IMenuItemData[]): IContextMenu;
	unbindMenu(target: fgui.GObject): void;
}