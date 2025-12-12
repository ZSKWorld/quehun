import ComBagSkin from "../../../../ui/PkgMain/ComBagSkin";
import { RenderBagSkinItem1View } from "../renders/RenderBagSkinItem1View";
import { RenderBagSkinItem2View } from "../renders/RenderBagSkinItem2View";

export const enum EComBagSkinMsg {

}

export class ComBagSkinView extends ExtensionClass<IView, ComBagSkin>(ComBagSkin) implements IView {
	private _allChars: ISheetData_ItemDefinition_Character[];
	private _charSkins: KeyMap<number[]> = {};
	private _showChars: number[] = [];
	private _showSkins: number[] = [];
	private _showIndex: number = 0;
	override onCreate() {
		this.displayObject.onEnable = this.onEnable.bind(this);
		this.btn_back.onClick(this, this.refreshListChar);
		this._allChars = $cfgMgr.item_definition.character.slice();
		this._allChars.sort((a, b) => a.sort - b.sort);
		$cfgMgr.item_definition.skin.forEach(x => {
			const charId = x.character_id;
			const d_chara = $cfgMgr.item_definition.character[charId];
			if (!d_chara || !d_chara.open) return;
			if (!d_chara.can_marry) return;
			this._charSkins[charId] = this._charSkins[charId] || [];
			this._charSkins[charId].push(x.id);
		});
		this.btn_own.on(fgui.Events.STATE_CHANGED, this, this.refreshListChar);
		$uiUtil.setList(this.list_char, true, this, this.onListCharItemRenderer, this.onListCharItemClick);
		$uiUtil.setList(this.list_skin, true, this, this.onListSkinItemRenderer, this.onListSkinItemClick);
	}

	private onEnable() {
		this.refreshListChar();
	}

	private refreshListChar() {
		const onlyOwn = this.btn_own.selected;
		this._showChars = this._allChars.filter(v => {
			// 23/12/08 添加起售时间
			if (v.launch_time && $timeUtil.getTimeByString(v.launch_time) > $timeUtil.milliSecond) return false;
			// let isShow = UI_Sushe_Filter.isShowChar(v.id, this.renderFilter);
			// if (!isShow) return;

			if (((v.region_limit && $gameMgr.regionLimited) || onlyOwn) && !$userData.character.hasChar(v.id)) {
				const skinIds = this._charSkins[v.id];
				if (skinIds.every(v => !$userData.character.hasSkin(v))) return false;
			}
			return true;
		}).map(v => v.id);
		this.list_char.numItems = this._showChars.length;
		this.ctrl_type.selectedIndex = 0;
	}

	private refreshListSkin() {
		this.ctrl_type.selectedIndex = 1;
	}

	private onListCharItemRenderer(index: number, item: RenderBagSkinItem1View) {
		const charId = this._showChars[index];
		item.refresh(charId, $userData.character.hasChar(charId));
	}

	private onListCharItemClick(_, __, index: number) {
		this._showIndex = index;
		this.refreshListSkin();
	}

	private onListSkinItemRenderer(index: number, item: RenderBagSkinItem2View) {

	}

	private onListSkinItemClick(_, __, index: number) {

	}
}
