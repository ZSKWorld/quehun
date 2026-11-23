import ComMatchMode from "../../../../ui/PkgMain/ComMatchMode";
import { EComMatchModeType } from "../../Definition";
import { ComMatchItemView } from "./ComMatchItemView";

const TitleLang = {
	[EComMatchModeType.RankMode]: 2079,
	[EComMatchModeType.MatchMode]: 2025,
	[EComMatchModeType.FriendMode]: 2023,
};


/** id, iconId, infoLangId, descId */
type IMatchInfo = [number, number, number, number];
const MatchInfo = {
	daHuiShi: [0, 3460, 56, 2471] as IMatchInfo,
	interval: [0, 0, 0, 3806] as IMatchInfo,
	guYiChange: [13, 3456, 2775, 2774] as IMatchInfo,
	baoPaiKuangRe: [33, 3451, 3654, 2774] as IMatchInfo,
	peiPaiOpen: [34, 3459, 3029, 2774] as IMatchInfo,
	longZhiMuYu: [35, 3458, 3050, 2774] as IMatchInfo,
	xiuLuoZhiZhan: [40, 3470, 3376, 2774] as IMatchInfo,
	chiYuZhiZhan: [41, 3449, 3653, 2774] as IMatchInfo,
	xiuXianChang: [29, 3471, 2841, 2471] as IMatchInfo,
};

export class ComMatchModeView extends ComMatchMode {
	private _curType = EComMatchModeType.Mode;
	private _changing = false;
	private _fetchingMatchInfo = false;

	override onCreate() {
		const {
			btn_rankMode, btn_matchMode, btn_friendMode, btn_back,
			com_contentRank, com_contentFriend, com_contentMode
		} = this;
		btn_back.onClick(this, this.onBtnBackClick);
		btn_rankMode.onClick(this, this.changeShowType, [EComMatchModeType.RankMode]);
		btn_matchMode.onClick(this, this.changeShowType, [EComMatchModeType.MatchMode]);
		btn_friendMode.onClick(this, this.changeShowType, [EComMatchModeType.FriendMode]);

		const rankIcons = [3467, 3473, 3454, 3475, 3468];
		for (let i = 0; i < 5; i++) {
			const com = $facade.createView<ComMatchItemView>(EViewID.ComMatchItemView);
			const deskId = i < 4 ? (1 + 3 * i) : 15;
			const cfgMode = $cfgMgr.desktop.matchmode[deskId];
			const data: IComMatchModeData = {
				type: 0,
				icon: $langRes(`myres/bothui/img_${ rankIcons[i] }.png`),
				infoLangId: i < 4 ? (4 + i) : 64,
				refreshTime: 0,
				desc: $lang(2462 + i),
				delete: false,
				open: !!cfgMode.is_open,
			};
			com.refresh(data);
			const roomType = (i + 1 == 5) ? 6 : (i + 1);
			com.onItemClick(this, () => {
				const error = $gameUtil.canEnterMode(deskId, roomType);
				if (error) return $confirmSma(2, $lang(error));
				this.changeShowType(EComMatchModeType.RankMode1, cfgMode.room);
			});
			com_contentRank.addChild(com);
		}

		for (let i = 0; i < 2; i++) {
			const com = $facade.createView<ComMatchItemView>(EViewID.ComMatchItemView);
			const createRoom = i == 0;
			com.refresh({
				type: 2, open: true, delete: true, refreshTime: 0,
				desc: $lang(2470), infoLangId: createRoom ? 8 : 9,
				icon: $langRes(`myres/bothui/img_${ createRoom ? 3450 : 3455 }.png`),
			});
			if (createRoom)
				com.onItemClick(this, () => this.openView(EViewID.UICreateRoomView, this.data, EViewOpenType.Hide));
			else
				com.onItemClick(this, () => $confirmSma(2, "加入房间"));
			com_contentFriend.addChild(com);
		}

		for (let i = 0; i < 4; i++) {
			const com = $facade.createView<ComMatchItemView>(EViewID.ComMatchItemView);
			com_contentMode.addChild(com);
		}

		this.refreshMatchMode();
		this.on(EMouseEvent.BackMouseClick, this, this.onBtnBackClick);
	}

