import { BaseDO } from "./BaseDO";

interface INextGameRecordList extends IReqNextGameRecordList {
	tag: ERecordTag;
}

class RecordLoader {
	private static readonly DefaultRequestCount = 10;

	type: ERecordTag;
	count: number; //rank删减乱斗之间之后的数量
	haveMore: boolean;
	uuids: Array<string> = [];
	duringLoad: boolean = false;

	/** 游标 */
	iterator: string = "";
	/** 游标过期时间 */
	expireTime: number = 0;
	/** 游标请求的开始时间 */
	startTime: number = 0;
	/** 游标请求的结束时间 */
	endTime: number = 0;
	/** 游标请求的下一批数据的开始时间 */
	nextEndTime: number = 0;
	/** 游标是否还可以请求到下一次数据 */
	hasNext: boolean = false;

	/** 本次加载请求已经获取到的数据数量 */
	private getDataCount: number = 0;

	constructor(type: ERecordTag) {
		this.type = type;
		this.reset();
	}

	reset() {
		this.count = 0;
		this.haveMore = true;
		this.uuids = [];
		this.duringLoad = false;
		this.iterator = "";
		this.expireTime = 0;
		this.startTime = 0;
		this.endTime = 0;
		this.nextEndTime = 0;
		this.hasNext = false;

	}

	loadList() {
		if (this.duringLoad) return;
		if (!this.haveMore) return;
		this.duringLoad = true;
		if (this.type == ERecordTag.Collect) {
			this.loadCollectList();
		} else {
			this.getDataCount = 0;
			this.loadOtherList();
		}
	}

	private loadCollectList() {
		let uuids: Array<string> = [];
		let _count: number = 0;
		for (let i: number = 0; i < 10; i++) {
			let index: number = this.count + i;
			if (index >= UI_PaiPu.collect_lsts.length) break;
			_count++;
			let uuid: string = UI_PaiPu.collect_lsts[index];
			if (!UI_PaiPu.record_map.get(uuid)) {
				uuids.push(uuid);
			}
			this.uuids.push(uuid);
		}
		if (uuids.length > 0) {
			app.Log.log(`[${ this.type } loadCollectList]request: ${ JSON.stringify(uuids) }`);
			app.NetAgent.sendReq2Lobby(ServerType.LOBBY, game.ERequest.fetchGameRecordsDetailV2, {
				uuid_list: uuids,
			}, (err, res: game.IResGameRecordsDetailV2) => {
				this.duringLoad = false;
				UI_PaiPu.Inst.onLoadStateChange(this.type, false);
				if (err || res['error']) {
					if (!UI_PaiPu.handlePaipuResponseError(res)) {
						UIMgr.Inst.showNetReqError(game.ERequest.fetchGameRecordsDetailV2, err, res);
					}

				} else {

					app.Log.log(`[${ this.type } loadCollectList]success: ${ JSON.stringify(res) }`);
					if (!res.entries || res.entries.length != uuids.length) {
						this.haveMore = false;
						UI_PaiPu.Inst.onLoadOver(this.type);
					} else {
						for (let i: number = 0; i < res.entries.length; i++) {
							let uuid: string = res.entries[i].uuid;
							if (!UI_PaiPu.record_map.has(uuid)) {

								UI_PaiPu.record_map.set(uuid, res.entries[i]);
							}
						}
						this.count += _count;
						if (this.count >= UI_PaiPu.collect_lsts.length) {
							this.haveMore = false;
							UI_PaiPu.Inst.onLoadOver(this.type);
						}
						UI_PaiPu.Inst.onLoadMoreLst(this.type, _count);
					}
				}
			});
		} else {
			this.duringLoad = false;
			this.count += _count;
			if (this.count >= UI_PaiPu.collect_lsts.length) {
				this.haveMore = false;
				UI_PaiPu.Inst.onLoadOver(this.type);
			}
			UI_PaiPu.Inst.onLoadMoreLst(this.type, _count);
		}
	}
	private loadOtherList() {
		// 判断是否需要创建新游标
		let needRequestIterator: boolean = false;
		let rqs: game.IReqGameRecordListV2 = {
			tag: this.type,
			begin_time: UI_PaiPu.Inst.filterData.begin_time,
			end_time: UI_PaiPu.Inst.filterData.end_time,
			ranks: UI_PaiPu.Inst.filterData.ranks,
			modes: UI_PaiPu.Inst.filterData.modes,
			max_hu_type: UI_PaiPu.Inst.filterData.max_hu_type,
			level_mode: this.type == EType.RANK ? UI_PaiPu.convertLevelMode(UI_PaiPu.Inst.filterData.level_mode) : []
		};
		//没有游标，需要创建游标
		if (this.iterator == "") {
			// console.log("iterator is empty");
			needRequestIterator = true;
		}
		//游标过期,根据上一次请求得到的数据的结尾时间，请求新游标
		else if (this.expireTime < (game.Tools.getServerTime() / 1000)) {
			// console.log("iterator is expire", this.iteratorExpireTime, game.Tools.getSecondTimeStamp());
			needRequestIterator = true;
			rqs.end_time = this.nextEndTime;
		}
		//游标走到最后，但是没有到达目标的请求时间，需要请求新游标
		else if (!this.hasNext && this.endTime > UI_PaiPu.Inst.filterData.end_time) {
			// console.log("iterator is end", this.iteratorServerEndTime, UI_PaiPu.Inst.filterData.end_time);
			needRequestIterator = true;
			rqs.end_time = this.nextEndTime;
		}
		if (needRequestIterator) {
			this.requestListIterator(rqs, new Laya.Handler(this, () => {
				this.requestListData();
			}));
		}
		else {
			this.requestListData();
		}
	}

