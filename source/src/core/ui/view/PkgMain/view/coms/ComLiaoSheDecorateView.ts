import ComLiaoSheDecorate from "../../../../ui/PkgMain/ComLiaoSheDecorate";
import { RenderLiaoSheDecoItemView } from "../renders/RenderLiaoSheDecoItemView";
import { RenderLiaoSheDecoTabView } from "../renders/RenderLiaoSheDecoTabView";

export const enum EComLiaoSheDecorateMsg {
	OnBtnSaveClick = "ComLiaoSheDecorate_OnBtnSaveClick",
	OnBtnPreviewClick = "ComLiaoSheDecorate_OnBtnPreviewClick",
	OnBtnRandomClick = "ComLiaoSheDecorate_OnBtnRandomClick",
	OnBtnClosePreviewClick = "ComLiaoSheDecorate_OnBtnClosePreviewClick",
	OnBtnEditViewNameClick = "ComLiaoSheDecorate_OnBtnEditViewNameClick",
}

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
	'', '', '', '', ''];
// cell_default_item = [0, 0, 0, 0, 0, 0, 305501, 305044, 305045, 305725, 307001];
// slot_ids = [0, 1, 2, 10, 3, 4, 5, 6, 7, 13, 8];
// slotHasPreivew = [false, false, false, false, false, false, true, true, true, true, true];
// itemCanDiselect = [true, true, true, true, true, true, false, false, false, false, false];

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

export class ComLiaoSheDecorateView extends ExtensionClass<IView, ComLiaoSheDecorate>(ComLiaoSheDecorate) implements IView {
	private _curData = new DecoViewData();

	override onCreate() {
		const { btn_save, btn_preview, btn_random, btn_closePreview, btn_editViewName, list_tab, list_view } = this;
		btn_save.onClick(this, this.sendEvent, [EComLiaoSheDecorateMsg.OnBtnSaveClick]);
		btn_preview.onClick(this, this.sendEvent, [EComLiaoSheDecorateMsg.OnBtnPreviewClick]);
		btn_random.onClick(this, this.sendEvent, [EComLiaoSheDecorateMsg.OnBtnRandomClick]);
		btn_closePreview.onClick(this, this.sendEvent, [EComLiaoSheDecorateMsg.OnBtnClosePreviewClick]);
		btn_editViewName.onClick(this, this.sendEvent, [EComLiaoSheDecorateMsg.OnBtnEditViewNameClick]);
		$uiUtil.setList(list_tab, false, this, this.onListTabRender, this.onListTabClick);
		$uiUtil.setList(list_view, false, this, this.onListViewRender, this.onListViewClick);
	}

	refresh() {
		const { list_tab } = this;
		const { use, views } = $userData.commonView;
		list_tab.numItems = views.length;
		const index = views.findIndex(v => v.index == use);
		list_tab.selectedIndex = index;
		list_tab.scrollToView(index, false);
		this.refreshView(index);
		Logger.error("deco refresh");
	}

	private refreshView(index: number) {
		const { list_view, txt_viewName, _curData } = this;
		_curData.init($userData.commonView.views[index]);
		list_view.numItems = _curData.values.length;
		list_view.selectedIndex = 0;
		list_view.scrollPane.posY = 0;
		txt_viewName.text = _curData.name;
		this.refreshItem(0);
	}

	private refreshItem(index: number) {

	}

	private onListTabRender(index: number, item: RenderLiaoSheDecoTabView) {
		const { use, views } = $userData.commonView;
		item.refresh(views[index], views[index].index == use);
	}

	private onListTabClick(item, evt, index: number) {
		this.refreshView(index);
	}

	private onListViewRender(index: number, item: RenderLiaoSheDecoItemView) {
		const slotData = this._curData.values[index];
		item.refresh(slotData, SlotTitles[index], SlotNames[index], slotData.type == 1 ? SlotIconRandom : SlotIcons[index]);
	}

	private onListViewClick(item, evt, index: number) {
		this.refreshItem(index);
	}
}