	private onBtnBackClick() {
		let backType = EComMatchModeType.Mode;
		switch (this._curType) {
			case EComMatchModeType.RankMode1: backType = EComMatchModeType.RankMode; break;
			case EComMatchModeType.MatchMode1: backType = EComMatchModeType.MatchMode; break;
			case EComMatchModeType.Mode:
			case EComMatchModeType.RankMode:
			case EComMatchModeType.MatchMode:
			case EComMatchModeType.FriendMode:
			default: backType = EComMatchModeType.Mode; break;
		}
		this.changeShowType(backType);
	}

	private async changeShowType(type: EComMatchModeType, mode?: number) {
		if (this._changing) return;
		const lastType = this._curType;
		if (type == lastType) return;
		this._curType = type;

		this._changing = true;
		const {
			txt_title, ctrl_type, trans_in, trans_out, trans_titleIn, trans_titleOut, btn_rule,
			com_contentRank, com_contentMatch, com_contentFriend, com_contentMode
		} = this;
		btn_rule.visible = type == EComMatchModeType.MatchMode;
		switch (type) {
			case EComMatchModeType.Mode:
				$uiUtil.playTrans(trans_titleOut);
				switch (lastType) {
					case EComMatchModeType.RankMode: await this.transOutContent(com_contentRank); break;
					case EComMatchModeType.MatchMode: await this.transOutContent(com_contentMatch); break;
					case EComMatchModeType.FriendMode: await this.transOutContent(com_contentFriend); break;
				}
				ctrl_type.selectedIndex = type;
				await $uiUtil.playTrans(trans_in);
				break;
			case EComMatchModeType.RankMode:
			case EComMatchModeType.MatchMode:
			case EComMatchModeType.FriendMode:
				if (lastType == EComMatchModeType.Mode) {
					await $uiUtil.playTrans(trans_out);
					$uiUtil.playTrans(trans_titleIn);
				} else {
					await this.transOutContent(com_contentMode);
				}
				ctrl_type.selectedIndex = type;
				txt_title.langText(TitleLang[type]);
				switch (type) {
					case EComMatchModeType.RankMode: await this.transInContent(com_contentRank); break;
					case EComMatchModeType.MatchMode: await this.transInContent(com_contentMatch); break;
					case EComMatchModeType.FriendMode: await this.transInContent(com_contentFriend); break;
				}
				break;
			case EComMatchModeType.RankMode1:
			case EComMatchModeType.MatchMode1:
				switch (lastType) {
					case EComMatchModeType.Mode:
						await $uiUtil.playTrans(trans_out);
						$uiUtil.playTrans(trans_titleIn);
						break;
					case EComMatchModeType.RankMode: await this.transOutContent(com_contentRank); break;
					case EComMatchModeType.MatchMode: await this.transOutContent(com_contentMatch); break;
					case EComMatchModeType.FriendMode: await this.transOutContent(com_contentFriend); break;
				}
				ctrl_type.selectedIndex = 4;
				this.refreshModeItems(mode);
				await this.transInContent(com_contentMode);
				break;
		}
		this._changing = false;
	}

