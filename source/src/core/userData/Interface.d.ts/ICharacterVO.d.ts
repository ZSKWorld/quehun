declare namespace VO {
	declare interface ICharacterVO {
		/** 是否拥有指定角色 */
		hasChar(id: number): boolean;
		/** 是否拥有指定皮肤 */
		hasSkin(id: number): boolean;
	}
}