import { GlobalInitialize } from "./GlobalInitializer";
import { InitContextCommand } from "./contextCommand/InitContextCommand";
import { NotifyConst } from "./core/common/NotifyConst";
import { ViewExtend } from "./core/ui/core/ViewExtend";
import { FGUIExtend } from "./engine/FGUIExtend";
import { FGUIRepair } from "./engine/FGUIRepair";
import { LayaExtend } from "./engine/LayaExtend";
import { LayaRepair } from "./engine/LayaRepair";

class Main {
	constructor() {
		this.init();
	}
	private async init() {
		await Laya.init(1920, 1080);
		document.body.style.backgroundColor = "#666666";
		// document.body.style.backgroundImage = `url(${ ResPath.TexturePath.Background })`;

		LayaRepair.repair();
		LayaExtend.extends();
		FGUIRepair.repair();
		FGUIExtend.extends();
		ViewExtend.extends();
		fgui.UIConfig.packageFileExtension = "zip";
		Laya.SpineTemplet.RuntimeVersion = "4.2";
		GlobalInitialize();

		Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
		Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
		Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
		Laya.Config.defaultFont = ResPath.FontName.Font08;
		fgui.UIConfig.defaultFont = ResPath.FontName.Font08;
		Laya.InputManager.multiTouchEnabled = false;
		Laya.stage.on(Laya.Event.VISIBILITY_CHANGE, this, () => {
			if (Laya.stage.isVisibility) facade.dispatch(NotifyConst.OnGameShow);
			else facade.dispatch(NotifyConst.OnGameHide);
		});

		facade.registerCommand(NotifyConst.InitContext, InitContextCommand);
		facade.dispatch(NotifyConst.InitContext);
	}
}

//激活启动类
new Main();
