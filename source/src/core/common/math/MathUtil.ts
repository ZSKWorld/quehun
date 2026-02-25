
/** 数学工具类 */
export class MathUtil extends Singleton<MathUtil>() implements IMathUtil {
	// 等比数列求和公式：Sn=a1(1-q^n)/(1-q)（q≠1)。
	// 等差数列求和公式：Sn=na1+n(n-1)d/2。
	// 二级等差数列第n项 => a1 + (a2 - a1) * (n - 1) + (a3 - 2 * a2 + a1) * (n - 1) * (n - 2) / 2
	readonly Radian = Math.PI / 180;

	angle2Radian(angle: number) { return angle * this.Radian; }

	radian2Angle(radian: number) { return radian / this.Radian; }

	chineseNum(num: number) {
		if (!num || isNaN(num)) return "零";
		const english = num.toString().split("");
		const arr1 = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
		const arr2 = ["", "十", "百", "千", "万", "十", "百", "千", "亿", "十", "百", "千", "万", "十", "百", "千", "亿"];
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

	num2Letter(num: number, dp: number = 3) {
		dp = dp < 0 ? 0 : dp;
		//97-122 a-z
		const numLetter = [];
		if (num >= 1e6) {
			num /= 1e6;
			numLetter.push(97);
			while (num >= 1e3) {
				num /= 1e3;
				let carry = true;
				for (let i = numLetter.length - 1; i >= 0; i--) {
					if (++numLetter[i] > 122) {
						numLetter[i] = 97;
					} else {
						carry = false;
						break;
					}
				}
				if (carry) numLetter.unshift(97);
			}
		}
		if (numLetter.length)
			return num.toFixed(dp) + numLetter.map(v => String.fromCharCode(v)).join("");
		else
			return num.toString();
	}

	letter2Num(str: string) {
		const reg = /^-?\d+(\.\d+)?[a-z]*$/;
		if (!reg.test(str)) throw Error("Invalid number string: " + str);
		const [num, letter] = str.match(/[a-z]+|-?\d+(\.\d+)?/g);
		let sign = 0;
		if (letter) {
			let letterNum = letter.split("").map(v => v.charCodeAt(0)).reverse();
			letterNum.forEach((v, i) => sign += 3 * (v - 96) * (26 ** i));
			letterNum.length > 0 && (sign += 3);
		}
		return parseFloat(num) * (10 ** sign);
	}

	randomInt(min: number, max: number) {
		min = Math.floor(min);
		max = Math.floor(max);
		if (min >= max) return min;
		return Math.floor(min + (max - min) * Math.random());
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
		if (num == 0) return 0;
		return num < 0 ? -1 : 1;
	}
}