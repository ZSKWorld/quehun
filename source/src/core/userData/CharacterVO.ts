import { BaseVO } from "./BaseVO";

export class CharacterVO extends BaseVO implements VO.ICharacterVO {
	/** 主角色id */
	private _mainCharId: number = 0;
	/** 角色 */
	private _chars: ProtoObject<ICharacter>[] = [];
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
	/** 屏蔽的角色 */
	private _hiddenCharacters: number[] = [];
	/** 非星标排序 */
	private _otherCharacterSort: number[] = [];

	get chars() { return this._chars; }

	private get mainChar() {
		const _chars = this._chars;
		const _mainCharId = this._mainCharId;
		const len = _chars.length;
		for (let i = 0; i < len; i++) {
			if (_chars[i].charid == _mainCharId)
				return _chars[i];
		}
	}

	hasChar(id: number) {
		const chars = this._chars;
		const len = chars.length;
		for (let i = 0; i < len; i++) {
			if (chars[i].charid == id)
				return true;
		}
		return false;
	}

	hasSkin(id: number) { return !!this._skins[id]; }

	@InterestMessage(EMessageID.fetchCharacterInfo)
	private onFetchCharacterInfo(res: IResCharacterInfo) {
		this._mainCharId = res.main_character_id;
		this._chars = res.characters.map($decodeProtoData);
		this._skins = res.skins.reduce((pv, cv) => (pv[cv] = true, pv), {});
		this._finishedEndings = res.finished_endings.reduce((pv, cv) => (pv[cv] = true, pv), {});
		this._rewardedEndings = res.rewarded_endings.reduce((pv, cv) => (pv[cv] = true, pv), {});

		this._sendGiftCount = res.send_gift_count;
		this._sendGiftLimit = res.send_gift_limit;
		this._characterSort = [...res.character_sort];
		this._hiddenCharacters = [...res.hidden_characters];
		this._otherCharacterSort = [...res.other_character_sort];

		this.refreshCharDefaultSkin();
	}

	@InterestMessage(ENotify.NotifyAccountUpdate)
	private onNotifyAccountUpdate(data: IAccountUpdate) {
		const { main_character, character } = data;
		if (main_character) {
			this._mainCharId = main_character.character_id;
			this.mainChar.skin = main_character.skin_id;
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
			this.refreshCharDefaultSkin();
		}
	}

	private refreshCharDefaultSkin() {
		for (const e of this._chars) {
			const cfgChar = $cfgMgr.item_definition.character[e.charid];
			if (!cfgChar) continue;
			this._skins[cfgChar.init_skin] = true;
		}
	}
}