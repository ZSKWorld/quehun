declare namespace VO {
	declare interface IBagVO {
		/** 无偿辉玉 */
		get freeDiamonds(): number;
		/** 有偿辉玉 */
		get paidDiamonds(): number;
		/** 辉玉总数 */
		get diamonds(): number;
		/** 无偿服饰券 */
		get freeSkinTickets(): number;
		/** 有偿服饰券 */
		get paidSkinTickets(): number;
		/** 服饰券总数 */
		get skinTickets(): number;
		getRandomCgPath(): string;
		isUsingCG(id: number): boolean;
		changeCGUsing(id: number): void;

		/** 获取物品数量 */
		getItemCount(id: number): number;
		/** 根据类别获取物品列表 */
		getItemByCategory(category: EItemCategory, sort?: boolean): ProtoObject<IItem>[];
		getItemByCategoryType(category: EItemCategory, type: EItemNormalType | EItemGiftType | EItemCommonType, sort?: boolean): ProtoObject<IItem>[];
	}
}