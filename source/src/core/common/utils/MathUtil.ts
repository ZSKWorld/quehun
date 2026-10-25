const chineseNums = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const chineseNumUnits = ["", "十", "百", "千", "万", "十", "百", "千", "亿", "十", "百", "千", "万", "十", "百", "千", "亿"];

const LETTER_A = 97;
const LETTER_COUNT = 26;

/** 数学工具类 */
@Singleton
export class MathUtil implements IMathUtil {
	// 等比数列求和公式：Sn=a1(1-q^n)/(1-q)（q≠1)。
	// 等差数列求和公式：Sn=na1+n(n-1)d/2。
	// 二级等差数列第n项 => a1 + (a2 - a1) * (n - 1) + (a3 - 2 * a2 + a1) * (n - 1) * (n - 2) / 2
	readonly Radian = Math.PI / 180;

	angle2Radian(angle: number) { return angle * this.Radian; }

	radian2Angle(radian: number) { return radian / this.Radian; }

	chineseNum(num: number) {
		if (!num || isNaN(num)) return "零";
		const english = num.toString().split("");
		const arr1 = chineseNums;
		const arr2 = chineseNumUnits;
		let result = "";
		for (let i = 0, n = english.length; i < n; i++) {
			const des_i = n - 1 - i;// 倒序排列设值
			result = arr2[i] + result;
			const arr1_index = english[des_i];
			result = arr1[arr1_index] + result;
		}
		return result
			.replace(/零(千|百|十)/g, "零").replace(/十零/g, "十") // 将【零千、零百】换成【零】 【十零】换成【十】
			.replace(/零+/g, "零") // 合并中间多个零为一个零
			.replace(/零亿/g, "亿").replace(/零万/g, "万") // 将【零亿】换成【亿】【零万】换成【万】
			.replace(/亿万/g, "亿") // 将【亿万】换成【亿】
			.replace(/零+$/, "") // 移除末尾的零
			.replace(/^一十/g, "十"); // 将【一十】换成【十】
	}

	groupNumber(num: number, fixed: number = 2) {
		if (num < 1e4) return num.toString();
		else if (num < 1e8) return (num / 1e4).toFixed(fixed) + "万";
		else if (num < 1e12) return (num / 1e8).toFixed(fixed) + "亿";
		else return (num / 1e12).toFixed(fixed) + "万亿";
	}

	num2Letter(num: number, decimals: number = 3) {
		decimals = Math.max(0, Math.floor(decimals));
		if (!Number.isFinite(num) || num === 0) return String(num);

		const sign = num < 0 ? '-' : '';
		let abs = Math.abs(num);
		if (abs < 1e6) return sign + abs.toString();

		abs /= 1e6;

		// 1e6 对应 a，基准幂次为 6，每多除一次 1e3 加 3
		let letterPower = 6;
		while (abs >= 1e3) {
			abs /= 1e3;
			letterPower += 3;
		}

		// 字母索引：a=0, b=1, ..., z=25，再按 26 进制进位
		let letterIndex = (letterPower - 6) / 3;
		const letters: string[] = [];
		do {
			letters.unshift(String.fromCharCode(LETTER_A + (letterIndex % LETTER_COUNT)));
			letterIndex = Math.floor(letterIndex / LETTER_COUNT);
		} while (letterIndex > 0);

		decimals = 10 ** decimals;
		return sign + Math.floor(abs * decimals) / decimals + letters.join('');
	}

	letter2Num(str: string) {
		const trimmed = str.trim();
		const match = trimmed.match(/^(-?)(\d+(?:\.\d+)?)([a-z]*)$/);
		if (!match) throw new Error(`Invalid number string: ${ str }`);

		const [, signStr, numPart, letterPart] = match;
		const num = parseFloat(numPart);
		if (!Number.isFinite(num)) throw new Error(`Invalid number: ${ str }`);

		let power = 0;
		if (letterPart) {
			let multiplier = 1;
			for (let i = letterPart.length - 1; i >= 0; i--) {
				const digit = letterPart.charCodeAt(i) - LETTER_A + 1; // 1..26
				power += 3 * digit * multiplier;
				multiplier *= LETTER_COUNT;
			}
			power += 3; // 与原实现一致的额外偏移
		}

		const value = num * Math.pow(10, power);
		return signStr === '-' ? -value : value;
	}

	randomInt(min: number, max: number) {
		min = Math.floor(min);
		max = Math.floor(max);
		if (min >= max) return min;
		return Math.floor(min + (max - min + 1) * Math.random());
	}

	randomFloat(min: number, max: number) {
		if (min >= max) return min;
		return min + (max - min) * Math.random();
	}

	clamp(value: number, min: number, max: number) {
		return Math.min(Math.max(value, min), max);
	}

	clamp01(value: number) {
		return this.clamp(value, 0, 1);
	}

	smoothStep(x: number) {
		x = this.clamp01(x);
		return (Math.sin(x * Math.PI - Math.PI / 2) + 1) / 2;
	}

	lerp(a: number, b: number, t: number) {
		return a + t * (b - a);
	}

	symbol(num: number) {
		if (num === 0) return 0;
		return num < 0 ? -1 : 1;
	}

	repeat(t: number, length: number) {
		if (length === 0) return 0;
		return t - Math.floor(t / length) * length;
	}

	pingpong(t: number, length: number) {
		if (length === 0) return 0;
		t = this.repeat(t, length * 2);
		return length - Math.abs(t - length);
	}
}