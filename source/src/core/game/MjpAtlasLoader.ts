import { Observer } from "../mvc/provider/Observer";

/** 
 * 麻将牌背&牌面图集资源加载器
 */
@SingletonClass
export class MjpAtlasLoader extends Observer {
	static readonly Inst: MjpAtlasLoader;

	private _mjpBack: number;
	private _mjpFront: number;
	private _tableCloth: number;

	init() {

	}

	@InjectUserEvent(EUserEvent.OnMjpBackUseChanged)
	private onMjpBackUseChanged() {
		const oldBack = this._mjpBack;
		const mjpBack = $user.commonView.curMjpBack;
		if (mjpBack == oldBack) return;

		const oldInfo = $itemUtil.getItemInfo(oldBack);
		$loadMgr.cancelLoadByUrl(oldInfo.atlasPath);
		$loadMgr.cancelLoadByUrl(oldInfo.atlasTexPath);
		$loadMgr.clearRes(oldInfo.atlasPath);
		$loadMgr.clearRes(oldInfo.atlasTexPath);

		this._mjpBack = mjpBack;
		const newInfo = $itemUtil.getItemInfo(mjpBack);
		$loadMgr.load(newInfo.atlasPath);
	}

	@InjectUserEvent(EUserEvent.OnMjpFrontUseChanged)
	private onMjpFrontUseChanged() {
		const oldFront = this._mjpFront;
		const mjpFront = $user.commonView.curMjpFront;
		if (mjpFront == oldFront) return;

		const oldInfo = $itemUtil.getItemInfo(oldFront);
		$loadMgr.cancelLoadByUrl(oldInfo.atlasPath);
		$loadMgr.cancelLoadByUrl(oldInfo.atlasTexPath);
		$loadMgr.clearRes(oldInfo.atlasPath);
		$loadMgr.clearRes(oldInfo.atlasTexPath);

		this._mjpFront = mjpFront;
		const newInfo = $itemUtil.getItemInfo(mjpFront);
		$loadMgr.load(newInfo.atlasPath);
	}

	@InjectUserEvent(EUserEvent.OnTableClothUseChanged)
	private onTableClothUseChanged() {
		const oldTableCloth = this._tableCloth;
		const tableCloth = $user.commonView.curTableCloth;
		if (tableCloth == oldTableCloth) return;

		this._tableCloth = tableCloth;
	}
}