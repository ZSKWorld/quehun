import { Notifier } from "../../core/mvc/provider/Notifier";
import { BaseDO } from "./BaseDO";

class MakaDataDO implements DO.IMakaDataD0 {
	private _uuid: string = "";
	private _state: EMakaState = EMakaState.UnAnalysis;
	private _expire_time: number = 0;
	private _player_scores: ISeerScore[] = [];
	private _create_time: number = 0;

	get uuid() { return this._uuid; }
	get state() {
		if (this._expire_time < $timeUtil.second) {
			this._state = EMakaState.Expired;
		}
		return this._state;
	}
	get expire_time() { return this._expire_time; }
	get player_scores() { return this._player_scores; }
	get create_time() { return this._create_time; }

	constructor(data: ISeerBrief) {
		this.setBrief(data);
	}

	setBrief(data: ISeerBrief) {
		this._uuid = data.uuid;
		this._state = data.state;
		this._expire_time = data.expire_time;
		this._player_scores = data.player_scores.map(v => ({ seat: v.seat, rating: v.rating }));
		this._create_time = data.create_time;
		return this;
	}
}

class MakaDO extends BaseDO implements DO.IMakaDO {
	private static readonly CanAnalysisMode = { 1: true, 2: true, 11: true, 12: true };

	private _remainCount: number = 0;
	private _dateLimit: number = 0;
	private _expireTime: number = 0;
	private _makaDataMap: KeyMap<MakaDataDO> = {};
	private _analysisingId: string;

	get remainCount() {
		return this._remainCount;
	}
	get analysisingId() { return this._analysisingId; }

	init() {
		this.fetchInfo();
		$netMgr.requests.fetchSeerReportList();
	}

	canAnalysis(record: IRecordListEntry) {
		//TODO 判断维护模式
		const { uuid, players, tag, subtag, standard_rule } = record;
		const time = uuid.length == 43 ? +uuid.substring(0, 6) : 0;
		if (time < this._dateLimit) return false;

		const hasSelf = players.find(v => v.account_id == $user.account.accountId) != null;
		if (!hasSelf) return false;
		if (tag == 1) {
			const cfgMatchMode = $cfgMgr.desktop.matchmode[subtag];
			if (!cfgMatchMode || !MakaDO.CanAnalysisMode[cfgMatchMode.mode])
				return false;
		} else if (tag == 2 || tag == 4) {
			if (!MakaDO.CanAnalysisMode[subtag])
				return false;
		} else
			return false;

		if (standard_rule != 1) return false;

		return true;
	}

	getAnalysisData(uuid: string) {
		this.clearExpiredData();
		return this._makaDataMap[uuid];
	}

	analysisRecord(uuid: string) {
		this.clearExpiredData();
		if (this._makaDataMap[uuid]) return;
		this._analysisingId = uuid;
		$netMgr.requests.createSeerReport({ uuid }).then(res => {
			if (res.error || (res.seer_report.state == EMakaState.Analysised && res.seer_report.uuid == this._analysisingId))
				this._analysisingId = null;
		});
	}

	@InjectGlobalEvent(EGlobalEvent.OnPassDay)
	private fetchInfo() {
		$netMgr.requests.fetchSeerInfo();
	}

	private clearExpiredData() {
		const dataMap = this._makaDataMap;
		for (const key in dataMap) {
			const data = dataMap[key];
			if (data.state == EMakaState.Expired)
				delete dataMap[key];
		}
	}

	@InjectNetEvent(ENetMessage.fetchSeerInfo)
	private onFetchSeerInfo(res: IResFetchSeerInfo) {
		this._remainCount = res.remain_count;
		this._dateLimit = res.date_limit;
		this._expireTime = res.expire_time;
		this.dispatch(EUserEvent.OnRecordMakaChanged);
	}

	@InjectNetEvent(ENetMessage.fetchSeerReportList)
	private onFetchSeerReportList(res: IResFetchSeerReportList) {
		const list = $decodeProtoData(res.seer_report_list);
		const dataMap = this._makaDataMap;
		for (const v of list) {
			dataMap[v.uuid] = new MakaDataDO(v);
		}
		this.dispatch(EUserEvent.OnRecordMakaChanged);
	}

