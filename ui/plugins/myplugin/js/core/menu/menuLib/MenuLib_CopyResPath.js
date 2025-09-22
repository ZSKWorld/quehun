"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuLib_CopyResPath = void 0;
const MenuBase_Lib_1 = require("../MenuBase_Lib");
class MenuLib_CopyResPath extends MenuBase_Lib_1.MenuBase_Lib {
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
exports.MenuLib_CopyResPath = MenuLib_CopyResPath;
