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
			if (vList.join() != ovList.join()) return false;
		}
		return true;
	}
}

export class ComLiaoSheDecorateView extends ExtendClass<IView, ComLiaoSheDecorate>(ComLiaoSheDecorate) implements IView {
	private _curData = new DecoViewData();
	private _items: ProtoObject<IItem>[];

	private get slotData() { return this._curData.values[this.list_view.selectedIndex]; }

	override onCreate() {
		const { btn_save, btn_preview, btn_random, btn_closePreview, btn_editViewName, list_tab, list_view, list_item } = this;
		btn_save.onClick(this, this.onBtnSaveClick);
		btn_preview.onClick(this, this.onBtnPreviewClick);
		btn_random.onClick(this, this.onBtnRandomClick);
		btn_closePreview.onClick(this, this.onBtnClosePreviewClick);
		btn_editViewName.onClick(this, this.onBtnEditorNameClick);

		$uiUtil.setList(list_tab, false, this, (index: number, item: RenderLiaoSheDecoTabView) => {
			const { use, views } = $user.commonView;
			item.refresh(views[index], views[index].index == use);
		}, (_, __, index) => {
			this.refreshView(index);
		});

		$uiUtil.setList(list_view, false, this, (index: number, item: RenderLiaoSheDecoTypeView) => {
			const slotData = this._curData.values[index];
			item.refresh(slotData, SlotTitles[index], SlotNames[index], slotData.type == 1 ? SlotIconRandom : SlotIcons[index]);
		}, (_, __, index: number) => {
			this.refreshItem(index);
		});

		$uiUtil.setList(list_item, false, this, (index: number, item: RenderLiaoSheDecoItemView) => {
			const itemData = this._items[index];
			const { type, item_id_list, slot } = this.slotData;
			item.refresh(itemData.item_id, !!type, item_id_list.includes(itemData.item_id), slot == EItemCommonType.LiZhiMusic);
		}, (item: RenderLiaoSheDecoItemView, evt: Laya.Event, index: number) => {
			// this.refreshItem(index);
		});
	}

	refresh() {
		const { list_tab } = this;
		const { use, views } = $user.commonView;
		list_tab.numItems = views.length;
		const index = views.findIndex(v => v.index == use);
		list_tab.selectedIndex = index;
		list_tab.scrollToView(index, false);
		this.refreshView(index);
	}

	private refreshView(index: number) {
		const { list_view, txt_viewName, _curData } = this;
		_curData.init($user.commonView.views[index]);
		list_view.numItems = _curData.values.length;
		const selectIndex = 0;
		list_view.selectedIndex = selectIndex;
		list_view.scrollToView(selectIndex, false);
		txt_viewName.text = _curData.name;
		this.refreshItem(selectIndex);
	}

	private refreshItem(index: number) {
		const { txt_title, btn_preview, btn_random, list_item } = this;
		txt_title.text = $lang(SlotTitles[index]);
		btn_preview.visible = ItemPreview[index][0];
		btn_random.visible = ItemPreview[index][1];

		const { slot: itemType, type: slotType, item_id, item_id_list } = this.slotData;
		const items = $user.bag.getItemByCategoryType(EItemCategory.Common, itemType, true);
		const defaultId = $user.commonView.getDefultViewId(itemType);
		if (defaultId) items.unshift({ item_id: defaultId, stack: 1 });

		btn_random.selected = !!slotType;
		this._items = items;
		list_item.numItems = items.length;
		const startIndex = items.findIndex(v => slotType ? item_id_list.includes(v.item_id) : v.item_id == item_id);
		list_item.selectedIndex = startIndex;
	}

	//#region button click
	private onBtnEditorNameClick() {

	}
	private onBtnSaveClick() {

	}
	private onBtnPreviewClick() {

	}
	private onBtnRandomClick() {
		const { slotData, list_view, list_item, btn_random } = this;
		slotData.type = btn_random.selected ? 1 : 0;
		list_view.numItems = list_view.numItems;
		list_item.numItems = list_item.numItems;
	}
	private onBtnClosePreviewClick() {

	}
	//#endregion
}