	@InjectNetEvent(ENetMessage.createSeerReport)
	private onCreateSeerReport(res: IResCreateSeerReport, req: IReqCreateSeerReport) {
		const report = $decodeProtoData(res.seer_report);
		this._makaDataMap[report.uuid] = new MakaDataDO(report);
		if (report.state == EMakaState.Analysised) {
			this._remainCount--;
			if (this._analysisingId == report.uuid)
				this._analysisingId = null;
		}
		this.dispatch(EUserEvent.OnRecordMakaChanged);
	}

	@InjectNetEvent(ENetNotify.NotifySeerReport)
	private onNotifySeerReport(res: INotifySeerReport) {
		const report = $decodeProtoData(res.report);
		this._makaDataMap[report.uuid] = new MakaDataDO(report);
		this._remainCount--;
		if (report.uuid == this._analysisingId)
			this._analysisingId = null;
		this.dispatch(EUserEvent.OnRecordMakaChanged);
	}
}

class RecordLoader extends Notifier {
	private static readonly DefaultRequestCount = 10;

	private readonly _tag: ERecordTag;
	private _haveMore: boolean = true;
	private _uuids: string[] = [];
	private _duringLoad: boolean = false;

	/** 游标 */
	private _iterator: string = "";
	/** 游标过期时间 */
	private _expireTime: number = 0;
	/** 游标请求的开始时间 */
	private _startTime: number = 0;
	/** 游标请求的结束时间 */
	private _endTime: number = 0;
	/** 游标请求的下一批数据的开始时间 */
	private _nextEndTime: number = 0;
	/** 游标是否还可以请求到下一次数据 */
	private _hasNext: boolean = false;

	get uuids() { return this._uuids; }

	constructor(type: ERecordTag) {
		super();
		this._tag = type;
		this.reset();
	}

	load() {
		if (this._duringLoad) return;
		if (!this._haveMore) return;
		if (this._tag == ERecordTag.Collect) {
			this.loadCollect();
		} else {
			this.loadOther();
		}
	}

	reset() {
		this._haveMore = true;
		this._uuids = [];
		this._duringLoad = false;
		this._iterator = "";
		this._expireTime = 0;
		this._startTime = 0;
		this._endTime = 0;
		this._nextEndTime = 0;
		this._hasNext = false;
	}

	private loadCollect() {
		const collectList = $user.record.collectBriefs;

		const idCount = this._uuids.length;
		const loadIds: string[] = [];
		const newIds: string[] = [];
		for (let i = 0; i < 10; i++) {
			const index = idCount + i;
			if (index >= collectList.length) break;
			const uuid = collectList[index].uuid;
			if (!$user.record.getRecordDetail(uuid)) {
				loadIds.push(uuid);
			}
			newIds.push(uuid);
		}
		if (loadIds.length > 0) {
			this._duringLoad = true;
			$netMgr.requests.fetchGameRecordsDetailV2({ uuid_list: loadIds, })
				.then(res => {
					this._duringLoad = false;
					if (res.error) return;
					const entries = res.entries;
					if (!entries || entries.length != loadIds.length) {
						this._haveMore = false;
					} else {
						this._uuids.push(...newIds);
						const collectList = $user.record.collectBriefs;
						if (this._uuids.length >= collectList.length) {
							this._haveMore = false;
						}
					}
					this.dispatch(EUserEvent.OnRecordChanged);
				});
		} else {
			this._uuids.push(...newIds);
			if (this._uuids.length >= collectList.length) {
				this._haveMore = false;
			}
			this.dispatch(EUserEvent.OnRecordChanged);
		}
	}
	private loadOther() {
		const filter = $user.record.filter;
		// 判断是否需要创建新游标
		let needNewIterator = false, endTime = filter.end_time;
		//没有游标，需要创建游标
		if (this._iterator == "") {
			// console.log("iterator is empty");
			needNewIterator = true;
		}
		//游标过期,根据上一次请求得到的数据的结尾时间，请求新游标
		else if (this._expireTime < $timeUtil.second) {
			// console.log("iterator is expire", this.iteratorExpireTime, game.Tools.getSecondTimeStamp());
			needNewIterator = true;
			endTime = this._nextEndTime;
		}
		//游标走到最后，但是没有到达目标的请求时间，需要请求新游标
		else if (!this._hasNext && this._endTime > filter.end_time) {
			// console.log("iterator is end", this.iteratorServerEndTime, UI_PaiPu.Inst.filterData.end_time);
			needNewIterator = true;
			endTime = this._nextEndTime;
		}
		if (needNewIterator) {
			this._duringLoad = true;
			$netMgr.requests.fetchGameRecordListV2({
				tag: this._tag,
				begin_time: filter.begin_time,
				end_time: endTime,
				ranks: filter.ranks,
				modes: filter.modes,
				max_hu_type: filter.max_hu_type,
				level_mode: this._tag == ERecordTag.Level ? filter.level_mode.map(v => v == 5 ? 6 : v) : [],
			}).then(res => {
				this._duringLoad = false;
				if (res.error) return;
				this._iterator = res.iterator;
				this._expireTime = res.iterator_expire;
				this._startTime = res.actual_begin_time;
				this._endTime = res.actual_end_time;
				this.fetchNextGameRecordList();
			});
		}
		else {
			this.fetchNextGameRecordList();
		}
	}

