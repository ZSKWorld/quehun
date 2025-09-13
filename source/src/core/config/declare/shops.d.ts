declare interface ITable_Shops {
	/** 杂货铺商品列表  ---  unique */
	zhp_goods: CfgExt<ISheet_Shops_ZhpGoods>;
	/** 杂货铺组刷新个数  ---  unique */
	zhp_refresh_group: CfgExt<ISheet_Shops_ZhpRefreshGroup>;
	/** 杂货铺刷新价格曲线  ---  unique */
	zhp_refresh_price: CfgExt<ISheet_Shops_ZhpRefreshPrice>;
	/** 通用商品列表  ---  unique */
	goods: CfgExt<ISheet_Shops_Goods>;
	/** 商品组成的礼包（goods_package）  ---  group */
	goods_package: CfgExt<ISheet_Shops_GoodsPackage>;
	/** 定期刷新商店（插画屋）  ---  group */
	interval_refresh_goods: CfgExt<ISheet_Shops_IntervalRefreshGoods>;
	/** 道具组成的礼包（item_package）  ---  unique */
	item_package: CfgExt<ISheet_Shops_ItemPackage>;
	/** 自选商品包（selected_package）  ---  group */
	selected_package: CfgExt<ISheet_Shops_SelectedPackage>;
}

//#region zhp_goods
declare interface ISheet_Shops_ZhpGoods {
	1: ISheetData_Shops_ZhpGoods;
	2: ISheetData_Shops_ZhpGoods;
	3: ISheetData_Shops_ZhpGoods;
	4: ISheetData_Shops_ZhpGoods;
	5: ISheetData_Shops_ZhpGoods;
	6: ISheetData_Shops_ZhpGoods;
	7: ISheetData_Shops_ZhpGoods;
	8: ISheetData_Shops_ZhpGoods;
	9: ISheetData_Shops_ZhpGoods;
	10: ISheetData_Shops_ZhpGoods;
	11: ISheetData_Shops_ZhpGoods;
	12: ISheetData_Shops_ZhpGoods;
	13: ISheetData_Shops_ZhpGoods;
	14: ISheetData_Shops_ZhpGoods;
	15: ISheetData_Shops_ZhpGoods;
	16: ISheetData_Shops_ZhpGoods;
	17: ISheetData_Shops_ZhpGoods;
	18: ISheetData_Shops_ZhpGoods;
	19: ISheetData_Shops_ZhpGoods;
	20: ISheetData_Shops_ZhpGoods;
	21: ISheetData_Shops_ZhpGoods;
	22: ISheetData_Shops_ZhpGoods;
	23: ISheetData_Shops_ZhpGoods;
	24: ISheetData_Shops_ZhpGoods;
}
declare interface ISheetData_Shops_ZhpGoods {
	id: number;
	/** 图标 */
	icon: string;
	/** 名称 */
	name_chs: string;
	name_chs_t: string;
	name_jp: string;
	name_en: string;
	/** 物品ID */
	item_id: number;
	name_kr: string;
	/** 购买数量限制 */
	buy_limit: number;
	/** 货币种类 */
	currency: number;
	/** 单价 */
	price: number;
	/** 需要指定购买数量 */
	need_amount: number;
	/** 刷新组 */
	refresh_group: number;
	/** 刷新权重 */
	refresh_weight: number;
	/** 显示已拥有数量 */
	show_has: number;
}
//#endregion

//#region zhp_refresh_group
declare interface ISheet_Shops_ZhpRefreshGroup {
	1: ISheetData_Shops_ZhpRefreshGroup;
	2: ISheetData_Shops_ZhpRefreshGroup;
	3: ISheetData_Shops_ZhpRefreshGroup;
}
declare interface ISheetData_Shops_ZhpRefreshGroup {
	/** 刷新组id */
	id: number;
	/** 刷新数量 */
	refresh_count: number;
}
//#endregion

