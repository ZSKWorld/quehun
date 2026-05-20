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
		const ipInfos = this.data.ipInfos;
		if (ipInfos.length == 1) {
			this.setChooseServer(0);
		} else {
			this._lastIpIndex = $localDataMgr.getNum(ELocalDataKey.LastServer, -1);
			this.view.refresh(ipInfos.map(v => v.name), this._lastIpIndex);
		}
	}

	private onBtnLastServerClick() {
		this.setChooseServer(this._lastIpIndex);
	}

	private setChooseServer(index: number) {
		const { ipInfos, callback } = this.data;
		index = $mathUtil.clamp(index, 0, ipInfos.length - 1);
		this._ipIndex = index;
		$localDataMgr.setNum(ELocalDataKey.LastServer, this._ipIndex);
		callback(this._ipIndex);
		this.closeSelf();
	}
}