	private refreshMatchMode() {
		const { com_contentMatch } = this;

		const infos: IMatchInfo[] = [MatchInfo.daHuiShi];

		const { intervalActivityId, intervalId } = $user.activity;
		if (intervalId >= 0) {
			const cfg = $cfgMgr.activity.activity_desktop[intervalActivityId];
			const data = cfg.find(v => v.interval == intervalId);
			MatchInfo.interval[0] = data.desktop_id;
			switch (data.desktop_id) {
				case 33: MatchInfo.interval[1] = 3451; MatchInfo.interval[2] = 3654; break;
				case 34: MatchInfo.interval[1] = 3459; MatchInfo.interval[2] = 3029; break;
				case 35: MatchInfo.interval[1] = 3458; MatchInfo.interval[2] = 3050; break;
				case 46: MatchInfo.interval[1] = 3452; MatchInfo.interval[2] = 3807; break;
				case 47: MatchInfo.interval[1] = 3476; MatchInfo.interval[2] = 3808; break;
				case 48: MatchInfo.interval[1] = 3466; MatchInfo.interval[2] = 4181; break;
				case 49: MatchInfo.interval[1] = 3474; MatchInfo.interval[2] = 4182; break;
				case 50: MatchInfo.interval[1] = 3453; MatchInfo.interval[2] = 4207; break;
				case 51: MatchInfo.interval[1] = 3469; MatchInfo.interval[2] = 4507; break;
				case 52: MatchInfo.interval[1] = 3448; MatchInfo.interval[2] = 0; break;
				case 53: MatchInfo.interval[1] = 0; MatchInfo.interval[2] = 0; break;
				case 54: MatchInfo.interval[1] = 0; MatchInfo.interval[2] = 0; break;
			}
			infos.push(MatchInfo.interval);
		}

		[
			MatchInfo.guYiChange, MatchInfo.baoPaiKuangRe, MatchInfo.peiPaiOpen,
			MatchInfo.longZhiMuYu, MatchInfo.chiYuZhiZhan, MatchInfo.xiuLuoZhiZhan,
		].forEach(v => {
			const cfg = $cfgMgr.desktop.matchmode[v[0]];
			if (cfg.type == 2 && $user.activity.isRunning(cfg.activity_id))
				infos.push(v);
		});

		const cfgXiuXian = $cfgMgr.desktop.matchmode[MatchInfo.xiuXianChang[0]];
		if (cfgXiuXian.is_open)
			infos.push(MatchInfo.xiuXianChang);

		const childCnt = com_contentMatch._children.length;
		for (let i = 0, n = Math.max(infos.length, childCnt); i < n; i++) {
			const info = infos[i];
			const com = (i < childCnt ? com_contentMatch.getChildAt(i) : (!!info && com_contentMatch.addChild($facade.createView(EViewID.ComMatchItemView)))) as ComMatchItemView;
			com && (com.visible = !!info);
			if (!!info) {
				const cfgMode = $cfgMgr.desktop.matchmode[info[0]];
				const data: IComMatchModeData = {
					type: 1,
					icon: $langRes(`myres/bothui/img_${ info[1] }.png`),
					infoLangId: info[2],
					refreshTime: 0,
					desc: $lang(info[3]),
					delete: false,
					open: true,
				};
				switch (info) {
					case MatchInfo.daHuiShi:
						com.onItemClick(this, () => {
							$confirmSma(2, "打开大会室");
						});
						break;
					case MatchInfo.interval:
						data.refreshTime = 6 * 24 * 60 * 60;
						com.onItemClick(this, this.changeShowType, [EComMatchModeType.MatchMode1, cfgMode.room]);
						break;
					case MatchInfo.xiuXianChang:
						com.onItemClick(this, () => {
							const error = $gameUtil.canEnterMode(info[0], 100);
							if (error) return $confirmSma(2, $lang(error));
							this.changeShowType(EComMatchModeType.MatchMode1, cfgMode.room);
						});
						break;
					default:
						com.onItemClick(this, () => {
							const error = $gameUtil.canEnterMode(info[0]);
							if (error) return $confirmSma(2, $lang(error));
							this.changeShowType(EComMatchModeType.MatchMode1, cfgMode.room);
						});
						break;
				}
				com.refresh(data);
			}
		}
	}

	private fetchCurrentMatchInfo(modeList: number[]) {
		if (this._fetchingMatchInfo)
			return;
		this._fetchingMatchInfo = true;
		$netMgr.requests.fetchCurrentMatchInfo({ mode_list: modeList }).then(res => {
			this._fetchingMatchInfo = false;
			if (res.error) {
				Laya.timer.clear(this, this.fetchCurrentMatchInfo);
				return;
			}
			for (const e of res.matches) {
				const index = modeList.indexOf(e.mode_id);
				if (index > -1) {
					const com = this.com_contentMode.getChildAt(index) as ComMatchItemView;
					const data = com.data as IComMatchModeData;
					data.desc = $lang(2467) + e.playing_count;
					com.refresh(data);
				}
			}
		});
	}