	/**
	 * 获取非收藏列表数据
	 * @param count 这里服务器会返回比请求的数量多的数据，所以目前这个数据不能用来判断是否有下一批数据，目前根据服务器的需求改为使用next字段来判断是否有下一批数据
	 */
	private fetchNextGameRecordList(count: number = 10, loadCnt: number = 0) {
		this._duringLoad = true;
		$netMgr.requests.fetchNextGameRecordList({ iterator: this._iterator, count, })
			.then(res => {
				this._duringLoad = false;
				if (res.error) return;
				const { next, next_end_time, entries } = res;
				this._hasNext = next;
				this._nextEndTime = next_end_time;
				if (entries && entries.length > 0) {
					loadCnt += entries.length;
					for (let i = 0; i < entries.length; i++) {
						this._uuids.push(entries[i].uuid);
					}
				}

				//如果数据不够，且有下一批数据，需要请求下一批数据(跨过了8.20会产生这种情况)
				const requestAgain = loadCnt < count && next;

				if (!requestAgain) {
					this._haveMore = loadCnt > 0 ? next : false;
				}
				else {
					const needCount = RecordLoader.DefaultRequestCount - loadCnt;
					this.fetchNextGameRecordList(needCount, loadCnt);
				}
				this.dispatch(EUserEvent.OnRecordChanged);
			});
	}
}

export class RecordDO extends BaseDO implements DO.IRecordDO {
	private _detailMap: KeyMap<IRecordListEntry> = {};
	private _collectBriefs: ProtoObject<IRecordCollectedData>[] = [];
	private _maxCollect: number = 0;
	private _filter: IReqGameRecordListV2 = {
		tag: 0,
		begin_time: 0,
		end_time: 0,
		ranks: [],
		modes: [],
		max_hu_type: 0,
		level_mode: []
	};
	private _maka = new MakaDO();

	private _recordLoaders: RecordLoader[] = [
		new RecordLoader(ERecordTag.All), new RecordLoader(ERecordTag.Level), new RecordLoader(ERecordTag.Friend),
		new RecordLoader(ERecordTag.Activity), new RecordLoader(ERecordTag.Match), new RecordLoader(ERecordTag.Collect),
	];

	get maxCollect() { return this._maxCollect; }
	get collectBriefs() { return this._collectBriefs; }
	get filter() { return this._filter; }
	get maka() { return this._maka; }

	loadRecord(type: ERecordTag) {
		this._recordLoaders[type].load();
	}

	resetLoader(type: ERecordTag) {
		this._recordLoaders[type].reset();
	}

	getRecordIds(type: ERecordTag) {
		return this._recordLoaders[type].uuids;
	}

