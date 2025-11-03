import { BaseVO } from "./BaseVO";

export class CharacterVO extends BaseVO implements VO.ICharacterVO {
	/** 主角色id */
	character_id: number = 0;
	/** 主角色装扮id */
	skin_id: number = 0;

	/** 角色 */
	characters: ProtoObject<ICharacter>[] = [];
	/** 皮肤 */
	skins: number[] = [];
	/** 完成结局 */
	finished_endings: number[] = [];
	/** 已领取奖励结局 */
	rewarded_endings: number[] = [];
	/** 每日已经送礼次数 */
	send_gift_count: number = 0;
	/** 每日送礼次数上限 */
	send_gift_limit: number = 0;
	/** 星标排序 */
	character_sort: number[];
	hidden_characters: number[];
	/** 非星标排序 */
	other_character_sort: number[];

	has(id: number) {
		return this.characters.find(v => v.charid == id) != null;
	}

	@InterestMessage(EMessageID.fetchCharacterInfo)
	private onFetchCharacterInfo(res: IResCharacterInfo) {
		if (res.error) return;
		this.character_id = res.main_character_id;
		this.skin_id = res.characters.find(v => v.charid == this.character_id).skin;
		this.characters = res.characters.map(this.decodeProtoData);
		this.skins = [...res.skins];
		this.finished_endings = [...res.finished_endings];
		this.rewarded_endings = [...res.rewarded_endings];
		this.send_gift_count = res.send_gift_count;
		this.send_gift_limit = res.send_gift_limit;
		this.character_sort = [...res.character_sort];
		this.hidden_characters = [...res.hidden_characters];
		this.other_character_sort = [...res.other_character_sort];
	}

	@InterestMessage(ENotify.NotifyAccountUpdate)
	private onNotifyAccountUpdate(data: IAccountUpdate) {
		const { main_character, character } = data;
		if (main_character) {
			this.character_id = main_character.character_id;
			this.skin_id = main_character.skin_id;
		}
		if (character) {
			const { characters, skins, finished_endings, rewarded_endings } = character;
			if (characters && characters.length) {
				this.characters.push(...characters.map(v => this.decodeProtoData(v)));
			}
			if (skins && skins.length) {
				this.skins.push(...skins);
			}
			if (finished_endings && finished_endings.length) {
				this.finished_endings.push(...finished_endings);
			}
			if (rewarded_endings && rewarded_endings.length) {
				this.rewarded_endings.push(...rewarded_endings);
			}
		}
	}
}