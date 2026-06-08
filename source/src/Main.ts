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
		// Laya.Config.FPS = 100;
		Laya.SpineConst.VERSION = "4.2";
		Laya.SpineConst.PREMULTIPLIED_ALPHA_DEFAULT = true;
		Laya.InputManager.multiTouchEnabled = false;
		Laya.Config.defaultFont = ResPath.EFontName.HYWH;

		fgui.UIConfig.packageFileExtension = "zip";

		LayaRepair.repair();
		LayaExtend.extends();
		FGUIRepair.repair();
		FGUIExtend.extends();
		ViewExtend.extends();

		document.body.style.backgroundColor = EColorString._000000;
		document.body.style.backgroundImage = `url(${ ResPath.ETexturePath.JPG_Background })`;

		await Laya.init({
			designWidth: 1920,
			designHeight: 1080,
			scaleMode: Laya.Stage.SCALE_SHOWALL,
			screenMode: Laya.Stage.SCREEN_NONE,
			alignV: Laya.Stage.ALIGN_MIDDLE,
			alignH: Laya.Stage.ALIGN_CENTER,
			backgroundColor: EColorString._000000,
		});

		Laya.stage.on(Laya.Event.VISIBILITY_CHANGE, this, () => {
			if (Laya.stage.isVisibility) $facade.dispatch(EGlobalEvent.OnGameShow);
			else $facade.dispatch(EGlobalEvent.OnGameHide);
		});
		new InitContextCommand().execute("");
	}
}

//激活启动类
new Main();