	private refreshModeItems(roomType: number) {
		let title_name = "", modeId = 0;
		$cfgMgr.desktop.matchmode.forEach(v => {
			if (v.room == roomType) {
				title_name = v.langField(ECfgLangField.room_name);
				if (v.str_rule) modeId = v.id; // 如果存在规则文本则显示对应规则按钮
			}
		});
		this.txt_title.text = title_name;

		const modeInfos: { mode: number, id: number, met: boolean; }[] = [];
		$cfgMgr.desktop.matchmode.forEach(v => {
			if (v.mode == 0) return;
			if (roomType == v.room) {
				let met = true;
				let level = v.mode < 10 ? $user.account.level.id : $user.account.level3.id;
				if (v.level_limit && level < v.level_limit) met = false;
				if (v.level_limit_ceil && level > v.level_limit_ceil) met = false;
				modeInfos.push({ mode: v.mode, id: v.id, met: met });
			}
		});

		const children = this.com_contentMode._children;
		for (let i = 0; i < children.length; i++) {
			const com = children[i] as ComMatchItemView;
			const info = modeInfos[i];
			com.visible = !!info;
			if (info) {

				let infoLangId = 0, icon = 0;
				switch (roomType) {
					case 200: infoLangId = 2851; break;
					case 210: infoLangId = 2; break;
					case 220: infoLangId = 3051; break;
					case 321: infoLangId = 3652; break;
					case 328: infoLangId = 4183; break;
					case 329:
					case 330: infoLangId = 4184; break;
					default:
						switch (i) {
							case 0: infoLangId = 2; break;
							case 1: infoLangId = 3; break;
							case 2: infoLangId = 24; break;
							case 3: infoLangId = 25; break;
						}
						break;
				}
				switch (info.mode) {
					case 1: icon = 3464; break;
					case 2: icon = 3465; break;
					case 11: icon = 3461; break;
					case 12: icon = 3462; break;
				}
				const data: IComMatchModeData = {
					type: 0,
					icon: icon ? $langRes(`myres/bothui/img_${ icon }.png`) : "",
					infoLangId: infoLangId,
					refreshTime: 0,
					desc: $lang(2467) + "--",
					delete: false,
					open: true,
				};
				com.refresh(data);
			}
		}

		const modeList = modeInfos.filter(v => v.met).map(v => v.id);
		if (modeList.length) {
			this.fetchCurrentMatchInfo(modeList);
			Laya.timer.loop(5000, this, this.fetchCurrentMatchInfo, [modeList]);
		}
	}

	protected override onEnable() {
		this.btn_rankMode.alpha = 0;
		this.btn_matchMode.alpha = 0;
		this.btn_friendMode.alpha = 0;
	}

	protected override onDisable() {
		this.changeShowType(EComMatchModeType.Mode);
	}

	override onOpenAni() {
		return $uiUtil.playTrans(this.trans_in);
	}

	override onCloseAni() {
		let comContent: fgui.GComponent;
		switch (this._curType) {
			case EComMatchModeType.Mode: return $uiUtil.playTrans(this.trans_out);
			case EComMatchModeType.RankMode: comContent = this.com_contentRank; break;
			case EComMatchModeType.MatchMode: comContent = this.com_contentMatch; break;
			case EComMatchModeType.FriendMode: comContent = this.com_contentFriend; break;
			case EComMatchModeType.RankMode1:
			case EComMatchModeType.MatchMode1: comContent = this.com_contentMode; break;
			default: return Promise.resolve();
		}
		$uiUtil.playTrans(this.trans_titleOut);
		return this.transOutContent(comContent);
	}

	private async transInContent(comContent: fgui.GComponent) {
		const { _children, scrollPane } = comContent;
		scrollPane.percY = 0;
		const coms = _children.filter(v => v.visible);
		for (let i = 0; i < coms.length; i++) {
			const com = coms[i];
			com.alpha = 1;
			com.y = -220;
			const oldY = 166 * i;
			com.tweenMoveY(oldY, 0.25).setEase(fgui.EaseType.ExpoOut).setDelay((coms.length - 1 - i) * 0.083);
		}
		await $timeUtil.wait(500);
	}

	private async transOutContent(comContent: fgui.GComponent) {
		if (comContent == this.com_contentMode)
			Laya.timer.clear(this, this.fetchCurrentMatchInfo);

		const coms = comContent._children.filter(v => v.visible);
		for (let i = 0; i < coms.length; i++) {
			const com = coms[i];
			com.tweenFade(0, 0.167).setEase(fgui.EaseType.Linear);
			com.tweenMoveY(com.y - 40, 0.167).setEase(fgui.EaseType.Linear);
		}
		await $timeUtil.wait(167);
	}
}
