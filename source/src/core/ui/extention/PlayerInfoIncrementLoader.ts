
/** 玩家信息增量加载器，eg:排行榜玩家信息 */
export class PlayerInfoIncrementLoader<T extends { account_id: number }> {
	intro: T[];
	private _briefs: IPlayerBaseView[] = [];
	get briefs(): ReadonlyArray<IPlayerBaseView> { return this._briefs; }

	private _curLoadId = 0;
	private _isLoading = false;
	private _loadedAll = false;
	private _loadSize = 20;
	private _onLoaded: Laya.Handler;

	constructor(onLoaded: Laya.Handler, loadSize = 20) {
		this._onLoaded = onLoaded;
		this._loadSize = loadSize;
	}

	loadNext() {
		if (this._isLoading || this._loadedAll || !this.intro || this.intro.length === 0)
			return;

		const totalCount = this.intro.length;
		const currentCount = this._briefs.length;

		if (currentCount >= totalCount) {
			this._loadedAll = true;
			return;
		}

		const nextBatchIds = this.intro
			.slice(currentCount, currentCount + this._loadSize)
			.map(item => item.account_id);

		if (nextBatchIds.length > 0) {
			this._isLoading = true;
			this._curLoadId++;
			const loadId = ++this._curLoadId;
			$netMgr.requests.fetchMultiAccountBrief({ account_id_list: nextBatchIds } as any).then((res) => {
				if (loadId != this._curLoadId) return;

				this._isLoading = false;
				this._briefs.push(...(res.players || []));

				// 如果返回数量少于请求数量，说明后端也没数据了
				if (!res.players || res.players.length < this._loadSize)
					this._loadedAll = true;

				this._onLoaded?.run();
			});
		}
	}

	reset() {
		this.intro = null;
		this._briefs.length = 0;
		this._isLoading = false;
		this._curLoadId++;
		this._loadedAll = false;
	}
}