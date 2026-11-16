import { RadioGroup } from "../../../../extention/RadioGroup";
import UIRecord from "../../../../ui/PkgMain/UIRecord";
import { RenderRecordItemView } from "../renders/RenderRecordItemView";

const Scroll_Threshold = 150; // 触底检查阈值

export const enum EUIRecordMsg {
	OnTabSelectedChanged = "EUILiaoSheMsg_OnTabSelectedChanged",
	OnListInfoScrollEnd = "EUILiaoSheMsg_OnListInfoScrollEnd",
}

export class UIRecordView extends UIRecord {
	private _tabGroup = new RadioGroup();

	override onCreate() {
		const {
			com_back, list_info, btn_overview, btn_level, btn_friend, btn_activity, btn_match, btn_collect,
			btn_other,
		} = this;
		com_back.onBackClick(this, this.closeSelf);
		btn_other.onClick(this, () => {
			this.openView<IUIRecordShareData>(EViewID.UIRecordShareView, { type: 1 });
		});

		this._tabGroup.init(
			[btn_overview, btn_level, btn_friend, btn_activity, btn_match, btn_collect], this,
			index => this.event(EUIRecordMsg.OnTabSelectedChanged, index)
		);
		list_info.on(fgui.Events.SCROLL, this, this.onListRankScroll);
		$uiUtil.initList<RenderRecordItemView>(
			list_info, true, this,
			(index, item) => {
				item.refresh($user.record.getRecordDetail(list_info.data[index]), index + 1);
			},
			(item, e, index) => {

			}
		);
	}

	refresh(tag: ERecordTag, ids: string[], resetPos: boolean) {
		const { _tabGroup, list_info, txt_collectNum } = this;
		_tabGroup.selectIndex = tag;
		resetPos && list_info.scrollPane.setPosY(0);
		list_info.data = ids;
		list_info.numItems = ids.length;
		txt_collectNum.text = $lang(20162) + $user.record.collectBriefs.length + "/" + $user.record.maxCollect;
	}

	protected override onDisable() {
		this._tabGroup.clearSelection();
	}

	private onListRankScroll() {
		const { contentHeight, viewHeight, posY } = this.list_info.scrollPane;
		// 触底检测：当前位置 + 视口高度 >= 内容高度 - 阈值
		if (contentHeight - posY - viewHeight <= Scroll_Threshold) {
			this.event(EUIRecordMsg.OnListInfoScrollEnd);
		}
	}

	override onOpenAni() {
		$uiUtil.playTrans(this.trans_show, false);
		return this.com_back.onOpenAni();
	}

	override onCloseAni() {
		$uiUtil.playTrans(this.trans_show, true);
		return this.com_back.onCloseAni();
	}
}
