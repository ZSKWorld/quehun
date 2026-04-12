type MjpNum = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export class MjpVO {
	/** 数字0-9, 如果是字牌的话就是东南西北白发中 */
	private readonly _num: MjpNum;
	/** 麻将类型，万筒条、字牌、百搭 */
	private readonly _type: EMjpType;
	/** 红朵拉 */
	private readonly _isDora: boolean;
	/** 透明牌 */
	private readonly _isTouMing: boolean;
	/** 百搭牌 */
	private readonly _isBaiDa: boolean;

	constructor(str: string);
	constructor(mjpVO: MjpVO);
	constructor(...args: any[]) {
		const arg0 = args[0];
		if (typeof arg0 === "string") {
			const str = arg0.toLowerCase();

			let num: MjpNum, type: EMjpType;
			const isDora = str[0] == "0";
			num = isDora ? 5 : +str.charAt(0) as MjpNum;

			switch (str[1]) {
				case "z": type = EMjpType.Z; break;
				case "m": type = EMjpType.M; break;
				case "s": type = EMjpType.S; break;
				case "p": type = EMjpType.P; break;
				default:
					if (str == "bd") type = EMjpType.BD;
					break;
			}

			if (num < 1 || num > 9)
				throw new Error("MjpVO num error: " + num);
			if (type != EMjpType.Z && type != EMjpType.M && type != EMjpType.S && type != EMjpType.P && type != EMjpType.BD)
				throw new Error("MjpVO type error: " + type);
			if (isDora && type != EMjpType.M && type != EMjpType.P && type != EMjpType.S)
				throw new Error("MjpVO num error: " + num + ", type error: " + type);

			this._num = num;
			this._type = type;
			this._isDora = isDora;
			this._isTouMing = str.length > 2;
			this._isBaiDa = type == EMjpType.BD;
		} else if (arg0 instanceof MjpVO) {
			this._num = arg0._num;
			this._type = arg0._type;
			this._isDora = arg0._isDora;
			this._isTouMing = arg0._isTouMing;
			this._isBaiDa = arg0._isBaiDa;
		} else {
			throw new Error("MjpVO args error: " + args);
		}
	}

	clone() {
		return new MjpVO(this);
	}

	toString(showTouming: boolean = true) {
		const { _type, _num, _isDora, _isTouMing, _isBaiDa } = this;
		let str = _isDora ? "0" : _num.toString();
		if (_isBaiDa) return "bd";
		else if (showTouming && _isTouMing) str += "t";
		else str += _type;
		return str;
	}
}