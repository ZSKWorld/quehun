import { Observer } from "../mvc/provider/Observer";

@Singleton
export class AFKManager extends Observer {
	static readonly Inst: AFKManager;
	private _lastTime = $timeUtil.second;
	private _lastMousePoint = new Laya.Point();

	init() {
		Laya.timer.loop(1000, this, this.secondCheckLoop);
	}

	private secondCheckLoop() {
		if (!$netMgr.lobbyConnected) return;
		const { _lastTime, _lastMousePoint } = this;
		const t = $timeUtil.second - _lastTime;

		const mousePoint = Laya.stage.getMousePoint();
		if (mousePoint.x != _lastMousePoint.x || mousePoint.y != _lastMousePoint.y) {
			this._lastTime = $timeUtil.second;
			_lastMousePoint.setTo(mousePoint.x, mousePoint.y);
		}

		$localDataMgr.setNum(ELocalDataKey.MultiLogin, $timeUtil.second);

		//50分钟无操作就断线
		if (t >= 3000) {
			$gameMgr.exitGame(false, 2329);
		}
	}
}
