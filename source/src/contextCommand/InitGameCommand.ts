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
		ShaderManager.init();
		MjpAtlasLoader.Inst.init();

		const [ipConfig] = await Promise.all([
			$loadMgr.fetch(ResPath.EConfigPath.IPConfig, Laya.Loader.JSON),
			$loadMgr.loadPackage([ResPath.EPkgPath.PkgCommon, ResPath.EPkgPath.PkgEntrance]),
			$loadMgr.load([ResPath.EFontPath.HYWH, ResPath.EFontPath.Fengyu, ResPath.EFontPath.HYYANKAIW]),
		]);
		ipConfig.ip.forEach(v => (v.zone_ids = v.zone_ids || []));

		const ipIndex = await new Promise<number>(resolve => {
			$uiMgr.openView<IUIChooseServerData>(EViewID.UIChooseServerView, { ipConfig, callback: resolve });
		});

		await $gameMgr.init(ipIndex, ipConfig);

		$uiMgr.openView(EViewID.UIEntranceView);

		await Promise.all([
			$pbMgr.init(),
			$cfgMgr.init(),
			$netMgr.init(),
			$spineMgr.init(),
		]);

		$netMgr.connectLobby();

		$facade.dispatch(ENotifyConst.OnInitGameCompleted);
	}
}