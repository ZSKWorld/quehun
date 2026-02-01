declare namespace VO {
	declare interface ICharacterVO {
		/** 主角色ID */
		get mainCharId(): number;
		/** 主角色信息 */
		get mainChar(): ProtoObject<ICharacter>;
		/** 所有角色信息 */
		get chars(): ReadonlyArray<ProtoObject<ICharacter>>;
		/** 星标角色信息 */
		get starChars(): ReadonlyArray<ProtoObject<ICharacter>>;
		/** 非星标角色信息 */
		get otherChars(): ReadonlyArray<ProtoObject<ICharacter>>;
		/** 隐藏角色信息 */
		get hiddenChars(): ReadonlyArray<ProtoObject<ICharacter>>;
		/** 是否拥有指定角色 */
		hasChar(id: number): boolean;
		/** 是否拥有指定皮肤 */
		hasSkin(id: number): boolean;
		/** 是否是星标角色 */
		isStarChar(id: number): boolean;
	}
}