//#region zhp_refresh_price
declare interface ISheet_Shops_ZhpRefreshPrice {
	1: ISheetData_Shops_ZhpRefreshPrice;
	2: ISheetData_Shops_ZhpRefreshPrice;
	3: ISheetData_Shops_ZhpRefreshPrice;
	4: ISheetData_Shops_ZhpRefreshPrice;
	5: ISheetData_Shops_ZhpRefreshPrice;
	6: ISheetData_Shops_ZhpRefreshPrice;
	7: ISheetData_Shops_ZhpRefreshPrice;
	8: ISheetData_Shops_ZhpRefreshPrice;
	9: ISheetData_Shops_ZhpRefreshPrice;
	10: ISheetData_Shops_ZhpRefreshPrice;
	11: ISheetData_Shops_ZhpRefreshPrice;
	12: ISheetData_Shops_ZhpRefreshPrice;
	13: ISheetData_Shops_ZhpRefreshPrice;
	14: ISheetData_Shops_ZhpRefreshPrice;
	15: ISheetData_Shops_ZhpRefreshPrice;
	16: ISheetData_Shops_ZhpRefreshPrice;
	17: ISheetData_Shops_ZhpRefreshPrice;
	18: ISheetData_Shops_ZhpRefreshPrice;
	19: ISheetData_Shops_ZhpRefreshPrice;
	20: ISheetData_Shops_ZhpRefreshPrice;
	21: ISheetData_Shops_ZhpRefreshPrice;
	22: ISheetData_Shops_ZhpRefreshPrice;
	23: ISheetData_Shops_ZhpRefreshPrice;
	24: ISheetData_Shops_ZhpRefreshPrice;
	25: ISheetData_Shops_ZhpRefreshPrice;
	26: ISheetData_Shops_ZhpRefreshPrice;
	27: ISheetData_Shops_ZhpRefreshPrice;
	28: ISheetData_Shops_ZhpRefreshPrice;
	29: ISheetData_Shops_ZhpRefreshPrice;
	30: ISheetData_Shops_ZhpRefreshPrice;
	31: ISheetData_Shops_ZhpRefreshPrice;
	32: ISheetData_Shops_ZhpRefreshPrice;
	33: ISheetData_Shops_ZhpRefreshPrice;
	34: ISheetData_Shops_ZhpRefreshPrice;
	35: ISheetData_Shops_ZhpRefreshPrice;
	36: ISheetData_Shops_ZhpRefreshPrice;
	37: ISheetData_Shops_ZhpRefreshPrice;
	38: ISheetData_Shops_ZhpRefreshPrice;
	39: ISheetData_Shops_ZhpRefreshPrice;
	40: ISheetData_Shops_ZhpRefreshPrice;
	41: ISheetData_Shops_ZhpRefreshPrice;
	42: ISheetData_Shops_ZhpRefreshPrice;
	43: ISheetData_Shops_ZhpRefreshPrice;
	44: ISheetData_Shops_ZhpRefreshPrice;
	45: ISheetData_Shops_ZhpRefreshPrice;
	46: ISheetData_Shops_ZhpRefreshPrice;
	47: ISheetData_Shops_ZhpRefreshPrice;
	48: ISheetData_Shops_ZhpRefreshPrice;
	49: ISheetData_Shops_ZhpRefreshPrice;
	50: ISheetData_Shops_ZhpRefreshPrice;
	51: ISheetData_Shops_ZhpRefreshPrice;
	52: ISheetData_Shops_ZhpRefreshPrice;
	53: ISheetData_Shops_ZhpRefreshPrice;
	54: ISheetData_Shops_ZhpRefreshPrice;
	55: ISheetData_Shops_ZhpRefreshPrice;
	56: ISheetData_Shops_ZhpRefreshPrice;
	57: ISheetData_Shops_ZhpRefreshPrice;
	58: ISheetData_Shops_ZhpRefreshPrice;
	59: ISheetData_Shops_ZhpRefreshPrice;
	60: ISheetData_Shops_ZhpRefreshPrice;
	61: ISheetData_Shops_ZhpRefreshPrice;
	62: ISheetData_Shops_ZhpRefreshPrice;
	63: ISheetData_Shops_ZhpRefreshPrice;
	64: ISheetData_Shops_ZhpRefreshPrice;
	65: ISheetData_Shops_ZhpRefreshPrice;
	66: ISheetData_Shops_ZhpRefreshPrice;
	67: ISheetData_Shops_ZhpRefreshPrice;
	68: ISheetData_Shops_ZhpRefreshPrice;
	69: ISheetData_Shops_ZhpRefreshPrice;
	70: ISheetData_Shops_ZhpRefreshPrice;
	71: ISheetData_Shops_ZhpRefreshPrice;
	72: ISheetData_Shops_ZhpRefreshPrice;
	73: ISheetData_Shops_ZhpRefreshPrice;
	74: ISheetData_Shops_ZhpRefreshPrice;
	75: ISheetData_Shops_ZhpRefreshPrice;
	76: ISheetData_Shops_ZhpRefreshPrice;
	77: ISheetData_Shops_ZhpRefreshPrice;
	78: ISheetData_Shops_ZhpRefreshPrice;
	79: ISheetData_Shops_ZhpRefreshPrice;
	80: ISheetData_Shops_ZhpRefreshPrice;
	81: ISheetData_Shops_ZhpRefreshPrice;
	82: ISheetData_Shops_ZhpRefreshPrice;
	83: ISheetData_Shops_ZhpRefreshPrice;
	84: ISheetData_Shops_ZhpRefreshPrice;
	85: ISheetData_Shops_ZhpRefreshPrice;
	86: ISheetData_Shops_ZhpRefreshPrice;
	87: ISheetData_Shops_ZhpRefreshPrice;
	88: ISheetData_Shops_ZhpRefreshPrice;
	89: ISheetData_Shops_ZhpRefreshPrice;
	90: ISheetData_Shops_ZhpRefreshPrice;
	91: ISheetData_Shops_ZhpRefreshPrice;
	92: ISheetData_Shops_ZhpRefreshPrice;
	93: ISheetData_Shops_ZhpRefreshPrice;
	94: ISheetData_Shops_ZhpRefreshPrice;
	95: ISheetData_Shops_ZhpRefreshPrice;
	96: ISheetData_Shops_ZhpRefreshPrice;
	97: ISheetData_Shops_ZhpRefreshPrice;
	98: ISheetData_Shops_ZhpRefreshPrice;
	99: ISheetData_Shops_ZhpRefreshPrice;
	100: ISheetData_Shops_ZhpRefreshPrice;
}
declare interface ISheetData_Shops_ZhpRefreshPrice {
	/** 组id */
	id: number;
	/** 刷新价格 */
	refresh_price: number;
}
//#endregion

