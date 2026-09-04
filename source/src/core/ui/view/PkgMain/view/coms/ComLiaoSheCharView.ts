import ComLiaoSheChar from "../../../../ui/PkgMain/ComLiaoSheChar";
import { EUILiaoSheEvent } from "../../Definition";
import { RenderLiaoSheCharView } from "../renders/RenderLiaoSheCharView";

export const enum EComLiaoSheCharMsg {
	OnBtnSortClick = "ComLiaoSheChar_OnBtnSortClick",
	OnBtnFilterClick = "ComLiaoSheChar_OnBtnFilterClick",
}

export class ComLiaoSheCharView extends ComLiaoSheChar {

	private _selectedData: ProtoObject<ICharacter>;
	private _selectedItem: RenderLiaoSheCharView;
	private get showStarChar() { return !!$user.clientValue.getValue(EClientValueType.Chara_Show_Star); }
	private get showChars() { return this.showStarChar ? $user.character.starChars : $user.character.showChars; }

	override onCreate() {
		const { btn_sort, btn_filter, btn_star, list_chars } = this;
		btn_sort.onClick(this, this.event, [EComLiaoSheCharMsg.OnBtnSortClick]);
		btn_filter.onClick(this, this.event, [EComLiaoSheCharMsg.OnBtnFilterClick]);
		btn_star.onClick(this, this.onBtnStarClick);
		$uiUtil.setList(list_chars, true, this, this.onListCharsRender, this.onListCharsClick);
	}

	override onEnable() {
		$facade.on(EUserEvent.OnClientValueChanged, this, this.refresh, [false]);
		$facade.on(EUserEvent.OnCharacterChanged, this, this.refresh, [false]);
		$facade.on(EUserEvent.OnCharacterSortChanged, this, this.refresh, [false]);
		$facade.on(EUserEvent.OnMainCharacterChanged, this, this.refresh, [false]);
	}

	override onDisable() {
		$facade.offAllCaller(this);
	}

	refresh(resetSelect: boolean) {
		const chars = this.showChars;
		const { list_chars, btn_star, showStarChar } = this;
		const mainCharId = $user.character.mainCharId;
		btn_star.selected = showStarChar;
		let selectedIndex = 0;
		if (resetSelect || !this._selectedData) {
			selectedIndex = chars.findIndex(v => v.charid == mainCharId);
			this._selectedData = chars[selectedIndex];
		}
		else {
			selectedIndex = chars.findIndex(v => v.charid == this._selectedData.charid);
		}
		list_chars.numItems = chars.length;
		if (selectedIndex != -1) {
			list_chars.scrollToView(selectedIndex, false);
			const childIndex = list_chars.itemIndexToChildIndex(selectedIndex);
			const item = list_chars.getChildAt(childIndex) as RenderLiaoSheCharView;
			this.onListCharsClick(item, null, selectedIndex);
		} else
			this.event(EUILiaoSheEvent.OnLiaoSheCharSelected, mainCharId);
	}

	private onListCharsRender(index: number, item: RenderLiaoSheCharView) {
		const data = this.showChars[index];
		const using = data.charid == $user.character.mainCharId;
		item.refresh(data, using, this._selectedData?.charid == data.charid);
	}

	private onListCharsClick(item: RenderLiaoSheCharView, evt, index: number) {
		const { showChars, _selectedData, _selectedItem } = this;
		const data = showChars[index];
		_selectedItem?.refreshSelected(false, _selectedData?.charid);
		this._selectedData = data;
		this._selectedItem = item;
		item.refreshSelected(true, data.charid);
		if (evt && _selectedData == data && data.charid != $user.character.mainCharId) {
			$netMgr.requests.changeMainCharacter({ character_id: data.charid });
		}
		this.event(EUILiaoSheEvent.OnLiaoSheCharSelected, data.charid);
	}

	private onBtnStarClick() {
		$user.clientValue.setValue(EClientValueType.Chara_Show_Star, +!!this.btn_star.selected);
	}
}
