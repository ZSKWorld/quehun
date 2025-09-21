export class Character implements UserData.ICharacter{
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
        if (data.main_character) {
            this.character_id = data.main_character.character_id;
            this.skin_id = data.main_character.skin_id;
        }
        if (data.character) {
            const { characters, skins, finished_endings, rewarded_endings } = data.character;
            if (characters && characters.length) {
                characters.forEach(v => {
                    const newChar: ICharacter = {
                        charid: v.charid,
                        level: v.level,
                        exp: v.exp,
                        views: [],
                        skin: v.skin,
                        is_upgraded: v.is_upgraded,
                        extra_emoji: [...v.extra_emoji],
                        rewarded_level: [...v.rewarded_level],
                    };
                    v.views.forEach(view => {
                        const newView: IViewSlot = {
                            slot: view.slot,
                            item_id: view.item_id,
                            type: view.type,
                            item_id_list: [...view.item_id_list],
                        };
                        newChar.views.push(newView)
                    });
                    this.characters.push(newChar);
                });
            }
            if (skins && skins.length) {
                skins.forEach(v => this.skins.push(v));
            }
            if (finished_endings && finished_endings.length) {
                finished_endings.forEach(v => this.finished_endings.push(v));
            }
            if (rewarded_endings && rewarded_endings.length) {
                rewarded_endings.forEach(v => this.rewarded_endings.push(v));
            }
        }
    }
}