	/**
	 * 请求当前列表的游标
	 */
	private requestListIterator(rqs: game.IReqGameRecordListV2, onComplete: Laya.Handler) {
		app.Log.log(`[${ this.type } requestListIterator]request: + ${ JSON.stringify(rqs) }`);
		app.NetAgent.sendReq2Lobby(ServerType.LOBBY, game.ERequest.fetchGameRecordListV2, rqs, (err, res: game.IResGameRecordListV2) => {


			if (err || res['error']) {
				// app.Log.log(`[${this.type} requestListIterator]fail:${JSON.stringify(err)}, ${JSON.stringify(res)}`);
				if (!UI_PaiPu.handlePaipuResponseError(res)) {
					UIMgr.Inst.showNetReqError(game.ERequest.fetchGameRecordListV2, err, res);
				}
				this.duringLoad = false;
				return;
			}
			app.Log.log(`[${ this.type } requestListIterator]success: ${ JSON.stringify(res) }`);

			this.iterator = res.iterator;
			this.expireTime = res.iterator_expire;
			// ==DevDebug Start==
			this.expireTime = game.Tools.getServerTime() / 1000 + 60 * 5;
			// ==DevDebug End==	
			this.startTime = res.actual_begin_time;
			this.endTime = res.actual_end_time;

			onComplete?.run();
		});
	}

