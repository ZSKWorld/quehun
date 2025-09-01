import { MathUtil } from "../common/math/MathUtil";
import { GameUtil } from "../common/utils/GameUtil";
import { AttributeEnum } from "./const/AttributeEnum";

class UserBaseData {
    /** 每级基础攻击力 level ^ 2.3 * 100 */
    static baseATK(level: number) {
        return Math.floor(level ** 2.3 * 100);
    }

    static baseDEF(level: number) {
        return 0;
    }

    /** 每级基础血量 level ^ 3 * 100 */
    static baseHP(level: number) {
        return level ** 3 * 100;
    }
}

export class UserUtil {
    /** 每级所需经验 level ^ 4 * 10 */
    static levelExp(level: number) {
        const { jingJie } = this.levelToJingJie(level);
        if (!cfgMgr.JingJie[jingJie + 1]) return 0;
        return level ** 4 * 100;
    }

    /** 等级转境界 */
    static levelToJingJie(level: number) {
        let jingJie = 0;
        let cengJi = 0;
        const maxCengJie = +cfgMgr.Const[1005].value;
        if (level % maxCengJie == 0) {
            jingJie = level / maxCengJie;
            cengJi = maxCengJie;
        } else {
            jingJie = Math.floor(level / maxCengJie);
            cengJi = level - jingJie * maxCengJie;
            jingJie += 1;
        }
        return { jingJie, cengJi };
    }

    /** 获取境界字符串 */
    static getLevelStr(level: number) {
        const { jingJie, cengJi } = this.levelToJingJie(level);
        return cfgMgr.JingJie[jingJie].name + (cengJi ? (MathUtil.toChineseNum(cengJi) + "层") : "");
    }

    static getAttributeName = (function () {
        const strs = [
            "", "攻击", "防御", "生命", "命中", "闪避", "暴击", "暴抗", "体质", "力量", "耐力", "身法", "暴伤", "吸血", "减免伤害",
        ];
        return function (attriType: AttributeEnum) {
            return strs[attriType];
        };
    })();

    static isEquip(id: number) {
        return !!cfgMgr.Equipment[id];
    }

    static canUseItem(id: number) {
        return !!(cfgMgr.Props[id] || cfgMgr.Food[id] || cfgMgr.SkillBook[id] || cfgMgr.XinFaBook[id]);
    }

    static getEquipInfoStr(equip: IEquipment, hasGem: boolean) {
        const strs: string[] = [];
        if (equip) {
            const dressed = userData.body.getDressedEquip(equip.part) == equip;
            strs.push(
                equip.colorLevelName + (dressed ? "&nbsp;(已装备)" : ""),
                this.getEquipStartStr(equip.star),
                equip.infoStr
            );
            const gems = hasGem ? userData.body.getEquipGems(equip.part) : null;
            if (gems) {
                const tableItem = cfgMgr.Item;
                const [gem0, gem1, gem2, gem3] = gems;
                const { quality: quality0, name: name0 } = gem0 ? tableItem[gem0] : {} as any;
                const { quality: quality1, name: name1 } = gem1 ? tableItem[gem1] : {} as any;
                const { quality: quality2, name: name2 } = gem2 ? tableItem[gem2] : {} as any;
                const { quality: quality3, name: name3 } = gem3 ? tableItem[gem3] : {} as any;
                strs.push(
                    `孔1:${ gem0 ? GameUtil.getColorStr(quality0, name0) : "空" }`,
                    `孔2:${ gem1 ? GameUtil.getColorStr(quality1, name1) : "空" }`,
                    `孔3:${ gem2 ? GameUtil.getColorStr(quality2, name2) : "空" }`,
                    `孔4:${ gem3 ? GameUtil.getColorStr(quality3, name3) : "空" }`,
                );
            }
            strs.push("评分:2.5万");
        }
        return strs.join("<br/>");
    }

    private static getEquipStartStr(star: number) {
        const maxStar = +cfgMgr.Const[1010].value;
        star = MathUtil.clamp(star, 0, maxStar);
        let result = "";
        for (let i = 1; i <= maxStar; i++) {
            result += (star >= i ? "★" : "☆");
        }
        return result;
    }
}