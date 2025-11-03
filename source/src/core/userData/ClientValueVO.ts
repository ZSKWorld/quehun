import { BaseVO } from "./BaseVO";

export class ClientValueVO extends BaseVO implements VO.IClientValueVO {
	private _data: ProtoObject<IResClientValue_Value>[] = [];
	private _rechargeCount: number = 0;

	get data() { return this._data; }
	get rechargeCount() { return this._rechargeCount; }

	@InterestMessage(EMessageID.fetchClientValue)
	private onFetchClientValue(res: IResClientValue) {
		const decodeRes = this.decodeProtoData(res);
		this._data = decodeRes.datas;
		this._rechargeCount = decodeRes.recharged_count;
	}
}