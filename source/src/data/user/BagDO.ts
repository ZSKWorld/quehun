import { BaseDO } from "./BaseDO";

export class BagDO extends BaseDO implements DO.IBagDO {
	private readonly _items: ProtoObject<IItem>[] = [];
	private readonly _daily_gain_record: ProtoObject<IItemGainRecords>[] = [];
	private readonly _newBagItems = new Set<number>();
	private readonly _newDecoItems = new Set<number>();
	private readonly _newCgItems = new Set<number>();

	private readonly _freeDiamondIds: number[] = [];
	private readonly _paidDiamondIds: number[] = [];
	private readonly _freeSkinTicketIds: number[] = [];
	private readonly _paidSkinTicketIds: number[] = [];
	private _loadingImage: number[] = [];

	get items() { return this._items; }
	get freeDiamonds() {
		let diamond = 0;
		const { _items, _freeDiamondIds } = this;
		for (const id of _freeDiamondIds) {
			const item = _items.find(v => v.item_id == id);
			if (item) diamond += item.stack;
		}
		return diamond;
	}
	get paidDiamonds() {
		let diamond = 0;
		const { _items, _paidDiamondIds } = this;
		for (const id of _paidDiamondIds) {
			const item = _items.find(v => v.item_id == id);
			if (item) diamond += item.stack;
		}
		return diamond;
	}
	get diamonds() { return this.freeDiamonds + this.paidDiamonds; }
	get freeSkinTickets() {
		let tickets = 0;
		const { _items, _freeSkinTicketIds } = this;
		for (const id of _freeSkinTicketIds) {
			const item = _items.find(v => v.item_id == id);
			if (item) tickets += item.stack;
		}
		return tickets;
	}
	get paidSkinTickets() {
		let tickets = 0;
		const { _items, _paidSkinTicketIds } = this;
		for (const id of _paidSkinTicketIds) {
			const item = _items.find(v => v.item_id == id);
			if (item) tickets += item.stack;
		}
		return tickets;
	}
	get skinTickets() { return this.freeSkinTickets + this.paidSkinTickets; }

	getRandomCgPath() {
		const cgId = this._loadingImage.random();
		if (!cgId) return "";
		const cfgInfo = $cfgMgr.item_definition.loading_image[cgId];
		if (!cfgInfo) return "";
		return $langRes(cfgInfo.img_path);
	}

	isUsingCG(id: number) {
		return this._loadingImage.indexOf(id) !== -1;
	}

	changeCGUsing(id: number) {
		const images = this._loadingImage.slice();
		if (this.isUsingCG(id))
			images.remove(id);
		else
			images.push(id);
		$netMgr.requests.setLoadingImage({ images });
	}

	getItemCount(id: number) {
		if (id == 100001) return this.diamonds;
		if (id == 100004) return this.skinTickets;
		const item = this._items.find(v => v.item_id == id);
		if (item) return item.stack;
		return 0;
	}

	getItemByCategory(category: EItemCategory, sort?: boolean) {
		const items = this._items.filter(v => {
			const cfgItem = $cfgMgr.item_definition.item[v.item_id];
			if (!cfgItem) return false;
			return cfgItem.category == category;
		});
		sort && items.sort((a, b) => {
			return $cfgMgr.item_definition.item[a.item_id].sort - $cfgMgr.item_definition.item[b.item_id].sort;
		});
		return items;
	}

	getItemByCategoryType(category: EItemCategory, type: EItemNormalType | EItemGiftType | EItemCommonType, sort?: boolean) {
		const items = this._items.filter(v => {
			const cfgItem = $cfgMgr.item_definition.item[v.item_id];
			if (!cfgItem) return false;
			return cfgItem.category == category && cfgItem.type == type;
		});
		sort && items.sort((a, b) => {
			return $cfgMgr.item_definition.item[a.item_id].sort - $cfgMgr.item_definition.item[b.item_id].sort;
		});
		return items;
	}

	@InterestMessage(ENetMessage.login)
	@InterestMessage(ENetMessage.oauth2Login)
	private onLogin(res: IResLogin) {
		if (!res.account) return;
		const { gold, vip, diamond, platform_diamond, skin_ticket, platform_skin_ticket, loading_image } = res.account;
		const items: IItem[] = [];
		gold && items.push({ item_id: 100002, stack: gold });
		vip && items.push({ item_id: 100099, stack: vip });
		diamond && items.push({ item_id: 100001, stack: diamond });
		skin_ticket && items.push({ item_id: 100004, stack: skin_ticket });
		this._loadingImage = loading_image.slice();
		platform_diamond.length && platform_diamond.forEach(v => v.count && items.push({ item_id: v.id, stack: v.count }));
		platform_skin_ticket.length && platform_skin_ticket.forEach(v => v.count && items.push({ item_id: v.id, stack: v.count }));
		this.modifyItems(items);
		this.dispatch(EUserEvent.OnBagItemsChanged);
	}

