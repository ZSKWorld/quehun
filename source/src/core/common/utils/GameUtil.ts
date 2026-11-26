const EncryptList: ReadonlyArray<string> = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+{}[]|\:;<>,.?/~".split("");
const EncryptMap: Readonly<number> = EncryptList.reduce((pv, cv, i) => (pv[cv] = i, pv), {}) as Readonly<number>;

@Singleton
export class GameUtil implements IGameUtil {
	emptyFunc() { }

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

	encodeAccountId(id: number) {
		id ^= 6139246;

		const a = id & ~0x3FFFFFF; // 高位部分
		let b = id & 0x3FFFFFF;    // 低26位部分

		// 合并位移：右移 19 位 (等同于左移 7 位)
		// (b << 7) 取出被左移的低19位内容，(b >> 19) 取出被挤出的高7位内容
		b = ((b << 7) & 0x3FFFFFF) | (b >> 19);

		return b + a + 10000000;
	}

	decodeAccountId(encodedId: number) {
		encodedId -= 10000000;

		const a = encodedId & ~0x3FFFFFF;
		let b = encodedId & 0x3FFFFFF;

		// 合并位移：左移 19 位 (等同于右移 7 位)
		b = ((b << 19) & 0x3FFFFFF) | (b >> 7);

		return (a + b) ^ 6139246;
	}

	encryptAccountId(id: number) {
		return ((id * 7 + 1117113) ^ 86216345) + 1358437;
	}

