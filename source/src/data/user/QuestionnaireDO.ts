import { BaseDO } from "./BaseDO";

export class QuestionnaireDO extends BaseDO implements DO.IQuestionnaireDO {
	private _list: IQuestionnaireBrief[] = [];
	private _finishedList: number[] = [];
	private _details: IQuestionnaireDetail[] = [];

	private get platform() { return $gameMgr.reqPlatform + ($gameMgr.clientType == EClientType.KR ? "_kr" : ""); }

	getBrief(type: EQuestionnaireType) {
		return this._list.find(v => {
			return v.type == type && v.effective_time_start <= $timeUtil.second && $timeUtil.second <= v.effective_time_end;
		});
	}

	fetchQuestionnaire() {
		return $netMgr.requests.fetchQuestionnaireList({
			lang: $gameMgr.language,
			channel: this.platform,
		}).then(res => {
			const detailList = res.list.filter(v => !this._finishedList.includes(v.id));
			return Promise.all(detailList.map(v => $netMgr.requests.fetchQuestionnaireDetail({
				id: v.id,
				lang: $gameMgr.language,
				channel: this.platform,
			})));
		});
	}

	@InjectNetEvent(ENetMessage.fetchQuestionnaireList)
	private onFetchQuestionnaireList(res: IResFetchQuestionnaireList) {
		const decodeRes = $decodeProtoData(res);
		this._list = decodeRes.list;
		this._finishedList = decodeRes.finished_list;
	}

	@InjectNetEvent(ENetMessage.fetchQuestionnaireDetail)
	private onFetchQuestionnaireDetail(res: IResFetchQuestionnaireDetail) {
		const detail = $decodeProtoData(res.detail);
		const index = this._details.findIndex(v => v.id == detail.id);
		if (index != -1) this._details[index] = detail;
		else this._details.push(detail);
	}
}