	getRecordDetail(uuid: string) {
		return this._detailMap[uuid];
	}

	isCollect(uuid: string) {
		return this.getCollectBrief(uuid) != null;
	}

	getCollectBrief(uuid: string) {
		const collectList = this._collectBriefs;
		for (let i = 0, n = collectList.length; i < n; i++) {
			if (collectList[i].uuid == uuid)
				return collectList[i];
		}
		return null;
	}

	addCollect(uuid: string, remarks: string = "") {
		if (this.isCollect(uuid)) return;
		const detail = this.getRecordDetail(uuid);
		if (!detail) return;
		$netMgr.requests.addCollectedGameRecord({
			uuid: uuid,
			remarks: remarks,
			start_time: detail.start_time,
			end_time: detail.end_time,
		});
	}

	removeCollect(uuid: string) {
		if (!this.isCollect(uuid)) return;
		$netMgr.requests.removeCollectedGameRecord({
			uuid: uuid,
		});
	}

	changeCollectRemarks(uuid: string, remarks: string) {
		const brief = this.getCollectBrief(uuid);
		if (!brief) return;
		if (remarks == brief.remarks) return;
		$netMgr.requests.changeCollectedGameRecordRemarks({
			uuid: uuid,
			remarks: remarks
		});
	}

	@InjectNetEvent(ENetNotify.NotifyVipLevelChange)
	private onNotifyVipLevelChange(data: INotifyVipLevelChange) {
		this._maxCollect = data.record_collect_limit;
		this.dispatch(EUserEvent.OnRecordChanged);
	}

	@InjectNetEvent(ENetMessage.fetchCollectedGameRecordList)
	private onFetchCollectedGameRecordList(res: IResCollectedGameRecordList) {
		const { record_list, record_collect_limit } = $decodeProtoData(res);
		this._collectBriefs = record_list.sort((a, b) => b.end_time - a.end_time);
		this._maxCollect = record_collect_limit;
		this.dispatch(EUserEvent.OnRecordChanged);
	}

	@InjectNetEvent(ENetMessage.fetchNextGameRecordList)
	@InjectNetEvent(ENetMessage.fetchGameRecordsDetailV2)
	private onFetchGameRecordsDetailV2(res: IResGameRecordsDetailV2 | IResNextGameRecordList) {
		const entries = $decodeProtoData(res.entries);
		for (let i = 0; i < entries.length; i++) {
			const uuid = entries[i].uuid;
			this._detailMap[uuid] = entries[i];
		}
		this.dispatch(EUserEvent.OnRecordChanged);
	}

	@InjectNetEvent(ENetMessage.addCollectedGameRecord)
	private onAddCollectedGameRecord(res: IResAddCollectedGameRecord, req: IReqAddCollectedGameRecord) {
		if (this.isCollect(req.uuid)) return;
		this._collectBriefs.push({
			uuid: req.uuid,
			remarks: req.remarks,
			start_time: req.start_time,
			end_time: req.end_time,
		});
		this._collectBriefs.sort((a, b) => b.end_time - a.end_time);
		this.dispatch(EUserEvent.OnRecordChanged);
	}

	@InjectNetEvent(ENetMessage.removeCollectedGameRecord)
	private onRemoveCollectedGameRecord(res: IResRemoveCollectedGameRecord, req: IReqRemoveCollectedGameRecord) {
		const index = this._collectBriefs.findIndex(v => v.uuid == req.uuid);
		if (index == -1) return;
		this._collectBriefs.splice(index, 1);
		const loader = this._recordLoaders[ERecordTag.Collect];
		loader.uuids.remove(req.uuid);
		this.dispatch(EUserEvent.OnRecordChanged);
	}

	@InjectNetEvent(ENetMessage.changeCollectedGameRecordRemarks)
	private onChangeCollectedGameRecordRemarks(res: IResChangeCollectedGameRecordRemarks, req: IReqChangeCollectedGameRecordRemarks) {
		const brief = this.getCollectBrief(req.uuid);
		if (!brief) return;
		brief.remarks = req.remarks;
		this.dispatch(EUserEvent.OnRecordChanged);
	}
}