import ComBagSkin from "../../../../ui/PkgMain/ComBagSkin";

export const enum EComBagSkinMsg {

}

export class ComBagSkinView extends ExtensionClass<IView, ComBagSkin>(ComBagSkin) implements IView {
	private _allChars: ISheetData_ItemDefinition_Character[];
	private _charSkins: KeyMap<number[]> = {};
	private _showChars: number[] = [];
	private _showSkins: number[] = [];
	override onCreate() {
		this.displayObject.onEnable = this.onEnable.bind(this);
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
		this.btn_own.on(fgui.Events.STATE_CHANGED, this, this.updateShowCharsAndSkins);
	}

	private onEnable() {
		this.updateShowCharsAndSkins();
	}

	private updateShowCharsAndSkins() {
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
		Logger.error(this._showChars.length, this._showChars);
	}

}
