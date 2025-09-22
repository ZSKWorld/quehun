"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuLibPackage_CopyResPath = void 0;
const MenuBase_Lib_Package_1 = require("../MenuBase_Lib_Package");
class MenuLibPackage_CopyResPath extends MenuBase_Lib_Package_1.MenuBase_Lib_Package {
    InitMenuData() {
        const menuData = this.menuData;
        menuData.text = "复制图片路径";
        menuData.onSelected = () => this.OnSelected();
    }
    OnCreate() {
    }
    OnDestroy() {
    }
    OnSelected() {
        // const targetRES = CS.FairyEditor.App.libView.GetSelectedResource();
        // EditorUtils.CopyItemPathes(targetRES.owner.items);
    }
}
exports.MenuLibPackage_CopyResPath = MenuLibPackage_CopyResPath;