//#region goods
declare interface ISheet_Shops_Goods {
	1001: ISheetData_Shops_Goods;
	1002: ISheetData_Shops_Goods;
	1003: ISheetData_Shops_Goods;
	1004: ISheetData_Shops_Goods;
	1005: ISheetData_Shops_Goods;
	1006: ISheetData_Shops_Goods;
	1007: ISheetData_Shops_Goods;
	1008: ISheetData_Shops_Goods;
	1009: ISheetData_Shops_Goods;
	1010: ISheetData_Shops_Goods;
	1011: ISheetData_Shops_Goods;
	1012: ISheetData_Shops_Goods;
	1013: ISheetData_Shops_Goods;
	1014: ISheetData_Shops_Goods;
	1015: ISheetData_Shops_Goods;
	1016: ISheetData_Shops_Goods;
	2001: ISheetData_Shops_Goods;
	2002: ISheetData_Shops_Goods;
	2003: ISheetData_Shops_Goods;
	2005: ISheetData_Shops_Goods;
	2006: ISheetData_Shops_Goods;
	2007: ISheetData_Shops_Goods;
	2008: ISheetData_Shops_Goods;
	2009: ISheetData_Shops_Goods;
	2010: ISheetData_Shops_Goods;
	2011: ISheetData_Shops_Goods;
	2012: ISheetData_Shops_Goods;
	2101: ISheetData_Shops_Goods;
	2102: ISheetData_Shops_Goods;
	2103: ISheetData_Shops_Goods;
	2104: ISheetData_Shops_Goods;
	2105: ISheetData_Shops_Goods;
	2201: ISheetData_Shops_Goods;
	2202: ISheetData_Shops_Goods;
	3001: ISheetData_Shops_Goods;
	3002: ISheetData_Shops_Goods;
	3003: ISheetData_Shops_Goods;
	3004: ISheetData_Shops_Goods;
	4001: ISheetData_Shops_Goods;
	4002: ISheetData_Shops_Goods;
	5001: ISheetData_Shops_Goods;
	5002: ISheetData_Shops_Goods;
	5003: ISheetData_Shops_Goods;
	5004: ISheetData_Shops_Goods;
	5011: ISheetData_Shops_Goods;
	5012: ISheetData_Shops_Goods;
	5013: ISheetData_Shops_Goods;
	5014: ISheetData_Shops_Goods;
	5021: ISheetData_Shops_Goods;
	5022: ISheetData_Shops_Goods;
	5023: ISheetData_Shops_Goods;
	5024: ISheetData_Shops_Goods;
	5025: ISheetData_Shops_Goods;
	5026: ISheetData_Shops_Goods;
	5027: ISheetData_Shops_Goods;
	5028: ISheetData_Shops_Goods;
	5029: ISheetData_Shops_Goods;
	5030: ISheetData_Shops_Goods;
	5031: ISheetData_Shops_Goods;
	5032: ISheetData_Shops_Goods;
	5033: ISheetData_Shops_Goods;
	5034: ISheetData_Shops_Goods;
	5035: ISheetData_Shops_Goods;
	5036: ISheetData_Shops_Goods;
	5037: ISheetData_Shops_Goods;
	5038: ISheetData_Shops_Goods;
	5039: ISheetData_Shops_Goods;
	5040: ISheetData_Shops_Goods;
	5041: ISheetData_Shops_Goods;
	5042: ISheetData_Shops_Goods;
	5043: ISheetData_Shops_Goods;
	5044: ISheetData_Shops_Goods;
	5045: ISheetData_Shops_Goods;
	5046: ISheetData_Shops_Goods;
	5047: ISheetData_Shops_Goods;
	5048: ISheetData_Shops_Goods;
	5049: ISheetData_Shops_Goods;
	5050: ISheetData_Shops_Goods;
	5051: ISheetData_Shops_Goods;
	5052: ISheetData_Shops_Goods;
	5053: ISheetData_Shops_Goods;
	5054: ISheetData_Shops_Goods;
	5055: ISheetData_Shops_Goods;
	5056: ISheetData_Shops_Goods;
	5057: ISheetData_Shops_Goods;
	5058: ISheetData_Shops_Goods;
	5059: ISheetData_Shops_Goods;
	5060: ISheetData_Shops_Goods;
	5061: ISheetData_Shops_Goods;
	5062: ISheetData_Shops_Goods;
	5063: ISheetData_Shops_Goods;
	5064: ISheetData_Shops_Goods;
	5065: ISheetData_Shops_Goods;
	5066: ISheetData_Shops_Goods;
	5067: ISheetData_Shops_Goods;
	5068: ISheetData_Shops_Goods;
	5069: ISheetData_Shops_Goods;
	5070: ISheetData_Shops_Goods;
	5071: ISheetData_Shops_Goods;
	5072: ISheetData_Shops_Goods;
	5073: ISheetData_Shops_Goods;
	5074: ISheetData_Shops_Goods;
	5075: ISheetData_Shops_Goods;
	5076: ISheetData_Shops_Goods;
	5077: ISheetData_Shops_Goods;
	5078: ISheetData_Shops_Goods;
	5079: ISheetData_Shops_Goods;
	5080: ISheetData_Shops_Goods;
	5081: ISheetData_Shops_Goods;
	5082: ISheetData_Shops_Goods;
	5083: ISheetData_Shops_Goods;
	5084: ISheetData_Shops_Goods;
	5085: ISheetData_Shops_Goods;
	5086: ISheetData_Shops_Goods;
	5087: ISheetData_Shops_Goods;
	5088: ISheetData_Shops_Goods;
	5089: ISheetData_Shops_Goods;
	5090: ISheetData_Shops_Goods;
	5091: ISheetData_Shops_Goods;
	5092: ISheetData_Shops_Goods;
	5093: ISheetData_Shops_Goods;
	5094: ISheetData_Shops_Goods;
	5095: ISheetData_Shops_Goods;
	5096: ISheetData_Shops_Goods;
	5097: ISheetData_Shops_Goods;
	5098: ISheetData_Shops_Goods;
	5099: ISheetData_Shops_Goods;
	5100: ISheetData_Shops_Goods;
	5101: ISheetData_Shops_Goods;
	5102: ISheetData_Shops_Goods;
	5103: ISheetData_Shops_Goods;
	5104: ISheetData_Shops_Goods;
	5105: ISheetData_Shops_Goods;
	5106: ISheetData_Shops_Goods;
	5107: ISheetData_Shops_Goods;
	5108: ISheetData_Shops_Goods;
	5109: ISheetData_Shops_Goods;
	5110: ISheetData_Shops_Goods;
	5111: ISheetData_Shops_Goods;
	5112: ISheetData_Shops_Goods;
	5113: ISheetData_Shops_Goods;
	5114: ISheetData_Shops_Goods;
	5115: ISheetData_Shops_Goods;
	5116: ISheetData_Shops_Goods;
	5117: ISheetData_Shops_Goods;
	5118: ISheetData_Shops_Goods;
	5119: ISheetData_Shops_Goods;
	5120: ISheetData_Shops_Goods;
	5121: ISheetData_Shops_Goods;
	5122: ISheetData_Shops_Goods;
	5123: ISheetData_Shops_Goods;
	5124: ISheetData_Shops_Goods;
	5125: ISheetData_Shops_Goods;
	5126: ISheetData_Shops_Goods;
	5127: ISheetData_Shops_Goods;
	5128: ISheetData_Shops_Goods;
	5129: ISheetData_Shops_Goods;
	5130: ISheetData_Shops_Goods;
	5131: ISheetData_Shops_Goods;
	5132: ISheetData_Shops_Goods;
	5133: ISheetData_Shops_Goods;
	5134: ISheetData_Shops_Goods;
	5135: ISheetData_Shops_Goods;
	5136: ISheetData_Shops_Goods;
	5137: ISheetData_Shops_Goods;
	5138: ISheetData_Shops_Goods;
	5139: ISheetData_Shops_Goods;
	5140: ISheetData_Shops_Goods;
	5141: ISheetData_Shops_Goods;
	5142: ISheetData_Shops_Goods;
	5143: ISheetData_Shops_Goods;
	5144: ISheetData_Shops_Goods;
	5145: ISheetData_Shops_Goods;
	5146: ISheetData_Shops_Goods;
	5147: ISheetData_Shops_Goods;
	5148: ISheetData_Shops_Goods;
	5149: ISheetData_Shops_Goods;
	5150: ISheetData_Shops_Goods;
	5151: ISheetData_Shops_Goods;
	5152: ISheetData_Shops_Goods;
	5153: ISheetData_Shops_Goods;
	5154: ISheetData_Shops_Goods;
	5155: ISheetData_Shops_Goods;
	5156: ISheetData_Shops_Goods;
	5157: ISheetData_Shops_Goods;
	5158: ISheetData_Shops_Goods;
	5159: ISheetData_Shops_Goods;
	5160: ISheetData_Shops_Goods;
	5161: ISheetData_Shops_Goods;
	5162: ISheetData_Shops_Goods;
	5163: ISheetData_Shops_Goods;
	5164: ISheetData_Shops_Goods;
	5165: ISheetData_Shops_Goods;
	5166: ISheetData_Shops_Goods;
	5167: ISheetData_Shops_Goods;
	5168: ISheetData_Shops_Goods;
	5169: ISheetData_Shops_Goods;
	5170: ISheetData_Shops_Goods;
	5171: ISheetData_Shops_Goods;
	5172: ISheetData_Shops_Goods;
	5173: ISheetData_Shops_Goods;
	5174: ISheetData_Shops_Goods;
	5175: ISheetData_Shops_Goods;
	5176: ISheetData_Shops_Goods;
	5177: ISheetData_Shops_Goods;
	5178: ISheetData_Shops_Goods;
	5179: ISheetData_Shops_Goods;
	5180: ISheetData_Shops_Goods;
	5181: ISheetData_Shops_Goods;
	5182: ISheetData_Shops_Goods;
	5183: ISheetData_Shops_Goods;
	5184: ISheetData_Shops_Goods;
	5185: ISheetData_Shops_Goods;
	5186: ISheetData_Shops_Goods;
	5187: ISheetData_Shops_Goods;
	5188: ISheetData_Shops_Goods;
	5189: ISheetData_Shops_Goods;
	5190: ISheetData_Shops_Goods;
	5191: ISheetData_Shops_Goods;
	5192: ISheetData_Shops_Goods;
	5193: ISheetData_Shops_Goods;
	5194: ISheetData_Shops_Goods;
	5195: ISheetData_Shops_Goods;
	5196: ISheetData_Shops_Goods;
	5197: ISheetData_Shops_Goods;
	5198: ISheetData_Shops_Goods;
	5199: ISheetData_Shops_Goods;
	5200: ISheetData_Shops_Goods;
	5201: ISheetData_Shops_Goods;
	5202: ISheetData_Shops_Goods;
	5203: ISheetData_Shops_Goods;
	5204: ISheetData_Shops_Goods;
	5205: ISheetData_Shops_Goods;
	5206: ISheetData_Shops_Goods;
	5207: ISheetData_Shops_Goods;
	5208: ISheetData_Shops_Goods;
	5209: ISheetData_Shops_Goods;
	5210: ISheetData_Shops_Goods;
	5211: ISheetData_Shops_Goods;
	5212: ISheetData_Shops_Goods;
	5213: ISheetData_Shops_Goods;
	5214: ISheetData_Shops_Goods;
	5215: ISheetData_Shops_Goods;
	5216: ISheetData_Shops_Goods;
	5217: ISheetData_Shops_Goods;
	5218: ISheetData_Shops_Goods;
	5219: ISheetData_Shops_Goods;
	5220: ISheetData_Shops_Goods;
	5221: ISheetData_Shops_Goods;
	5222: ISheetData_Shops_Goods;
	5223: ISheetData_Shops_Goods;
	5224: ISheetData_Shops_Goods;
	5225: ISheetData_Shops_Goods;
	5226: ISheetData_Shops_Goods;
	5227: ISheetData_Shops_Goods;
	5228: ISheetData_Shops_Goods;
	5229: ISheetData_Shops_Goods;
	5230: ISheetData_Shops_Goods;
	5231: ISheetData_Shops_Goods;
	5232: ISheetData_Shops_Goods;
	5233: ISheetData_Shops_Goods;
	5234: ISheetData_Shops_Goods;
	5235: ISheetData_Shops_Goods;
	5236: ISheetData_Shops_Goods;
	5237: ISheetData_Shops_Goods;
	5238: ISheetData_Shops_Goods;
	5239: ISheetData_Shops_Goods;
	5240: ISheetData_Shops_Goods;
	5241: ISheetData_Shops_Goods;
	5242: ISheetData_Shops_Goods;
	5243: ISheetData_Shops_Goods;
	5244: ISheetData_Shops_Goods;
	5245: ISheetData_Shops_Goods;
	5246: ISheetData_Shops_Goods;
	5247: ISheetData_Shops_Goods;
	5248: ISheetData_Shops_Goods;
	5249: ISheetData_Shops_Goods;
	5250: ISheetData_Shops_Goods;
	5251: ISheetData_Shops_Goods;
	5252: ISheetData_Shops_Goods;
	5253: ISheetData_Shops_Goods;
	5254: ISheetData_Shops_Goods;
	5255: ISheetData_Shops_Goods;
	5256: ISheetData_Shops_Goods;
	5257: ISheetData_Shops_Goods;
	5258: ISheetData_Shops_Goods;
	5259: ISheetData_Shops_Goods;
	5260: ISheetData_Shops_Goods;
	5261: ISheetData_Shops_Goods;
	5262: ISheetData_Shops_Goods;
	5263: ISheetData_Shops_Goods;
	5264: ISheetData_Shops_Goods;
	5265: ISheetData_Shops_Goods;
	5266: ISheetData_Shops_Goods;
	5267: ISheetData_Shops_Goods;
	5268: ISheetData_Shops_Goods;
	5269: ISheetData_Shops_Goods;
	5270: ISheetData_Shops_Goods;
	5271: ISheetData_Shops_Goods;
	5272: ISheetData_Shops_Goods;
	5273: ISheetData_Shops_Goods;
	5274: ISheetData_Shops_Goods;
	5275: ISheetData_Shops_Goods;
	5276: ISheetData_Shops_Goods;
	5277: ISheetData_Shops_Goods;
	5278: ISheetData_Shops_Goods;
	5279: ISheetData_Shops_Goods;
	5280: ISheetData_Shops_Goods;
	5281: ISheetData_Shops_Goods;
	5282: ISheetData_Shops_Goods;
	5283: ISheetData_Shops_Goods;
	5284: ISheetData_Shops_Goods;
	5285: ISheetData_Shops_Goods;
	5286: ISheetData_Shops_Goods;
	5287: ISheetData_Shops_Goods;
	5288: ISheetData_Shops_Goods;
	5289: ISheetData_Shops_Goods;
	5290: ISheetData_Shops_Goods;
	5291: ISheetData_Shops_Goods;
	5292: ISheetData_Shops_Goods;
	5293: ISheetData_Shops_Goods;
	5294: ISheetData_Shops_Goods;
	5295: ISheetData_Shops_Goods;
	5296: ISheetData_Shops_Goods;
	5297: ISheetData_Shops_Goods;
	5298: ISheetData_Shops_Goods;
	5299: ISheetData_Shops_Goods;
	5300: ISheetData_Shops_Goods;
	5301: ISheetData_Shops_Goods;
	5302: ISheetData_Shops_Goods;
	5303: ISheetData_Shops_Goods;
	5304: ISheetData_Shops_Goods;
	5305: ISheetData_Shops_Goods;
	5306: ISheetData_Shops_Goods;
	5307: ISheetData_Shops_Goods;
	5308: ISheetData_Shops_Goods;
	5309: ISheetData_Shops_Goods;
	5310: ISheetData_Shops_Goods;
	5311: ISheetData_Shops_Goods;
	5312: ISheetData_Shops_Goods;
	5313: ISheetData_Shops_Goods;
	5314: ISheetData_Shops_Goods;
	5315: ISheetData_Shops_Goods;
	5316: ISheetData_Shops_Goods;
	5317: ISheetData_Shops_Goods;
	5318: ISheetData_Shops_Goods;
	5319: ISheetData_Shops_Goods;
	5320: ISheetData_Shops_Goods;
	5321: ISheetData_Shops_Goods;
	5322: ISheetData_Shops_Goods;
	5323: ISheetData_Shops_Goods;
	5324: ISheetData_Shops_Goods;
	5325: ISheetData_Shops_Goods;
	5326: ISheetData_Shops_Goods;
	5327: ISheetData_Shops_Goods;
	5328: ISheetData_Shops_Goods;
	5329: ISheetData_Shops_Goods;
	5330: ISheetData_Shops_Goods;
	5331: ISheetData_Shops_Goods;
	5332: ISheetData_Shops_Goods;
	5333: ISheetData_Shops_Goods;
	5334: ISheetData_Shops_Goods;
	5335: ISheetData_Shops_Goods;
	5336: ISheetData_Shops_Goods;
	5337: ISheetData_Shops_Goods;
	5338: ISheetData_Shops_Goods;
	5339: ISheetData_Shops_Goods;
	5340: ISheetData_Shops_Goods;
	5341: ISheetData_Shops_Goods;
	5342: ISheetData_Shops_Goods;
	5343: ISheetData_Shops_Goods;
	5344: ISheetData_Shops_Goods;
	5345: ISheetData_Shops_Goods;
	5346: ISheetData_Shops_Goods;
	5347: ISheetData_Shops_Goods;
	5348: ISheetData_Shops_Goods;
	5349: ISheetData_Shops_Goods;
	5350: ISheetData_Shops_Goods;
	5351: ISheetData_Shops_Goods;
	5352: ISheetData_Shops_Goods;
	5353: ISheetData_Shops_Goods;
	5354: ISheetData_Shops_Goods;
	5355: ISheetData_Shops_Goods;
	5356: ISheetData_Shops_Goods;
	5357: ISheetData_Shops_Goods;
	5358: ISheetData_Shops_Goods;
	5359: ISheetData_Shops_Goods;
	5360: ISheetData_Shops_Goods;
	5361: ISheetData_Shops_Goods;
	5362: ISheetData_Shops_Goods;
	5363: ISheetData_Shops_Goods;
	5364: ISheetData_Shops_Goods;
	5365: ISheetData_Shops_Goods;
	5366: ISheetData_Shops_Goods;
	5367: ISheetData_Shops_Goods;
	5368: ISheetData_Shops_Goods;
	5369: ISheetData_Shops_Goods;
	5370: ISheetData_Shops_Goods;
	5371: ISheetData_Shops_Goods;
	5372: ISheetData_Shops_Goods;
	5373: ISheetData_Shops_Goods;
	5374: ISheetData_Shops_Goods;
	5375: ISheetData_Shops_Goods;
	5376: ISheetData_Shops_Goods;
	5377: ISheetData_Shops_Goods;
	5378: ISheetData_Shops_Goods;
	5379: ISheetData_Shops_Goods;
	5380: ISheetData_Shops_Goods;
	5381: ISheetData_Shops_Goods;
	5382: ISheetData_Shops_Goods;
	5383: ISheetData_Shops_Goods;
	5384: ISheetData_Shops_Goods;
	5385: ISheetData_Shops_Goods;
	5386: ISheetData_Shops_Goods;
	5387: ISheetData_Shops_Goods;
	5388: ISheetData_Shops_Goods;
	5389: ISheetData_Shops_Goods;
	5390: ISheetData_Shops_Goods;
	5391: ISheetData_Shops_Goods;
	5392: ISheetData_Shops_Goods;
	5393: ISheetData_Shops_Goods;
	5394: ISheetData_Shops_Goods;
	5395: ISheetData_Shops_Goods;
	5396: ISheetData_Shops_Goods;
	5397: ISheetData_Shops_Goods;
	5398: ISheetData_Shops_Goods;
	5399: ISheetData_Shops_Goods;
	5400: ISheetData_Shops_Goods;
	5401: ISheetData_Shops_Goods;
	5402: ISheetData_Shops_Goods;
	5403: ISheetData_Shops_Goods;
	6001: ISheetData_Shops_Goods;
	6002: ISheetData_Shops_Goods;
	6003: ISheetData_Shops_Goods;
	6004: ISheetData_Shops_Goods;
	6005: ISheetData_Shops_Goods;
	6006: ISheetData_Shops_Goods;
	6007: ISheetData_Shops_Goods;
	6008: ISheetData_Shops_Goods;
	6009: ISheetData_Shops_Goods;
	6010: ISheetData_Shops_Goods;
	6011: ISheetData_Shops_Goods;
	9001: ISheetData_Shops_Goods;
	9002: ISheetData_Shops_Goods;
	9003: ISheetData_Shops_Goods;
	9004: ISheetData_Shops_Goods;
	9005: ISheetData_Shops_Goods;
	9006: ISheetData_Shops_Goods;
	9007: ISheetData_Shops_Goods;
	9008: ISheetData_Shops_Goods;
	9009: ISheetData_Shops_Goods;
	9010: ISheetData_Shops_Goods;
	9011: ISheetData_Shops_Goods;
	9012: ISheetData_Shops_Goods;
	9013: ISheetData_Shops_Goods;
	9014: ISheetData_Shops_Goods;
	9015: ISheetData_Shops_Goods;
	9016: ISheetData_Shops_Goods;
	9017: ISheetData_Shops_Goods;
	9018: ISheetData_Shops_Goods;
	9019: ISheetData_Shops_Goods;
	9020: ISheetData_Shops_Goods;
	9021: ISheetData_Shops_Goods;
	9022: ISheetData_Shops_Goods;
	9023: ISheetData_Shops_Goods;
	9024: ISheetData_Shops_Goods;
	9025: ISheetData_Shops_Goods;
	9026: ISheetData_Shops_Goods;
	9027: ISheetData_Shops_Goods;
	9028: ISheetData_Shops_Goods;
	9029: ISheetData_Shops_Goods;
	9030: ISheetData_Shops_Goods;
	9031: ISheetData_Shops_Goods;
	9033: ISheetData_Shops_Goods;
	9034: ISheetData_Shops_Goods;
	9035: ISheetData_Shops_Goods;
	9036: ISheetData_Shops_Goods;
	9037: ISheetData_Shops_Goods;
	9038: ISheetData_Shops_Goods;
	9039: ISheetData_Shops_Goods;
	9040: ISheetData_Shops_Goods;
	9041: ISheetData_Shops_Goods;
	9043: ISheetData_Shops_Goods;
	9044: ISheetData_Shops_Goods;
	9045: ISheetData_Shops_Goods;
	9046: ISheetData_Shops_Goods;
	9047: ISheetData_Shops_Goods;
	9048: ISheetData_Shops_Goods;
	9049: ISheetData_Shops_Goods;
	9051: ISheetData_Shops_Goods;
	9052: ISheetData_Shops_Goods;
	9053: ISheetData_Shops_Goods;
	9054: ISheetData_Shops_Goods;
	9055: ISheetData_Shops_Goods;
	9056: ISheetData_Shops_Goods;
	9057: ISheetData_Shops_Goods;
	9058: ISheetData_Shops_Goods;
	9059: ISheetData_Shops_Goods;
	9060: ISheetData_Shops_Goods;
	9061: ISheetData_Shops_Goods;
	9062: ISheetData_Shops_Goods;
	9063: ISheetData_Shops_Goods;
	9064: ISheetData_Shops_Goods;
	9065: ISheetData_Shops_Goods;
	9066: ISheetData_Shops_Goods;
	9067: ISheetData_Shops_Goods;
	9068: ISheetData_Shops_Goods;
	9069: ISheetData_Shops_Goods;
	9070: ISheetData_Shops_Goods;
	9071: ISheetData_Shops_Goods;
}
declare interface ISheetData_Shops_Goods {
	id: number;
	/** 商店类型 */
	category: number;
	/** 商品类型 */
	category_goods: number;
	/** 图标 */
	icon: string;
	/** 名称 */
	name_chs: string;
	/** 名称 */
	name_chs_t: string;
	name_jp: string;
	name_en: string;
	name_kr: string;
	desc_chs: string;
	desc_chs_t: string;
	desc_jp: string;
	desc_en: string;
	desc_kr: string;
	/** 物品ID */
	item_id: number;
	/** 价格 */
	price: string;
	/** 价格 */
	show_original_price: string;
	/** 指定购买数量 */
	need_amount: number;
	/** 购买数量限制 */
	buy_limit: number;
	/** 显示已拥有数量 */
	show_has: number;
	/** 排序 */
	sort: number;
	/** 折扣(万分比) */
	discount: number;
	/** 销售期间活动id */
	sell_activity: number;
	/** 起售时间，之后才可兑换 */
	launch_time: string;
	func: string;
	/** 打折期间活动id */
	discount_activity: number;
	/** 分服启用，1中文服 2日服 3美服 */
	zone: string;
}
//#endregion

