

/**属性类型 */
export const enum AttributeEnum {
    /**攻击 */
    ATK = 1,
    /**防御 */
    DEF,
    /**生命 */
    HP,
    /**命中 */
    DEX,
    /**闪避 */
    Dodge,
    /**暴击 */
    Critical,
    /**暴抗 */
    CriticalResistance,
    /**体质，影响生命 */
    VIT,
    /**力量，影响攻击 */
    Strength,
    /**耐力，影响防御 */
    STA,
    /**身法，影响命中，闪避，暴击，暴抗 */
    AGI,
    /**暴伤，百分比 */
    CriticalHurt,
    /**吸血，百分比 */
    Leech,
    /**减免伤害，百分比 */
    HurtMitigate,
}