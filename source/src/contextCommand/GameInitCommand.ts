import { Command } from "../core/mvc/controller/Command";
import { ShaderManager } from "../core/shader/ShaderManager";

interface IGameConfig {
	readonly stat: boolean;
	readonly released: boolean;
}

export class GameInitCommand extends Command {
	override execute(notifyName: string, data?: any) {
		ShaderManager.init();
		$uiMgr.init();
		$redDotMgr.init();
		this.load();
	}

	private async load() {
		const config: IGameConfig = await $loadMgr.fetch(ResPath.EUnclassifiedPath.Gameconfig, "json");
		config.stat && Laya.Stat.show(0, 0, [
			Laya.Stat.FPSStatUIParams,
			Laya.Stat.NodeStatUIParams,
			Laya.Stat.Sprite3DStatUIParams,
			Laya.Stat.DrawCall,
			Laya.Stat.TriangleFace,
			Laya.Stat.GPUMemory,
			Laya.Stat.TextureMemeory,
			Laya.Stat.RenderTextureMemory,
			Laya.Stat.BufferMemory,
		]);
		await $loadMgr.loadPackage(ResPath.EPkgPath.PkgEntrance);
		$uiMgr.openView(EViewID.UIEntranceView);
		await $gameMgr.init();
		await $pbMgr.init();
		await $cfgMgr.init();
		await $netMgr.init();
	}
}