	/**
	 * 获取非收藏列表数据
	 * @param tag 
	 * @param iterator 
	 * @param getCount 这里服务器会返回比请求的数量多的数据，所以目前这个数据不能用来判断是否有下一批数据，目前根据服务器的需求改为使用next字段来判断是否有下一批数据
	 */
	private requestListData(getCount: number = 10) {
		let rqs: game.IReqNextGameRecordList = {
			iterator: this.iterator,
			count: getCount,
		};

		app.Log.log(`[${ this.type } requestListData]request:  ${ JSON.stringify(rqs) }`);
		app.NetAgent.sendReq2Lobby(ServerType.LOBBY, game.ERequest.fetchNextGameRecordList, rqs, (err, res: game.IResNextGameRecordList) => {


			if (err || res['error']) {
				if (!UI_PaiPu.handlePaipuResponseError(res)) {
					UIMgr.Inst.showNetReqError(game.ERequest.fetchNextGameRecordList, err, res);
				}
				this.duringLoad = false;
				return;
			}
			app.Log.log(`[${ this.type } requestListData]success:  ${ JSON.stringify(res) }`);
			this.hasNext = res.next;
			this.nextEndTime = res.next_end_time;
			if (res.entries && res.entries.length > 0) {

				let list: Array<game.IRecordListEntry> = res.entries;
				this.count += list.length;
				for (let i: number = 0; i < list.length; i++) {
					let uuid: string = list[i].uuid;
					this.getDataCount++;
					this.uuids.push(uuid);
					if (!UI_PaiPu.record_map.has(uuid)) {
						UI_PaiPu.record_map.set(uuid, res.entries[i]);
					}
				}
			}
			let requestAgain: boolean = false;
			//如果数据不够，且有下一批数据，需要请求下一批数据(跨过了8.20会产生这种情况)
			if (this.getDataCount < getCount && res.next) {
				requestAgain = true;
			}

			if (!requestAgain) {
				this.duringLoad = false;
				UI_PaiPu.Inst.onLoadStateChange(this.type, false);
				if (this.getDataCount > 0) {
					this.haveMore = res.next;
					UI_PaiPu.Inst.onLoadMoreLst(this.type, this.getDataCount);

				} else {
					this.haveMore = false;
					UI_PaiPu.Inst.onLoadOver(this.type);
				}
			}
			else {

				let needCount = RecordLoader.DefaultRequestCount - this.getDataCount;
				this.requestListData(needCount);
			}
		});

	}
}

class RecordIteratorInfo {
	iterator: string = "";
	expireTime: number = 0;
	startTime: number = 0;
	endTime: number = 0;
	nextEndTime: number = 0;
	hasNext: boolean = true;

	fetchGameRecordListV2(type: ERecordTag, filter: IReqGameRecordListV2) {
		const info = this;
		// 判断是否需要创建新游标
		let needNewIterator = false;
		let endTime = filter.end_time;
		//没有游标，需要创建游标
		if (!info.iterator) {
			needNewIterator = true;
		}
		//游标过期,根据上一次请求得到的数据的结尾时间，请求新游标
		else if (info.expireTime < $timeUtil.second) {
			needNewIterator = true;
			endTime = info.nextEndTime;
		}
		//游标走到最后，但是没有到达目标的请求时间，需要请求新游标
		else if (!info.hasNext && info.endTime > filter.end_time) {
			needNewIterator = true;
			endTime = info.nextEndTime;
		}

		if (needNewIterator) {
			$netMgr.requests.fetchGameRecordListV2({
				tag: type,
				begin_time: filter.begin_time,
				end_time: endTime,
				ranks: filter.ranks,
				modes: filter.modes,
				max_hu_type: filter.max_hu_type,
				level_mode: type == 1 ? filter.level_mode.map(v => v == 5 ? 6 : v) : []
			});
		} else {
			this.fetchNextGameRecordList(type);
		}
	}

	fetchNextGameRecordList(type: ERecordTag, fetchCount: number = 10) {
		const req: INextGameRecordList = {
			tag: type,
			iterator: this.iterator,
			count: fetchCount,
		};
		$netMgr.requests.fetchNextGameRecordList(req);
	}

	reset() {
		this.iterator = "";
		this.expireTime = 0;
		this.startTime = 0;
		this.endTime = 0;
		this.nextEndTime = 0;
		this.hasNext = true;
	}
}

export class RecordDO extends BaseDO implements DO.IRecordDO {
	private _detailMap: KeyMap<IRecordListEntry> = {};
	private _collectList: ProtoObject<IRecordCollectedData>[] = [];
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

	private _recordIteratorInfos: RecordIteratorInfo[] = [
		new RecordIteratorInfo(), new RecordIteratorInfo(), new RecordIteratorInfo(),
		new RecordIteratorInfo(), new RecordIteratorInfo(),
	];

