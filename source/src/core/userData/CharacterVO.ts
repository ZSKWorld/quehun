import { BaseVO } from "./BaseVO";

export class CharacterVO extends BaseVO implements VO.ICharacterVO {
	private _mainCharId: number = 0;
	private _chars: ProtoObject<ICharacter>[] = [];
	private _starChars: ProtoObject<ICharacter>[] = [];
	private _showChars: ProtoObject<ICharacter>[] = [];
	private _hiddenChars: ProtoObject<ICharacter>[] = [];
	/** 皮肤 */
	private _skins: KeyMap<boolean> = {};
	/** 完成结局 */
	private _finishedEndings: KeyMap<boolean> = {};
	/** 已领取奖励结局 */
	private _rewardedEndings: KeyMap<boolean> = {};
	/** 每日已经送礼次数 */
	private _sendGiftCount: number = 0;
	/** 每日送礼次数上限 */
	private _sendGiftLimit: number = 0;
	/** 星标排序 */
	private _characterSort: number[] = [];
	/** 非星标排序 */
	private _otherCharacterSort: number[] = [];
	/** 屏蔽的角色 */
	private _hiddenCharacters: number[] = [];

	get mainCharId() { return this._mainCharId; }
	get mainChar() {
		const _chars = this._chars;
		const _mainCharId = this._mainCharId;
		const len = _chars.length;
		for (let i = 0; i < len; i++) {
			if (_chars[i].charid == _mainCharId)
				return _chars[i];
		}
	}
	get chars() { return this._chars; }
	get starChars() { return this._starChars; }
	get showChars() { return this._showChars; }
	get hiddenChars() { return this._hiddenChars; }

	hasChar(id: number) {
		const chars = this._chars;
		const len = chars.length;
		for (let i = 0; i < len; i++) {
			if (chars[i].charid == id)
				return true;
		}
		return false;
	}
	getCharInfo(id: number) { return this._chars.find(v => v.charid == id); }
	hasSkin(id: number) { return !!this._skins[id]; }
	isStarChar(id: number) { return this._characterSort.includes(id); }
	isHiddenChar(id: number) { return this._hiddenCharacters.includes(id); }

	changeCharStar(id: number) {
		if (!this.hasChar(id)) return;
		if (this.isHiddenChar(id)) return;
		const _characterSort = [...this._characterSort];
		const _otherCharacterSort = [...this._otherCharacterSort];

		const starIndex = _characterSort.indexOf(id);
		if (starIndex > -1) {
			_characterSort.splice(starIndex, 1);
			_otherCharacterSort.push(id);
		} else {
			_characterSort.push(id);
			const otherIndex = _otherCharacterSort.indexOf(id);
			_otherCharacterSort.splice(otherIndex, 1);
		}
		this.changeCharSort(_characterSort, _otherCharacterSort);
	}

	changeCharSort(sort?: number[], otherSort?: number[], hidden?: number[]) {
		const param: IReqUpdateCharacterSort = {
			sort: sort || this._characterSort,
			other_sort: otherSort || this._otherCharacterSort,
			hidden_characters: hidden || this._hiddenCharacters,
		};
		$netMgr.requests.updateCharacterSort(param);
	}

	@InterestMessage(ENetMessage.fetchCharacterInfo)
	private onFetchCharacterInfo(res: IResCharacterInfo) {
		this._mainCharId = res.main_character_id;
		this._chars = res.characters.map($decodeProtoData);
		this._skins = res.skins.reduce((pv, cv) => (pv[cv] = true, pv), {});
		this._finishedEndings = res.finished_endings.reduce((pv, cv) => (pv[cv] = true, pv), {});
		this._rewardedEndings = res.rewarded_endings.reduce((pv, cv) => (pv[cv] = true, pv), {});

		this._sendGiftCount = res.send_gift_count;
		this._sendGiftLimit = res.send_gift_limit;

		this._hiddenCharacters = [...new Set(res.hidden_characters)];
		this._characterSort = [...new Set(res.character_sort)].filter(v => !this.isHiddenChar(v) && this.hasChar(v));
		this._otherCharacterSort = [...new Set(res.other_character_sort)].filter(v => !this.isHiddenChar(v) && this.hasChar(v));
		this._chars.forEach(v => {
			if (this.isHiddenChar(v.charid)) return;
			if (this.isStarChar(v.charid)) return;
			if (this._otherCharacterSort.includes(v.charid)) return;
			this._otherCharacterSort.push(v.charid);
		});
		this.updateKindOfChars();
		this.updateCharDefaultSkin();
		this.dispatch(EUserEvent.OnMainCharacterChanged);
		this.dispatch(EUserEvent.OnCharacterChanged);
		this.dispatch(EUserEvent.OnCharacterSortChanged);
	}

	@InterestMessage(ENetNotify.NotifyAccountUpdate)
	private onNotifyAccountUpdate(data: IAccountUpdate) {
		const { main_character, character } = data;
		if (main_character) {
			this._mainCharId = main_character.character_id;
			this.mainChar.skin = main_character.skin_id;
			this.dispatch(EUserEvent.OnMainCharacterChanged);
		}
		if (character) {
			const { characters, skins, finished_endings, rewarded_endings } = character;
			characters.forEach(v => {
				const index = this._chars.findIndex(e => e.charid == v.charid);
				if (index == -1) this._chars.push($decodeProtoData(v));
				else this._chars[index] = $decodeProtoData(v);
			});
			skins.forEach(v => this._skins[v] = true);
			finished_endings.forEach(v => this._finishedEndings[v] = true);
			rewarded_endings.forEach(v => this._rewardedEndings[v] = true);
			this.updateCharDefaultSkin();
			this.dispatch(EUserEvent.OnCharacterChanged);
		}
	}

	@InterestMessage(ENetMessage.updateCharacterSort)
	private onUpdateCharacterSort(res: IResCommon, req: IReqUpdateCharacterSort) {
		this._characterSort = req.sort;
		this._otherCharacterSort = req.other_sort;
		this._hiddenCharacters = req.hidden_characters;
		this.updateKindOfChars();
		this.dispatch(EUserEvent.OnCharacterSortChanged);
	}

	private updateKindOfChars() {
		this._starChars = this._characterSort.map(v => this.getCharInfo(v));
		this._showChars = [...this._characterSort, ...this._otherCharacterSort].map(v => this.getCharInfo(v));
		this._hiddenChars = this._hiddenCharacters.map(v => this.getCharInfo(v));
	}

	private updateCharDefaultSkin() {
		for (const e of this._chars) {
			const cfgChar = $cfgMgr.item_definition.character[e.charid];
			if (!cfgChar) continue;
			this._skins[cfgChar.init_skin] = true;
		}
	}
}