	decryptAccountId(encryptId: number) {
		return (((encryptId - 1358437) ^ 86216345) - 1117113) / 7;
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

	randomColor() {
		return `#${ Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0") }`;
	}

	HmacSHA256(msg: string) {
		return String(CryptoJS.HmacSHA256(msg, "lailai"));
	}

	getI18nContext(i18n: ProtoObject<II18nContext>[], defValue = "") {
		if (!i18n || i18n.length == 0) return defValue;

		const lang = $gameMgr.language;
		const match = i18n.find(v => v.lang == lang);

		return match ? match.context : defValue;
	}

	isAI(accountId: number) {
		return !accountId || accountId < 1000;
	}

	getZoneId(accoundId: number) {
		if (this.isAI(accoundId)) return 0;
		const z = accoundId >> 23;
		const zoneIds = $gameMgr.zoneIds;
		if (zoneIds.length > 3) {
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

	isSameZone(accountId1: number, accountId2: number) {
		if (this.isAI(accountId1) || this.isAI(accountId2)) return true;

		const zoneId1 = this.getZoneId(accountId1);
		if (zoneId1 == -1) return false;

		const zoneId2 = this.getZoneId(accountId2);
		return zoneId1 == zoneId2;
	}

	getPlayerPlayingInfo(data: { is_online: boolean; playing: IAccountPlayingGame; logout_time: number; }) {
		const info = { color: "", text: "" };
		if (data.is_online) {
			const gamingName = this.getGamingName(data.playing);
			info.color = gamingName ? EColorString._a9d94d : EColorString._58c4db;
			info.text = $lang(gamingName ? 2069 : 2071, gamingName);
		} else {
			info.color = EColorString._8c8c8c;
			info.text = $timeUtil.timeFormat5(data.logout_time) + $lang(2072);
		}
		return info;
	}

	getPlayerInGaming(data: IAccountPlayingGame) {
		if (!data || !data.game_uuid) return false;
		if (data.category == 1) return true;
		if (data.category == 2 && data.meta) {
			const d = $cfgMgr.desktop.matchmode[data.meta.mode_id];
			if (d) true;
		}
		if (data.category == 4) return true;
		return false;
	}

	getGamingName(data: IAccountPlayingGame) {
		if (!data || !data.game_uuid) return "";

		if (data.category == 1) return $lang(2023);

		if (data.category == 2 && data.meta) {
			const d = $cfgMgr.desktop.matchmode[data.meta.mode_id];
			if (d) return d.langField(ECfgLangField.room_name);
		}

		if (data.category == 4)
			return $lang(2025);
		return "";
	}

	openHref(url: string, openNew = true) {
		url = url.replace(/&amp;/g, '&');
		if (openNew)
			window.open(url, "_blank");
		else
			window.location.href = url;
	}

	freeze<T>(obj: T, deep: boolean = true) {
		if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function'))
			return obj;

		if (Object.isFrozen(obj))
			return obj;

		Object.freeze(obj);

		if (!deep)
			return obj;

		// 获取所有自身属性（包含 Symbol / 不可枚举）
		for (const key of Reflect.ownKeys(obj)) {
			const value = obj[key];
			if (value !== null && (typeof value === 'object' || typeof value === 'function'))
				this.freeze(value, deep);
		}

		return obj;
	}

	safeCall(callback: ICallback, ...args: any[]) {
		if (!callback) return;
		if (callback instanceof Laya.Handler)
			return callback.runWith(args);
		if (typeof callback == "function")
			return callback(...args);
	}

	downloadTxt(fileName: string, text: string) {
		const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = fileName;
		a.target = "_blank";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	loadScript(url: string) {
		return new Promise<boolean>(resolve => {
			const script = document.createElement("script");
			script.async = false;
			script.onload = () => resolve(true);
			script.onerror = () => resolve(false);
			script.src = url;
			document.body.appendChild(script);
		});
	}

	async loopConfirmLoad<T>(promiseCreator: () => (Iterable<T | PromiseLike<T>>), tip: string) {
		if (!promiseCreator || typeof promiseCreator != "function") return [false] as any;
		let res: Awaited<T>[];
		while (true) {
			res = await Promise.all(promiseCreator());
			let hasInvalidValue = false;
			for (let i = 0; i < res.length; i++) {
				const element = res[i];
				if (element == false || element == null) {
					hasInvalidValue = true;
					break;
				}
			}
			if (hasInvalidValue) {
				const confirm = await $confirmSma(3, tip);
				if (!confirm) return [false, ...res] as any;
			} else break;
		}
		return [true, ...res] as any;
	}

	async copyText(text: string, tip: boolean = true) {
		text = text == null ? "" : text;
		let success = false;
		if (navigator.clipboard && window.isSecureContext) {
			try {
				await navigator.clipboard.writeText(text);
				success = true;
			} catch (e) {
				success = false;
			}
		}
		if (!success)
			success = this.fallbackCopy(text);

		if (tip)
			$tipMgr.showTip($lang(success ? 2125 : 0));

		return success;
	}

	/**
	 * 传统降级复制方案（兼容 HTTP / 旧浏览器 / 部分 WebView）
	 */
	private fallbackCopy(text: string) {
		const textarea = document.createElement('textarea');
		textarea.value = text;

		// 防止页面滚动、避免闪动
		textarea.style.position = 'fixed';
		textarea.style.top = '-9999px';
		textarea.style.left = '-9999px';
		textarea.style.opacity = '0';
		textarea.setAttribute('readonly', '');

		document.body.appendChild(textarea);

		// iOS 需要特殊处理选中范围
		const isIOS = /ipad|iphone|ipod/i.test(navigator.userAgent);
		if (isIOS) {
			const range = document.createRange();
			range.selectNodeContents(textarea);
			const selection = window.getSelection();
			selection?.removeAllRanges();
			selection?.addRange(range);
			textarea.setSelectionRange(0, text.length);
		} else {
			textarea.select();
		}

		let success = false;
		try {
			success = document.execCommand('copy');
		} catch (e) {

		}

		document.body.removeChild(textarea);

		// 清理 iOS 选区
		if (isIOS) {
			window.getSelection()?.removeAllRanges();
		}

		return success;
	}

	canEnterMode(modeId: number, roomType?: number) {
		const cfgMode = $cfgMgr.desktop.matchmode[modeId];
		if (!cfgMode.is_open)
			return 1306;

		roomType = roomType ?? cfgMode.room;

		let goldTooLess = true, goldTooMore = true;
		let levelTooLess = true, levelTooMore = true, level3TooLess = true, level3TooMore = true;

		const level_id = $user.account.level.id;
		const level3_id = $user.account.level3.id;
		const gold = $user.bag.gold;

		$cfgMgr.desktop.matchmode.forEach(x => {
			if (x.room != roomType) return;

			if (!x.glimit_floor || gold >= x.glimit_floor) goldTooLess = false;
			if (x.glimit_ceil == -1 || gold <= x.glimit_ceil) goldTooMore = false;

			if (x.mode < 10) { // 四麻
				if (!x.level_limit || level_id >= x.level_limit) levelTooLess = false;
				if (!x.level_limit_ceil || level_id <= x.level_limit_ceil) levelTooMore = false;
			} else { // 三麻
				if (!x.level_limit || level3_id >= x.level_limit) level3TooLess = false;
				if (!x.level_limit_ceil || level3_id <= x.level_limit_ceil) level3TooMore = false;
			}
		});

		if ((levelTooLess || levelTooMore) && (level3TooLess || level3TooMore))
			return 103;
		else if (goldTooLess)
			return 101;
		else if (goldTooMore)
			return 102;
		return 0;
	}
}