	get maxCollect() { return this._maxCollect; }
	get collectList() { return this._collectList; }

	loadRecord(type: ERecordTag) {
		if (type != ERecordTag.Collect) {
			const filter = this._filter;
			const info = this._recordIteratorInfos[type];
			info.fetchGameRecordListV2(type, filter);
		} else {

		}
	}

	getRecordDetail(uuid: string) {
		return this._detailMap[uuid];
	}

	getCollectBrief(uuid: string) {
		const collectList = this._collectList;
		for (let i = 0, n = collectList.length; i < n; i++) {
			if (collectList[i].uuid == uuid)
				return collectList[i];
		}
		return null;
	}

	addCollect(uuid: string, remarks: string = "") {
		const detail = this.getRecordDetail(uuid);
		if (!detail) return;
		if (this.getCollectBrief(uuid)) return;
		$netMgr.requests.addCollectedGameRecord({
			uuid: uuid,
			remarks: remarks,
			start_time: detail.start_time,
			end_time: detail.end_time,
		});
	}

	removeCollect(uuid: string) {
		if (!this.getCollectBrief(uuid)) return;
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

	@InjectNetEvent(ENetMessage.fetchCollectedGameRecordList)
	private onFetchCollectedGameRecordList(res: IResCollectedGameRecordList) {
		const { record_list, record_collect_limit } = $decodeProtoData(res);
		this._collectList = record_list;
		this._maxCollect = record_collect_limit;
	}

	@InjectNetEvent(ENetMessage.fetchGameRecordListV2)
	private onFetchGameRecordListV2(res: IResGameRecordListV2, req: IReqGameRecordListV2) {
		const info = this._recordIteratorInfos[req.tag];
		info.iterator = res.iterator;
		info.expireTime = res.iterator_expire;
		info.startTime = res.actual_begin_time;
		info.endTime = res.actual_end_time;
		info.fetchNextGameRecordList(req.tag);
	}


	@InjectNetEvent(ENetMessage.fetchNextGameRecordList)
	private onFetchNextGameRecordList(res: IResNextGameRecordList, req: INextGameRecordList) {
		const info = this._recordIteratorInfos[req.tag];

		info.hasNext = res.next;
		info.nextEndTime = res.next_end_time;

		if (res.entries && res.entries.length > 0) {

			let list = res.entries;
			this.count += list.length;
			for (let i: number = 0; i < list.length; i++) {
				let uuid: string = list[i].uuid;
				this.getDataCount++;
				this.uuid_list.push(uuid);
				if (!UI_PaiPu.record_map.has(uuid)) {
					UI_PaiPu.record_map.set(uuid, res.entries[i]);
				}
			}
		}
		let requestAgain: boolean = false;
		//如果数据不够，且有下一批数据，需要请求下一批数据(跨过了8.20会产生这种情况)
		if (this.getDataCount < fetchCount && res.next) {
			requestAgain = true;
		}

		if (!requestAgain) {
			this.duringload = false;
			UI_PaiPu.Inst.onLoadStateChange(this.type, false);
			if (this.getDataCount > 0) {
				this.have_more_paipu = res.next;
				UI_PaiPu.Inst.onLoadMoreLst(this.type, this.getDataCount);

			} else {
				this.have_more_paipu = false;
				UI_PaiPu.Inst.onLoadOver(this.type);
			}
		}
		else {

			let needCount = this.defaultRequestCount - this.getDataCount;
			this.requestListData(needCount);
		}
	}

	aaa() {
		$netMgr.requests.fetchGameRecordListV2;
		$netMgr.requests.fetchNextGameRecordList;

		$netMgr.requests.fetchGameRecordsDetailV2;

		$netMgr.requests.addCollectedGameRecord;
		$netMgr.requests.removeCollectedGameRecord;
		$netMgr.requests.changeCollectedGameRecordRemarks;

		$netMgr.requests.fetchGameRecord;
		$netMgr.requests.readGameRecord;
	}
}