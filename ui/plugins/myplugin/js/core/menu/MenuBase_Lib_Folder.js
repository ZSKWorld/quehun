"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuBase_LibFolder = void 0;
const MenuBase_1 = require("./MenuBase");
/** 以 “资源库菜单” 做父菜单的菜单，继承该类的菜单都会出现在 “资源库菜单” 选项中 */
class MenuBase_LibFolder extends MenuBase_1.MenuBase {
    constructor() {
        super(CS.FairyEditor.App.libView.contextMenu_Folder);
        this.menuData.atIndex = MenuBase_LibFolder.atIndex++;
    }
    static AddSeperator() {
        CS.FairyEditor.App.libView.contextMenu_Folder.AddSeperator(MenuBase_LibFolder.atIndex);
    }
}
exports.MenuBase_LibFolder = MenuBase_LibFolder;
MenuBase_LibFolder.atIndex = 0;
