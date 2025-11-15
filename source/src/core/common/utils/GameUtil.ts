

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
}