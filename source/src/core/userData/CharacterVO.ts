import { BaseVO } from "./BaseVO";

export class CharacterVO extends BaseVO implements VO.ICharacterVO {
	/** 主角色id */
	characterId: number = 0;
	/** 主角色装扮id */
	skinId: number = 0;

	/** 角色 */
	characters: KeyMap<ICharacter> = {};
	/** 皮肤 */
	skins: KeyMap<boolean> = {};
	/** 完成结局 */
	finishedEndings: KeyMap<boolean> = {};
	/** 已领取奖励结局 */
	rewardedEndings: KeyMap<boolean> = {};
	/** 每日已经送礼次数 */
	sendGiftCount: number = 0;
	/** 每日送礼次数上限 */
	sendGiftLimit: number = 0;
	/** 星标排序 */
	characterSort: number[] = [];
	/** 屏蔽的角色 */
	hiddenCharacters: number[] = [];
	/** 非星标排序 */
	otherCharacterSort: number[] = [];

	hasChar(id: number) { return !!this.characters[id]; }

	hasSkin(id: number) { return !!this.skins[id]; }

	@InterestMessage(EMessageID.fetchCharacterInfo)
	private onFetchCharacterInfo(res: IResCharacterInfo) {
		this.characterId = res.main_character_id;
		this.skinId = res.characters.find(v => v.charid == this.characterId).skin;
		this.characters = res.characters.reduce((pv, cv) => (pv[cv.charid] = $decodeProtoData(cv), pv), {});
		this.skins = res.skins.reduce((pv, cv) => (pv[cv] = true, pv), {});
		this.finishedEndings = res.finished_endings.reduce((pv, cv) => (pv[cv] = true, pv), {});
		this.rewardedEndings = res.rewarded_endings.reduce((pv, cv) => (pv[cv] = true, pv), {});

		this.sendGiftCount = res.send_gift_count;
		this.sendGiftLimit = res.send_gift_limit;
		this.characterSort = [...res.character_sort];
		this.hiddenCharacters = [...res.hidden_characters];
		this.otherCharacterSort = [...res.other_character_sort];

		this.refreshCharDefaultSkin();
	}

	@InterestMessage(ENotify.NotifyAccountUpdate)
	private onNotifyAccountUpdate(data: IAccountUpdate) {
		const { main_character, character } = data;
		if (main_character) {
			this.characterId = main_character.character_id;
			this.skinId = main_character.skin_id;
		}
		if (character) {
			const { characters, skins, finished_endings, rewarded_endings } = character;
			characters.forEach(v => this.characters[v.charid] = $decodeProtoData(v));
			skins.forEach(v => this.skins[v] = true);
			finished_endings.forEach(v => this.finishedEndings[v] = true);
			rewarded_endings.forEach(v => this.rewardedEndings[v] = true);
			this.refreshCharDefaultSkin();
		}
	}

	private refreshCharDefaultSkin() {
		for (const key in this.characters) {
			const e = this.characters[key];
			const cfgChar = $cfgMgr.item_definition.character[e.charid];
			if (!cfgChar) continue;
			this.skins[cfgChar.init_skin] = true;
		}
	}
}