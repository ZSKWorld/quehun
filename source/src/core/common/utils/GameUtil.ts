

const EncryptList: ReadonlyArray<string> = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+{}[]|\:;<>,.?/~".split("");
const EncryptMap: Readonly<number> = EncryptList.reduce((pv, cv, i) => (pv[cv] = i, pv), {}) as Readonly<number>;

export class GameUtil implements IGameUtil {

	encrypt(str: string) {
		if (!str) return str;
		const strLen = str.length, listLen = EncryptList.length;

		const result = new Array(strLen);

		const startIndex = (Math.floor(strLen / 3) + 17) % strLen;

		for (let i = 0; i < strLen; i++) {
			const index = (startIndex - i + strLen * 2) % strLen;
			const char = str[index];
			const charIdx = EncryptMap[char];

			if (charIdx == null) {
				result[i] = char;
			} else {
				const offset = (2 + 3 * i) ^ 11;
				result[i] = EncryptList[(charIdx + offset) % listLen];
			}
		}
		return result.join("");
	}

	decrypt(str: string) {
		if (!str) return str;
		const strLen = str.length, listLen = EncryptList.length;
		const startIndex = (Math.floor(strLen / 3) + 17) % strLen;

		const decryptedChars = new Array(strLen);

		for (let i = 0; i < strLen; i++) {
			const char = str[i];
			const charIdx = EncryptMap[char];

			if (charIdx == null) {
				decryptedChars[i] = char;
			} else {
				const offset = (2 + 3 * i) ^ 11;
				const oldIdx = ((charIdx - offset) % listLen + listLen) % listLen;
				decryptedChars[i] = EncryptList[oldIdx];
			}
		}

		const part1 = decryptedChars.slice(0, startIndex + 1).reverse();
		const part2 = decryptedChars.slice(startIndex + 1).reverse();

		return part1.join("") + part2.join("");
	}

	createUUID() {
		// 现代浏览器和 Node.js 14.17+ 均支持
		if (typeof crypto !== "undefined" && crypto.randomUUID) {
			return crypto.randomUUID();
		}
		return (String([1e7]) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => {
			const nc = +c;
			return (nc ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> nc / 4).toString(16);
		});
	}

	/** 随机颜色字符串 */
	randomColor() {
		return `#${ Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0") }`;
	}

	HmacSHA256(msg: string) {
		return String(CryptoJS.HmacSHA256(msg, "lailai"));
	}

	getI18nContext(i18n: ProtoObject<II18nContext>[], defValue = "") {
		if (!i18n || i18n.length == 0) return defValue;

		const lang = $gameMgr.clientLanguage;
		const match = i18n.find(v => v.lang == lang);

		return match ? match.context : defValue;
	}

	isAI(accountId: number) {
		return !accountId || accountId < 1000;
	}

	/** 获取账号区域id */
	getZoneId(accoundId: number) {
		if (this.isAI(accoundId)) return 0;
		const z = accoundId >> 23;
		const zoneIds = $netMgr.zoneIds;
		if ($netMgr.zoneIds.length > 3) {
			if (z >= zoneIds[0] && z < zoneIds[1]) return 1;
			else if (z >= zoneIds[1] && z < zoneIds[2]) return 2;
			else if (z >= zoneIds[2] && z < zoneIds[3]) return 3;
			return -1;
		} else {
			if (z >= 0 && z <= 6) return 1;
			else if (z >= 7 && z <= 12) return 2;
			else if (z >= 13 && z <= 15) return 3;
			return -1;
		}
	}

	/** 是否是同区域(同服) */
	isSameZone(accountId1: number, accountId2: number) {
		if (this.isAI(accountId1) || this.isAI(accountId2)) return true;

		const zoneId1 = this.getZoneId(accountId1);
		if (zoneId1 == -1) return false;

		const zoneId2 = this.getZoneId(accountId2);
		return zoneId1 == zoneId2;
	}
}