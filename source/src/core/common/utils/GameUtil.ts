

export class GameUtil implements IGameUtil {

	createUUID() {
		let d = $timeUtil.milliSecond;
		const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			const r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
		return uuid;
	}

	/** 随机颜色字符串 */
	randomColor() {
		const r = Math.floor(Math.random() * 256);
		const g = Math.floor(Math.random() * 256);
		const b = Math.floor(Math.random() * 256);
		return "#" + r.toString(16).padStart(2, "0")
			+ g.toString(16).padStart(2, "0")
			+ b.toString(16).padStart(2, "0");
	}

	HmacSHA256(msg: string) {
		return String(CryptoJS.HmacSHA256(msg, "lailai"));
	}

	getI18nContext(i18n: ProtoObject<II18nContext>[], defValue?: string) {
		if (!i18n) return defValue ?? "";
		const lang = $gameMgr.clientLanguage;
		const len = i18n.length;
		for (let i = 0; i < len; i++) {
			const e = i18n[i];
			if (e.lang == lang)
				return e.context;
		}
		return defValue ?? "";
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
		if (zoneId2 == -1) return false;
		return zoneId1 == zoneId2;
	}
}