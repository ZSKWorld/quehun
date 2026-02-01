import { EUserEvent } from "../../../../../userData/UserDefine";
import ComLiaoSheChar from "../../../../ui/PkgMain/ComLiaoSheChar";
import { RenderLiaoSheCharView } from "../renders/RenderLiaoSheCharView";

export const enum EComLiaoSheCharMsg {
	OnBtnSortClick = "ComLiaoSheChar_OnBtnSortClick",
	OnBtnFilterClick = "ComLiaoSheChar_OnBtnFilterClick",
}

export class ComLiaoSheCharView extends ExtensionClass<IView, ComLiaoSheChar>(ComLiaoSheChar) implements IView {

	private _selectedData: ProtoObject<ICharacter>;
	private _selectedItem: RenderLiaoSheCharView;
	private get showStarChar() { return !!$userData.clientValue.getValue(EClientValueType.Chara_Show_Star); }
	private get showChars() { return this.showStarChar ? $userData.character.starChars : $userData.character.showChars; }

	override onCreate() {
		const { btn_sort, btn_filter, btn_star, list_chars } = this;
		btn_sort.onClick(this, this.sendEvent, [EComLiaoSheCharMsg.OnBtnSortClick]);
		btn_filter.onClick(this, this.sendEvent, [EComLiaoSheCharMsg.OnBtnFilterClick]);
		btn_star.onClick(this, this.onBtnStarClick);
		$uiUtil.setList(list_chars, true, this, this.onListCharsRender, this.onListCharsClick);
		$facade.on(EUserEvent.OnClientValueChanged, this, this.refresh, [false]);
		$facade.on(EUserEvent.OnCharacterChanged, this, this.refresh, [false]);
		$facade.on(EUserEvent.OnCharacterSortChanged, this, this.refresh, [false]);
		$facade.on(EUserEvent.OnMainCharacterChanged, this, this.refresh, [false]);
	}

	refresh(resetSelect: boolean) {
		const chars = this.showChars;
		const { list_chars, btn_star, showStarChar } = this;
		list_chars.numItems = chars.length;
		btn_star.selected = showStarChar;
		let selectedIndex = 0;
		if (resetSelect || !this._selectedData) {
			selectedIndex = chars.findIndex(v => v.charid == $userData.character.mainCharId);
			this._selectedData = chars[selectedIndex];
		}
		else {
			selectedIndex = chars.findIndex(v => v.charid == this._selectedData.charid);
		}
		const childIndex = list_chars.itemIndexToChildIndex(selectedIndex);
		this._selectedItem = childIndex == -1 ? null : list_chars.getChildAt(childIndex) as RenderLiaoSheCharView;
		list_chars.refreshVirtualList();
		if (resetSelect && selectedIndex != -1)
			list_chars.scrollToView(selectedIndex, false);
	}

	private onListCharsRender(index: number, item: RenderLiaoSheCharView) {
		const data = this.showChars[index];
		const using = data.charid == $userData.character.mainCharId;
		item.refresh(data, using, this._selectedData?.charid == data.charid);
	}

	private onListCharsClick(item: RenderLiaoSheCharView, evt, index: number) {
		const { showChars, _selectedData, _selectedItem } = this;
		const data = showChars[index];
		_selectedItem?.refreshSelected(false, _selectedData?.charid);
		this._selectedData = data;
		this._selectedItem = item;
		item.refreshSelected(true, data.charid);
	}

	private onBtnStarClick() {
		$userData.clientValue.setValue(EClientValueType.Chara_Show_Star, +!!this.btn_star.selected);
	}
}
