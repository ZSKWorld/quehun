import ComLiaoSheDecorate from "../../../../ui/PkgMain/ComLiaoSheDecorate";
import { RenderLiaoSheDecoItemView } from "../renders/RenderLiaoSheDecoItemView";
import { RenderLiaoSheDecoTabView } from "../renders/RenderLiaoSheDecoTabView";
import { RenderLiaoSheDecoTypeView } from "../renders/RenderLiaoSheDecoTypeView";

const SlotTitles = [2193, 2194, 2195, 1901, 2214, 2624, 2856, 2412, 2413, 3917, 2826];
const SlotNames = [411, 412, 413, 417, 414, 415, 416, 0, 0, 0, 0];
const SlotIconRandom = "ui://PkgMain/img_3198";
const SlotIcons = [
	'ui://PkgMain/img_3203',
	'ui://PkgMain/img_3201',
	'ui://PkgMain/img_3202',
	'ui://PkgMain/img_3205',
	'ui://PkgMain/img_3200',
	'ui://PkgMain/img_3204',
	'', '', '', '', ''
];
const ItemPreview = [
	[false, true], [false, true], [false, true], [false, true], [false, true], [false, true],
	[true, false], [true, true], [true, true], [true, true], [true, false]
];

class DecoViewData implements IResAllcommonViews_Views {
	name: string;
	index: number;
	values: IViewSlot[];

	init(data: IResAllcommonViews_Views) {
		const newData = structuredClone(data);
		this.name = newData.name;
		this.index = newData.index;
		this.values = newData.values;
	}

	equals(other: IResAllcommonViews_Views) {
		if (!other) return;
		if (this.index != other.index) return false;
		if (this.name != other.name) return false;
		const values = this.values;
		const oValues = other.values;
		if (values.length != oValues.length) return false;
		for (let i = 0; i < values.length; i++) {
			const v = values[i];
			const ov = oValues[i];
			if (v.slot != ov.slot) return false;
			if (v.item_id != ov.item_id) return false;
			if (v.type != ov.type) return false;
			const vList = v.item_id_list;
			const ovList = ov.item_id_list;
			if (vList.length != ovList.length) return false;
			if (vList.slice().sort().join() != ovList.slice().sort().join()) return false;
		}
		return true;
	}
}

export class ComLiaoSheDecorateView extends ExtendClass<IView, ComLiaoSheDecorate>(ComLiaoSheDecorate) implements IView {
	private _curData = new DecoViewData();
	private _originData = new DecoViewData();
	private _items: number[];

	private get dataChanged() { return !this._curData.equals(this._originData); }
	private get slotData() { return this._curData.values[this.list_view.selectedIndex]; }
	private get originSlotData() { return this._originData.values[this.list_view.selectedIndex]; }

	override onCreate() {
		const { btn_use, btn_save, btn_preview, btn_random, btn_closePreview, btn_editName, list_tab, list_view, list_item } = this;
		btn_use.onClick(this, this.onBtnUseClick);
		btn_save.onClick(this, this.onBtnSaveClick);
		btn_preview.onClick(this, this.onBtnPreviewClick);
		btn_random.onClick(this, this.onBtnRandomClick);
		btn_closePreview.onClick(this, this.onBtnClosePreviewClick);
		btn_editName.onClick(this, this.onBtnEditNameClick);

		$uiUtil.setList(list_tab, false, this, (index: number, item: RenderLiaoSheDecoTabView) => {
			const { use, views } = $user.commonView;
			item.refresh(views[index], views[index].index == use);
		}, (_, __, index) => {
			const { _curData, dataChanged, list_tab } = this;
			const oldIndex = $user.commonView.views.findIndex(v => v.index == _curData.index);
			if (oldIndex == index) return;
			if (dataChanged) {
				list_tab.selectedIndex = oldIndex;
				$confirmSma(3, $lang(3022)).then(v => {
					v && this.refreshView(index);
				});
			} else {
				this.refreshView(index);
			}
		});

		$uiUtil.setList(list_view, false, this, (index: number, item: RenderLiaoSheDecoTypeView) => {
			const slotData = this._curData.values[index];
			item.refresh(slotData, SlotTitles[index], SlotNames[index], slotData.type ? SlotIconRandom : SlotIcons[index]);
		}, (_, __, index: number) => {
			this.refreshItem(index);
		});

		$uiUtil.setList(list_item, false, this, (index: number, item: RenderLiaoSheDecoItemView) => {
			const id = this._items[index];
			const { type, item_id_list, slot } = this.slotData;
			item.refresh(id, !!type, item_id_list.includes(id), slot == EItemCommonType.LiZhiMusic);
		}, (item: RenderLiaoSheDecoItemView, evt: Laya.Event, index: number) => {
			const { _items, slotData, list_view, list_item } = this;
			const id = _items[index];
			if (!slotData.type) {
				const defaultId = $user.commonView.getDefultViewId(slotData.slot);
				const targetId = defaultId || id != slotData.item_id ? id : 0;
				if (targetId == slotData.item_id) return;
				slotData.item_id = targetId;
				if (!targetId) list_item.selectedIndex = -1;
			} else {
				const index = slotData.item_id_list.indexOf(id);
				if (index == -1) {
					slotData.item_id_list.push(id);
				} else {
					if (slotData.item_id_list.length > 1)
						slotData.item_id_list.splice(index, 1);
					else
						return;
				}
			}
			list_view.numItems = list_view.numItems;
			list_item.numItems = list_item.numItems;
			this.onDataChanged();
		});
	}

