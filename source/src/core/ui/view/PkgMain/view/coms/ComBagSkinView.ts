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
		this.btn_back.onClick(this, this.backToCharList);
		this.btn_toLeft.onClick(this, this.onBtnToLeftOrRight, [true]);
		this.btn_toRight.onClick(this, this.onBtnToLeftOrRight, [false]);
		this.btn_own.on(fgui.Events.STATE_CHANGED, this, this.onBtnOwnClick);
		$uiUtil.setList(this.list_char, true, this, this.onListCharItemRenderer, this.onListCharItemClick);
		$uiUtil.setList(this.list_skin, true, this, this.onListSkinItemRenderer, this.onListSkinItemClick);

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
	}

	override onEnable() {
		this.backToCharList();
	}

	private refreshListChar() {
		const onlyOwn = this.btn_own.selected;
		this._showChars = this._allChars.filter(v => {
			// 23/12/08 添加起售时间
			if (v.launch_time && $timeUtil.getTimeByString(v.launch_time) > $timeUtil.milliSecond) return false;
			// let isShow = UI_Sushe_Filter.isShowChar(v.id, this.renderFilter);
			// if (!isShow) return;

			if (((v.region_limit && $gameMgr.regionLimited) || onlyOwn) && !$user.character.hasChar(v.id)) {
				const skinIds = this._charSkins[v.id];
				if (skinIds.every(v => !$user.character.hasSkin(v))) return false;
			}
			return true;
		}).map(v => v.id);
		this.list_char.numItems = this._showChars.length;
	}

	private refreshListSkin() {
		const charId = this._showChars[this._showIndex];
		if (!charId) return this.backToCharList();
		const skins = this._charSkins[charId];
		if (!skins) return this.backToCharList();
		const onlyOwn = this.btn_own.selected;
		const cfgChar = $cfgMgr.item_definition.character[charId];
		const ownSkins = skins.filter(v => $user.character.hasSkin(v));
		this.txt_name.text = `${ cfgChar.langField("name") } [size=30]${ ownSkins.length }/${ skins.length }[/size]`;
		this._showSkins = onlyOwn ? ownSkins : skins;
		this.list_skin.numItems = this._showSkins.length;
		this.btn_choosedChar.refresh(charId, $user.character.hasChar(charId));
	}

	private onListCharItemRenderer(index: number, item: RenderBagSkinItem1View) {
		const charId = this._showChars[index];
		item.refresh(charId, $user.character.hasChar(charId));
	}

	private onListCharItemClick(_, __, index: number) {
		this._showIndex = index;
		this.refreshListSkin();
		this.ctrl_type.selectedIndex = 1;
	}

	private onListSkinItemRenderer(index: number, item: RenderBagSkinItem2View) {
		const skinId = this._showSkins[index];
		item.refresh(skinId, $user.character.hasSkin(skinId));
	}

	private onListSkinItemClick(_, __, index: number) {

	}

	private backToCharList(refresh = true) {
		refresh && this.refreshListChar();
		this.ctrl_type.selectedIndex = 0;
	}

	private onBtnToLeftOrRight(toLeft: boolean) {
		let showIndex = this._showIndex + (toLeft ? -1 : 1);
		if (showIndex < 0) showIndex = this._showChars.length - 1;
		else if (showIndex >= this._showChars.length) showIndex = 0;
		this._showIndex = showIndex;
		this.refreshListSkin();
	}

	private onBtnOwnClick() {
		const oldCharId = this._showChars[this._showIndex];
		this.refreshListChar();
		if (this.ctrl_type.selectedIndex == 1) {
			const index = this._showChars.indexOf(oldCharId);
			if (index == -1) {
				this.backToCharList(false);
			} else {
				this._showIndex = index;
				this.refreshListSkin();
			}
		}
	}
}
