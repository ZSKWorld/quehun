import { Command } from "../core/mvc/controller/Command";
import { ShaderManager } from "../core/shader/ShaderManager";

interface IGameConfig {
	readonly stat: boolean;
	readonly released: boolean;
}

export class InitGameCommand extends Command {
	override execute(notifyName: string, data?: any) {
		ShaderManager.init();
		$uiMgr.init();
		$redDotMgr.init();
		this.load();
	}

	private async load() {
		const config: IGameConfig = await $loadMgr.fetch(ResPath.EUnclassifiedPath.Gameconfig, "json");
		config.stat && Laya.Stat.show(0, 0, [
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
		await $loadMgr.loadPackage(ResPath.EPkgPath.PkgEntrance);
		$uiMgr.openView(EViewID.UIEntranceView);
		await $gameMgr.init();
		await $pbMgr.init();
		await $cfgMgr.init();
		await $netMgr.init();
	}
}