	override onEnable() {
		$facade.on(EUserEvent.OnCommonViewChanged, this, this.onCommonViewChanged);
	}

	override onDisable() {
		$facade.offAllCaller(this);
	}

	refresh() {
		const { list_tab } = this;
		const { use, views } = $user.commonView;
		list_tab.numItems = views.length;
		const index = views.findIndex(v => v.index == use);
		this.refreshView(index);
	}

	private refreshView(index: number, resetSelect: boolean = true) {
		const { _curData, _originData, list_tab, list_view, btn_editName } = this;
		list_tab.selectedIndex = index;
		list_tab.scrollToView(index, false);
		const data = $user.commonView.views[index];
		_curData.init(data);
		_originData.init(data);
		list_view.numItems = _curData.values.length;
		if (resetSelect) {
			list_view.selectedIndex = 0;
			list_view.scrollToView(0, false);
		}
		btn_editName.text = _curData.name;
		this.refreshItem(resetSelect ? 0 : list_view.selectedIndex, resetSelect);
		this.onDataChanged();
	}

	private refreshItem(index: number, resetSelect: boolean = true) {
		const { txt_title, btn_preview, btn_random, list_item } = this;
		txt_title.text = $lang(SlotTitles[index]);
		btn_preview.visible = ItemPreview[index][0];
		btn_random.visible = ItemPreview[index][1];

		const { slot: itemType, type: slotType, item_id, item_id_list } = this.slotData;
		const items = $user.bag.getItemByCategoryType(EItemCategory.Common, itemType, true).map(v => v.item_id);
		const defaultId = $user.commonView.getDefultViewId(itemType);
		if (defaultId) items.unshift(defaultId);

		btn_random.selected = !!slotType;
		this._items = items;
		list_item.numItems = items.length;

		if (resetSelect) {
			const startIndex = items.findIndex(v => slotType ? item_id_list.includes(v) : v == item_id);
			list_item.selectedIndex = startIndex;
			startIndex > 0 && list_item.scrollToView(startIndex, false);
		}

		btn_random.grayed = items.length == 0;
		btn_random.touchable = items.length > 0;
	}

	//#region button click
	private onBtnUseClick() {
		$netMgr.requests.useCommonView({ index: this._curData.index });
	}
	private onBtnEditNameClick() {
		const { _curData } = this;
		this.openView<IUITextInputData>(EViewID.UITextInputView, {
			title: $lang(25030108),
			text: _curData.name,
			maxLength: 8,
			callback: (text: string) => {
				text = text || String(_curData.index + 1);
				if (text == _curData.name) return;
				const params = this.getSaveReqData();
				params.name = text;
				$netMgr.requests.saveCommonViews(params);
			},
		});
	}
	private onBtnSaveClick() {
		const params = this.getSaveReqData();
		$netMgr.requests.saveCommonViews(params);
	}
	private onBtnPreviewClick() {

	}
	private onBtnRandomClick() {
		const { slotData, _items, list_view, list_item, btn_random } = this;
		slotData.type = btn_random.selected ? 1 : 0;

		const { type: slotType, item_id, item_id_list } = slotData;
		if (slotType) {
			if (item_id_list.length == 0) {
				item_id_list.push(_items[0]);
			}
		} else {
			const originData = this.originSlotData;
			const originType = originData.type;
			const originList = originData.item_id_list;
			if (originType == slotType && originList.length == 0 && item_id_list.length == 1 && item_id_list[0] == _items[0]) {
				item_id_list.length = 0;
			}
		}

		list_view.numItems = list_view.numItems;
		list_item.numItems = list_item.numItems;

		const startIndex = _items.findIndex(v => slotType ? item_id_list.includes(v) : v == item_id);
		list_item.selectedIndex = startIndex;
		this.onDataChanged();
	}
	private onBtnClosePreviewClick() {

	}
	private getSaveReqData() {
		const commonView = $user.commonView;
		const { name, index, values } = this._curData;
		const views: IViewSlot[] = [];
		for (const e of values) {
			const validItemId = e.item_id && !commonView.isDefaultView(e.item_id);
			const itemList = e.item_id_list.filter(v => v && !commonView.isDefaultView(v));
			const validItemList = itemList.length > 0;
			if (!validItemId && !validItemList) continue;
			const view: IViewSlot = {
				slot: e.slot,
				item_id: commonView.isDefaultView(e.item_id) ? 0 : e.item_id,
				type: e.type,
				item_id_list: e.item_id_list.map(v => commonView.isDefaultView(v) ? 0 : v),
			};
			views.push(view);
		}
		return {
			name,
			is_use: index == commonView.usingView.index ? 1 : 0,
			save_index: index,
			views,
		} as IReqSaveCommonViews;
	}
	private onDataChanged() {
		const { _curData, dataChanged, btn_using, btn_use, btn_save } = this;
		const usingIndex = $user.commonView.usingView.index;
		btn_using.visible = _curData.index == usingIndex && !dataChanged;
		btn_use.visible = _curData.index != usingIndex && !dataChanged;
		btn_save.visible = dataChanged;
	}
	//#endregion

	private onCommonViewChanged() {
		const { list_tab } = this;
		list_tab.numItems = list_tab.numItems;
		this.refreshView(list_tab.selectedIndex, false);
	}
}
