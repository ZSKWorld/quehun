import { BaseVO } from "./BaseVO";

export class CommonViewVO extends BaseVO implements VO.ICommonViewVO {
	private _use: number = 0;
	private _views: ProtoObject<IResAllcommonViews_Views>[] = [];

	get use() { return this._use; }
	get views() { return this._views; }
	get curView() { return this._views.find(v => v.index == this._use); }

	@InterestMessage(EMessageID.fetchAllCommonViews)
	private onFetchClientValue(res: IResAllcommonViews) {
		const decodeRes = $decodeProtoData(res);
		this._use = decodeRes.use;
		this._views = decodeRes.views;
		this.fillDefaultView();
		this.fillDefaultSlot();
	}

	private fillDefaultView() {
		const { _views } = this;
		for (let i = 0; i < 10; i++) {
			const view = _views.find(v => v.index == i);
			if (view) continue;
			_views.push({
				index: i,
				name: String(i + 1),
				values: [],
			});
		}
		_views.sort((a, b) => a.index - b.index);
	}

	private fillDefaultSlot() {
		const defaultItems = [0, 0, 0, 0, 0, 0, 305501, 305044, 305045, 305725, 307001];
		const slotIds = [0, 1, 2, 10, 3, 4, 5, 6, 7, 13, 8];
		this._views.forEach(v => {
			const slots = v.values;
			slotIds.forEach((sid, si) => {
				const s = slots.find(s => s.slot == sid);
				if (s) return;
				slots.push({
					slot: sid,
					item_id: defaultItems[si],
					type: 0,
					item_id_list: [],
				});
			});
			slots.sort((a, b) => slotIds.indexOf(a.slot) - slotIds.indexOf(b.slot));
		});
	}
}