	@InterestMessage(ENetMessage.fetchMisc)
	private onFetchMisc(res: IResMisc) {

	}

	@InterestMessage(ENetMessage.fetchBagInfo)
	private onFetchBagInfo(res: IResBagInfo) {
		const { items, daily_gain_record } = $decodeProtoData(res.bag);
		this.modifyItems(items);
		this.modifyDailyGainRecord(daily_gain_record);
		this.openAllRewardItem();
		this.dispatch(EUserEvent.OnBagItemsChanged);
		this.dispatch(EUserEvent.OnBagDailyGainRecordChanged);
	}

	@InterestMessage(ENetNotify.NotifyAccountUpdate)
	private onNotifyAccountUpdate(data: IAccountUpdate) {
		const bagInfo = $decodeProtoData(data.bag);
		if (!bagInfo) return;
		this.modifyItems(bagInfo.update_items, true);
		this.modifyDailyGainRecord(bagInfo.update_daily_gain_record);

		bagInfo.update_items.length > 0 && this.openAllRewardItem();
		bagInfo.update_items.length > 0 && this.dispatch(EUserEvent.OnBagItemsChanged);
		bagInfo.update_daily_gain_record.length > 0 && this.dispatch(EUserEvent.OnBagDailyGainRecordChanged);
	}

	private openAllRewardItem() {
		this._items.forEach(v => {
			const cfgItem = $cfgMgr.item_definition.item[v.item_id];
			if (!cfgItem) return;
			if (cfgItem.category == EItemCategory.Item && cfgItem.type == EItemNormalType.GiftBagReward)
				$netMgr.requests.openAllRewardItem({ item_id: v.item_id });
		});
	}

	private modifyItems(items: IItem[], checkNew?: boolean) {
		const { _items, _newBagItems, _newDecoItems, _newCgItems } = this;
		items.forEach(v => {
			const itemId = v.item_id;
			const index = _items.findIndex(iv => iv.item_id == itemId);
			if (v.stack > 0) {
				if (index >= 0) _items[index] = v;
				else _items.push(v);
				if (!checkNew) return;
				const cfgItem = $cfgMgr.item_definition.item[itemId];
				if (!cfgItem) return;
				if (cfgItem.category == EItemCategory.Common) {
					_newBagItems.add(itemId);
					_newDecoItems.add(itemId);
				}
				if (cfgItem.category == EItemCategory.DecorateWithoutAchieve && !cfgItem.item_expire) {
					_newCgItems.add(itemId);
				}
			} else {
				if (index < 0) return;
				_items.splice(index, 1);
			}
		});
	}

	private modifyDailyGainRecord(datas: IItemGainRecords[]) {
		const { _daily_gain_record } = this;
		datas.forEach(v => {
			const index = _daily_gain_record.findIndex(dv => dv.limit_source_id == v.limit_source_id);
			if (index < 0) _daily_gain_record.push(v);
			else _daily_gain_record[index] = v;
		});
	}

	@InterestNotify(ENotifyConst.OnInitGameCompleted)
	private onEnterLoginScene() {
		const info = $cfgMgr.mall.channel_config[$gameMgr.payChannelId];
		if (info) {
			const { free_jade_ids, free_voucher_ids, paid_jade_ids, paid_voucher_ids } = info;
			if (free_jade_ids)
				this._freeDiamondIds.push(...free_jade_ids.split2Num("-"));
			if (free_voucher_ids)
				this._freeSkinTicketIds.push(...free_voucher_ids.split2Num("-"));
			if (paid_jade_ids)
				this._paidDiamondIds.push(...paid_jade_ids.split2Num("-"));
			if (paid_voucher_ids)
				this._paidSkinTicketIds.push(...paid_voucher_ids.split2Num("-"));
		}
	}

	@InterestMessage(ENetMessage.setLoadingImage)
	private onSetLoadingImageRes(_, req: IReqSetLoadingImage) {
		this._loadingImage = req.images.slice();
		this.dispatch(EUserEvent.OnCGUsingChanged);
	}
} 