//#region goods_package
declare interface ISheet_Shops_GoodsPackage {
	700001: ISheetData_Shops_GoodsPackage[];
}
declare interface ISheetData_Shops_GoodsPackage {
	id: number;
	/** 商品ID */
	good_id: number;
	/** 商品数量 */
	good_count: number;
}
//#endregion

//#region interval_refresh_goods
declare interface ISheet_Shops_IntervalRefreshGoods {
	1001: ISheetData_Shops_IntervalRefreshGoods[];
}
declare interface ISheetData_Shops_IntervalRefreshGoods {
	group_id: number;
	goods_id: number;
	interval: number;
	interval_type: number;
}
//#endregion

//#region item_package
declare interface ISheet_Shops_ItemPackage {
	700002: ISheetData_Shops_ItemPackage;
	700003: ISheetData_Shops_ItemPackage;
}
declare interface ISheetData_Shops_ItemPackage {
	id: number;
	/** 包含道具 */
	item_info: string;
}
//#endregion

//#region selected_package
declare interface ISheet_Shops_SelectedPackage {
	5399: ISheetData_Shops_SelectedPackage[];
}
declare interface ISheetData_Shops_SelectedPackage {
	/** 自选服饰商品id */
	id: number;
	/** 可选商品id */
	goods_id: number;
	/** 价格 */
	price: string;
}
//#endregion