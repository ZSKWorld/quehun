import { MenuManager } from "../core/common/contextMenu/MenuManager";
import { AudioManager } from "../core/common/manager/AudioManager";
import { LoadManager } from "../core/common/manager/LoadManager";
import { LocalDataManager } from "../core/common/manager/LocalDataManager";
import { SkeletonManager } from "../core/common/skeleton/SkeletonManager";
import { SpineManager } from "../core/common/spine/SpineManager";
import { GameUtil } from "../core/common/utils/GameUtil";
import { ItemUtil } from "../core/common/utils/ItemUtil";
import { MathUtil } from "../core/common/utils/MathUtil";
import { TimeUtil } from "../core/common/utils/TimeUtil";
import { ConfigManager } from "../core/config/ConfigManager";
import { GameManager } from "../core/game/GameManager";
import { Command } from "../core/mvc/controller/Command";
import { Facade } from "../core/mvc/Facade";
import { NetManager } from "../core/net/NetManager";
import { PbManager } from "../core/net/PbManager";
import { DynamicResManager } from "../core/ui/core/DynamicResManager";
import { UIManager } from "../core/ui/core/UIManager";
import { RedDotManager } from "../core/ui/redDot/RedDotManager";
import { RichText } from "../core/ui/core/RichText";
import { TipManager } from "../core/ui/core/TipManager";
import { UIUtil } from "../core/ui/core/UIUtil";
import { UserDO } from "../data/user/UserDO";
import { SceneManager } from "../scene/SceneManager";

export class InitGlobalCommand extends Command {
	override execute(notifyName: string, data?: any) {
		$windowImmit("$gameUtil", new GameUtil());
		$windowImmit("$localDataMgr", new LocalDataManager());
		$windowImmit("$facade", new Facade());
		$windowImmit("$uiUtil", new UIUtil());
		$windowImmit("$itemUtil", new ItemUtil());
		$windowImmit("$netMgr", new NetManager());
		$windowImmit("$timeUtil", new TimeUtil());
		$windowImmit("$uiMgr", new UIManager());
		$windowImmit("$pbMgr", new PbManager());
		$windowImmit("$user", new UserDO());
		$windowImmit("$tipMgr", new TipManager());
		$windowImmit("$mathUtil", new MathUtil());
		$windowImmit("$loadMgr", new LoadManager());
		$windowImmit("$gameMgr", new GameManager());
		$windowImmit("$cfgMgr", new ConfigManager());
		$windowImmit("$audioMgr", new AudioManager());
		$windowImmit("$spineMgr", new SpineManager());
		$windowImmit("$sceneMgr", new SceneManager());
		$windowImmit("$redDotMgr", new RedDotManager());
		$windowImmit("$skeletonMgr", new SkeletonManager());
		$windowImmit("$dynamicResMgr", new DynamicResManager());
		$windowImmit("$menuMgr", new MenuManager());

		this.registerConfirm("$confirmBig", EViewID.UIConfirmBigView);
		this.registerConfirm("$confirmMid", EViewID.UIConfirmMiddleView);
		this.registerConfirm("$confirmSma", EViewID.UIConfirmSmallView);

		$windowImmit("$lang", function (id: number, ...args: any[]) {
			const d_excel = $cfgMgr.str.str[id];
			let s = "";
			if (d_excel) {
				s = d_excel[$gameMgr.language];
				if (args) {
					for (let i = 0; i < args.length; i++) {
						s = s.replaceAll(`{${ i }}`, args[i]);
					}
				}
			}
			return s;
		});

		$windowImmit("$langNet", function (id: number, ...args: any[]) {
			const d_excel = $cfgMgr.info.error[id];
			let s = "";
			if (d_excel) {
				s = d_excel[$gameMgr.language];
				if (args) {
					for (let i = 0; i < args.length; i++) {
						s = s.replaceAll(`{${ i }}`, args[i]);
					}
				}
			}
			return s;
		});

		$windowImmit("$langRes", function (url: string) {
			if (!url) return url;
			const prefix = EConstDefine.LangResDir + $gameMgr.language + "/";
			if (url.startsWith(prefix)) return url;
			return prefix + url;
		});

		$windowImmit("$showNetError", function (error: IError) {
			if (!error) return;
			const code = error.code;
			const errStr = $langNet(code) || $lang(2068);
			$confirmSma(2, errStr);
		});

		$windowImmit("$richText", function (text: string = "") {
			return Laya.Pool.createByClass(RichText).start(text);
		});

		$windowImmit("$decodeProtoData", function (data: IProto | IProto[]) {
			if (!data) return data;
			if (Array.isArray(data))
				return data.map($decodeProtoData);
			const type = data.$type;
			if (!type) return data;
			const result: ProtoObject<IProto> = {};
			type.fieldsArray.forEach(v => {
				const value = data[v.name];
				result[v.name] = $decodeProtoData(value);
			});
			return result;
		});
	}

	private registerConfirm(name: string, viewId: EUIViewID) {
		$windowImmit(name, function (format: number, content: string, title = "") {
			if (!fgui.UIPackage.getByName(ResPath.EPkgName.PkgCommon))
				return $gameMgr.showConfirm(content);
			$windowImmit(name, (format: 0 | 1 | 2 | 3, content: string, title = "") => new Promise<boolean>(resolve => {
				$uiMgr.openView<IUIConfirmData>(viewId, {
					format,
					title,
					content,
					onConfirm: Laya.Handler.create(null, resolve, [true]),
					onCancel: Laya.Handler.create(null, resolve, [false]),
				});
			}));
			return window[name](format, content, title);
		});
	}
}