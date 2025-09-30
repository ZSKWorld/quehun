import { BaseData } from "./MessageData";

export class Character extends BaseData implements UserData.ICharacter {
    /** 主角色id */
    character_id: number = 0;
    /** 主角色装扮id */
    skin_id: number = 0;

    /** 角色 */
    characters: ICharacter[] = [];
    /** 皮肤 */
    skins: number[] = [];
    /** 完成结局 */
    finished_endings: number[] = [];
    /** 已领取奖励结局 */
    rewarded_endings: number[] = [];

    has(id: number) {
        return this.characters.find(v => v.charid == id) != null;
    }

    update(data: IAccountUpdate) {
        if (!data) return;
        this.character_id = data.main_character.character_id;
        this.skin_id = data.main_character.skin_id;
        if (data.character) {
            const { characters, skins, finished_endings, rewarded_endings } = data.character;
            if (characters && characters.length) {
                this.characters.push(...characters.map(v => this.decode(v)));
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