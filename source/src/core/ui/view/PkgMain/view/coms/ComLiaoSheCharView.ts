import ComLiaoSheChar from "../../../../ui/PkgMain/ComLiaoSheChar";
import { RenderLiaoSheCharView } from "../renders/RenderLiaoSheCharView";

export const enum EComLiaoSheCharMsg {
	OnBtnSortClick = "ComLiaoSheChar_OnBtnSortClick",
	OnBtnFilterClick = "ComLiaoSheChar_OnBtnFilterClick",
	OnBtnStarClick = "ComLiaoSheChar_OnBtnStarClick",
}

export class ComLiaoSheCharView extends ExtensionClass<IView, ComLiaoSheChar>(ComLiaoSheChar) implements IView {

	override onCreate() {
		const { btn_sort, btn_filter, btn_star, list_chars } = this;
		btn_sort.onClick(this, this.sendEvent, [EComLiaoSheCharMsg.OnBtnSortClick]);
		btn_filter.onClick(this, this.sendEvent, [EComLiaoSheCharMsg.OnBtnFilterClick]);
		btn_star.onClick(this, this.sendEvent, [EComLiaoSheCharMsg.OnBtnStarClick]);
		$uiUtil.setList(list_chars, false, this, this.onListCharsRender, this.onListCharsClick);
	}

	refresh(resetSelect: boolean) {
		const { chars, mainCharId } = $userData.character;
		this.list_chars.numItems = chars.length;
		if(resetSelect)
			this.list_chars.selectedIndex = chars.findIndex(v => v.charid == mainCharId);
		Logger.error("char refresh");
	}

	private onListCharsRender(index: number, item: RenderLiaoSheCharView) {
		const { chars, mainCharId } = $userData.character;
		const data = chars[index];
		const using = data.charid == mainCharId;
		item.refresh(data, using);
	}

	private onListCharsClick(item, evt, index: number) {
		
	}
}
