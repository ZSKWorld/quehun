"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuLibFolder_CopyResPath = void 0;
const MenuBase_Lib_Folder_1 = require("../MenuBase_Lib_Folder");
class MenuLibFolder_CopyResPath extends MenuBase_Lib_Folder_1.MenuBase_LibFolder {
    InitMenuData() {
        const menuData = this.menuData;
        menuData.text = "复制路径";
        menuData.onSelected = () => this.OnSelected();
    }
    OnCreate() {
    }
    OnDestroy() {
    }
    OnSelected() {
        const items = CS.FairyEditor.App.libView.GetSelectedResource();
        CS.FairyEditor.Clipboard.SetText(`"${items.file.replace(/\\/g, "/")}";`);
    }
}
exports.MenuLibFolder_CopyResPath = MenuLibFolder_CopyResPath;
