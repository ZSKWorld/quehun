import { MjpAtlasLoader } from "../core/game/MjpAtlasLoader";
import { Command } from "../core/mvc/controller/Command";
import { ShaderManager } from "../core/shader/ShaderManager";


export class InitGameCommand extends Command {
	override async execute(notifyName: string, data?: any) {
		Laya.Stat.show(0, 0, [
			Laya.StatElement.CT_FPS,
			Laya.StatElement.T_Frame_Time,
			Laya.StatElement.CT_DrawCall,
			Laya.StatElement.CT_OpaqueDrawCall,
			Laya.StatElement.CT_TransDrawCall,
			Laya.StatElement.CT_Triangle,
			Laya.StatElement.C_Sprite2DCount,
			Laya.StatElement.C_Sprite3DCount,
			Laya.StatElement.M_AllTexture,
			Laya.StatElement.M_GPUBuffer,
			Laya.StatElement.M_GPUMemory,
			Laya.StatElement.M_RenderTexture,
		]);

		const stage = Laya.stage;
		const onResize = () => {
			Laya.Stat._statUI._sp.pos(0, stage.height - Laya.Stat._statUI._sp.height);
		};
		onResize();
		stage.on(Laya.Event.RESIZE, this, onResize);

		ShaderManager.Inst.init();
		MjpAtlasLoader.Inst.init();

		const [config] = await Promise.all([
			$loadMgr.fetch<IConfig>(ResPath.EConfigPath.GameConfig, Laya.Loader.JSON),
			$loadMgr.loadPackage([ResPath.EPkgPath.PkgCommon, ResPath.EPkgPath.PkgEntrance]),
			$loadMgr.load([ResPath.EFontPath.HYWH, ResPath.EFontPath.Fengyu, ResPath.EFontPath.HYYANKAIW]),
		]);
		config.ip.forEach(v => (v.zone_ids = v.zone_ids || []));

		const ipIndex = await new Promise<number>(resolve => {
			$uiMgr.openView<IUIChooseServerData>(EViewID.UIChooseServerView, { ipInfos: config.ip, callback: resolve });
		});

		$gameMgr.init(ipIndex, config);

		$uiMgr.openView(EViewID.UIEntranceView);

		await Promise.all([
			$pbMgr.init(),
			$cfgMgr.init(),
			$netMgr.init(),
			$spineMgr.init(),
		]);

		$netMgr.connectLobby();

		$facade.dispatch(EGlobalEvent.OnInitGameCompleted);
	}
}