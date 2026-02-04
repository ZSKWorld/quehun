import { BaseVO } from "./BaseVO";

export class ClientValueVO extends BaseVO implements VO.IClientValueVO {
	private _data: KeyMap<number> = {};
	private _rechargeCount: number = 0;

	get rechargeCount() { return this._rechargeCount; }

	getValue(key: EClientValueType) {
		return this._data[key];
	}

	setValue(key: EClientValueType, value: number) {
		if (this._data[key] === value) return;
		this._data[key] = value;
		this.dispatch(EUserEvent.OnClientValueChanged, key);
		$netMgr.requests.updateClientValue({ key, value });
	}

	@InterestMessage(EMessageID.fetchClientValue)
	private onFetchClientValue(res: IResClientValue) {
		const decodeRes = $decodeProtoData(res);
		decodeRes.datas.forEach(v => {
			this._data[v.key] = v.value;
		});
		this._rechargeCount = decodeRes.recharged_count;
	}
}