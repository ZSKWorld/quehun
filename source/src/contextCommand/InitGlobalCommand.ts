import { LoadManager } from "../core/common/manager/LoadManager";
import { LocalDataManager } from "../core/common/manager/LocalDataManager";
import { MathUtil } from "../core/common/math/MathUtil";
import { SkeletonManager } from "../core/common/skeleton/SkeletonManager";
import { SpineManager } from "../core/common/skeleton/SpineManager";
import { GameUtil } from "../core/common/utils/GameUtil";
import { TimeUtil } from "../core/common/utils/TimeUtil";
import { ConfigManager } from "../core/config/ConfigManager";
import { Command } from "../core/mvc/controller/Command";
import { Facade } from "../core/mvc/Facade";
import { NetManager } from "../core/net/NetManager";
import { PbManager } from "../core/net/PbManager";
import { UIManager } from "../core/ui/core/UIManager";
import { RedDotManager } from "../core/ui/redDot/RedDotManager";
import { RichText } from "../core/ui/tool/RichText";
import { TipManager } from "../core/ui/tool/TipManager";
import { UserData } from "../core/userData/UserData";
import { GameManager } from "../GameManager";
import { SceneManager } from "../scene/SceneManager";

export class InitGlobalCommand extends Command {
	override execute(notifyName: string, data?: any) {
		$windowImmit("$facade", Facade.Inst);
		$windowImmit("$netMgr", new NetManager());
		$windowImmit("$timeUtil", new TimeUtil());
		$windowImmit("$uiMgr", new UIManager());
		$windowImmit("$pbMgr", new PbManager());
		$windowImmit("$userData", new UserData());
		$windowImmit("$gameUtil", new GameUtil());
		$windowImmit("$tipMgr", new TipManager());
		$windowImmit("$mathUtil", new MathUtil());
		$windowImmit("$loadMgr", new LoadManager());
		$windowImmit("$gameMgr", new GameManager());
		$windowImmit("$cfgMgr", new ConfigManager());
		$windowImmit("$spineMgr", new SpineManager());
		$windowImmit("$sceneMgr", new SceneManager());
		$windowImmit("$redDotMgr", new RedDotManager());
		$windowImmit("$skeletonMgr", new SkeletonManager());
		$windowImmit("$localDataMgr", new LocalDataManager());

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
						const reg = new RegExp(`{${ i }}`, 'g');
						s = s.replace(reg, args[i]);
					}
				}
			}
			return s;
		});

		$windowImmit("$netLang", function (id: number, ...args: any[]) {
			const d_excel = $cfgMgr.info.error[id];
			let s = "";
			if (d_excel) {
				s = d_excel[$gameMgr.language];
				if (args) {
					for (let i = 0; i < args.length; i++) {
						const reg = new RegExp(`{${ i }}`, 'g');
						s = s.replace(reg, args[i]);
					}
				}
			}
			return s;
		});

		$windowImmit("$langRes", function (url: string) {
			return "langRes/" + $gameMgr.language + "/" + url;
		});

		$windowImmit("$showNetError", function (error: IError) {
			if (!error) return;
			const code = error.code;
			const errStr = $netLang(code) || $lang(2068);
			$confirmSma(2, "", errStr);
		})

		$windowImmit("$richText", function (text: string = "") {
			return Laya.Pool.createByClass(RichText).start(text);
		});

		$windowImmit("$decodeProtoData", function (data: IProto) {
			if (!data) return data;
			const type = data.$type;
			if (!type) return data;
			const result: ProtoObject<IProto> = {};
			type.fieldsArray.forEach(v => {
				const value = data[v.name];
				if (Array.isArray(value))
					result[v.name] = [...value.map(v1 => $decodeProtoData(v1))];
				else
					result[v.name] = $decodeProtoData(value);
			});
			return result;
		})
	}

	private registerConfirm(name: string, viewId: EViewID) {
		$windowImmit(name, function (format: number, title: string, content: string) {
			if (!fgui.UIPackage.getByName(ResPath.EPkgName.PkgCommon))
				return $gameMgr.showConfirm(content);
			$windowImmit(name, (format: number, title: string, content: string) => new Promise<boolean>(resolve => {
				$uiMgr.openView(viewId, {
					format,
					title,
					content,
					onConfirm: Laya.Handler.create(null, resolve, [true]),
					onCancel: Laya.Handler.create(null, resolve, [false]),
				});
			}));
			return window[name](format, title, content);
		});
	}
}