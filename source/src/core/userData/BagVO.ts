import { ENotifyConst } from "../common/NotifyConst";
import { BaseVO } from "./BaseVO";
import { EUserEvent } from "./UserDefine";

export class BagVO extends BaseVO implements VO.IBagVO {
	private readonly _items: ProtoObject<IItem>[] = [];
	private readonly _daily_gain_record: ProtoObject<IItemGainRecords>[] = [];
	private readonly _newBagItems = new Set<number>();
	private readonly _newDecoItems = new Set<number>();
	private readonly _newCgItems = new Set<number>();

	private readonly _freeDiamonds: number[] = [];
	private readonly _paidDiamonds: number[] = [];
	private readonly _freeSkinTickets: number[] = [];
	private readonly _paidSkinTickets: number[] = [];

	get freeDiamonds() {
		let diamond = 0;

		for (let id of GameMgr.Inst.free_diamonds) {
			if (GameMgr.Inst.account_numerical_resource[id]) {
				diamond += GameMgr.Inst.account_numerical_resource[id];
			}
		}

		return diamond;
	}
	get paidDiamonds() {
		let diamond = 0;

		for (let id of GameMgr.Inst.paid_diamonds) {
			if (GameMgr.Inst.account_numerical_resource[id]) {
				diamond += GameMgr.Inst.account_numerical_resource[id];
			}
		}

		return diamond;
	}
	get diamonds() { return this.freeDiamonds + this.paidDiamonds; }
	get freeSkinTickets() {
		return 0;
	}
	get paidSkinTickets() {
		return 0;
	}
	get skinTickets() { return this.freeSkinTickets + this.paidSkinTickets; }

	getItemCount(id: number) {
		const item = this._items.find(v => v.item_id == id);
		if (item) return item.stack;

		//////////////////////////////////
		let _item_info: iItemInfo = this.find_item(item_id);
		if (_item_info) return _item_info.count;
		if (item_id == UI_Bag.diamondId) {
			let diamond: number = 0;
			for (let id of GameMgr.Inst.free_diamonds) {
				if (GameMgr.Inst.account_numerical_resource[id]) {
					diamond += GameMgr.Inst.account_numerical_resource[id];
				}
			}
			for (let id of GameMgr.Inst.paid_diamonds) {
				if (GameMgr.Inst.account_numerical_resource[id]) {
					diamond += GameMgr.Inst.account_numerical_resource[id];
				}
			}

			return diamond;
		}
		if (item_id == 100004) {
			let val: number = 0;
			for (let id of GameMgr.Inst.free_pifuquans) {
				if (GameMgr.Inst.account_numerical_resource[id]) {
					val += GameMgr.Inst.account_numerical_resource[id];
				}
			}
			for (let id of GameMgr.Inst.paid_pifuquans) {
				if (GameMgr.Inst.account_numerical_resource[id]) {
					val += GameMgr.Inst.account_numerical_resource[id];
				}
			}
			return val;
		}
		if (item_id == 100002) {
			return GameMgr.Inst.account_data['gold'];
		}
		return 0;
	}

	@InterestMessage(EMessageID.login)
	@InterestMessage(EMessageID.oauth2Login)
	private onLogin(res: IResLogin) {
		if (!res.account) return;
		const { gold, vip, platform_diamond, skin_ticket, platform_skin_ticket } = res.account;
		const items: IItem[] = [
			{ item_id: 100002, stack: gold },
			{ item_id: 100099, stack: vip },
		];
		if (platform_diamond) {
			platform_diamond.forEach(v => items.push({ item_id: v.id, stack: v.count }));
		}
		if (skin_ticket) {
			items.push({ item_id: 100004, stack: this.skinTickets });
		}
		if (platform_skin_ticket) {
			platform_skin_ticket.forEach(v => items.push({ item_id: v.id, stack: v.count }));
		}
		this.modifyItems(items);
	}

	@InterestMessage(EMessageID.fetchBagInfo)
	private onFetchBagInfo(res: IResBagInfo) {
		const { items, daily_gain_record } = $decodeProtoData(res.bag);
		this.modifyItems(items);
		this.modifyDailyGainRecord(daily_gain_record);
		this.openAllRewardItem();
		this.dispatch(EUserEvent.OnBagItemsChanged);
		this.dispatch(EUserEvent.OnBagDailyGainRecordChanged);
	}

	@InterestMessage(ENotify.NotifyAccountUpdate)
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
			if (cfgItem.category == EItemCategory.Normal && cfgItem.type == EItemNormalType.GiftBagReward)
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
				this._freeDiamonds.push(...free_jade_ids.split2Num("-"));
			if (free_voucher_ids)
				this._freeSkinTickets.push(...free_voucher_ids.split2Num("-"));
			if (paid_jade_ids)
				this._paidDiamonds.push(...paid_jade_ids.split2Num("-"));
			if (paid_voucher_ids)
				this._paidSkinTickets.push(...paid_voucher_ids.split2Num("-"));
		}
	}
} 