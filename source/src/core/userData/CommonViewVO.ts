import { BaseVO } from "./BaseVO";

export class CommonViewVO extends BaseVO implements VO.ICommonViewVO {
	private _use: number = 0;
	private _views: ProtoObject<IResAllcommonViews_Views>[] = [];

	get use() { return this._use; }
	get views() { return this._views; }

	@InterestMessage(EMessageID.fetchAllCommonViews)
	private onFetchClientValue(res: IResAllcommonViews) {
		const decodeRes = $decodeProtoData(res);
		this._use = decodeRes.use;
		this._views = decodeRes.views;
	}
}