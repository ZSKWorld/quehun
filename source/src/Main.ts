import { InitContextCommand } from "./contextCommand/InitContextCommand";
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
		Laya.Config.FPS = 100;
		await Laya.init(1920, 1080);
		document.body.style.backgroundColor = "#000000";
		document.body.style.backgroundImage = `url(${ ResPath.ETexturePath.JPG_Background })`;

		LayaRepair.repair();
		LayaExtend.extends();
		FGUIRepair.repair();
		FGUIExtend.extends();
		ViewExtend.extends();
		fgui.UIConfig.packageFileExtension = "zip";
		Laya.SpineTemplet.RuntimeVersion = "4.2";

		Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
		Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
		Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
		Laya.Config.defaultFont = ResPath.EFontName.HYWH;
		Laya.InputManager.multiTouchEnabled = false;

		Laya.stage.on(Laya.Event.VISIBILITY_CHANGE, this, () => {
			if (Laya.stage.isVisibility) $facade.dispatch(ENotifyConst.OnGameShow);
			else $facade.dispatch(ENotifyConst.OnGameHide);
		});
		new InitContextCommand().execute("");
	}
}

//激活启动类
new Main();
