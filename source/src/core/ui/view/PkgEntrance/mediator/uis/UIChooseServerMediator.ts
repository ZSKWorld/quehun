import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIChooseServerMsg, UIChooseServerView } from "../../view/uis/UIChooseServerView";

export class UIChooseServerMediator extends MediatorBase<UIChooseServerView, IUIChooseServerData> {
	private _ipIndex: number;
	private _lastIpIndex: number;

	override onAwake() {
		this.addEvent(EUIChooseServerMsg.OnListServerClick, this.setChooseServer);
		this.addEvent(EUIChooseServerMsg.OnBtnLastServerClick, this.onBtnLastServerClick);
	}

	override onEnable() {
		const ipConfig = this.data.ipConfig;
		if (ipConfig.ip.length == 1) {
			this.setChooseServer(0);
		} else {
			this._lastIpIndex = $localDataMgr.get(ELocalDataKey.LastServer, -1);
			this.view.refresh(ipConfig.ip.map(v => v.name), this._lastIpIndex);
		}
	}

	private onBtnLastServerClick() {
		this.setChooseServer(this._lastIpIndex);
	}

	private setChooseServer(index: number) {
		const { ipConfig, callback } = this.data;
		index = $mathUtil.clamp(index, 0, ipConfig.ip.length - 1);
		this._ipIndex = index;
		$localDataMgr.set(ELocalDataKey.LastServer, this._ipIndex);
		callback(this._ipIndex);
		this.closeSelf();
	}
}