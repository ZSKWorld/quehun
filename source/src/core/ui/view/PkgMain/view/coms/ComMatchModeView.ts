import ComMatchMode from "../../../../ui/PkgMain/ComMatchMode";
import { EComMatchModeType } from "../../Definition";
import { ComMatchItemView } from "./ComMatchItemView";

const TitleLang = {
	[EComMatchModeType.RankMode]: 2079,
	[EComMatchModeType.MatchMode]: 2025,
	[EComMatchModeType.FriendMode]: 2023,
};

export class ComMatchModeView extends ComMatchMode {
	private _curType = EComMatchModeType.Mode;
	private _changing = false;

	override onCreate() {
		const {
			btn_rankMode, btn_matchMode, btn_friendMode, btn_back,
			com_contentRank, com_contentMatch, com_contentFriend, com_contentMode
		} = this;
		btn_rankMode.onClick(this, this.changeShowType, [EComMatchModeType.RankMode]);
		btn_matchMode.onClick(this, this.changeShowType, [EComMatchModeType.MatchMode]);
		btn_friendMode.onClick(this, this.changeShowType, [EComMatchModeType.FriendMode]);
		btn_back.onClick(this, this.onBtnBackClick);

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
				descLangId: 2462 + i,
				delete: false,
				open: !!cfgMode.is_open,
			};
			if (data.open)
				com.onItemClick(this, this.changeShowType, [EComMatchModeType.RankMode1]);
			com.refresh(data);
			com_contentRank.addChild(com);
		}

		for (let i = 0; i < 5; i++) {
			const com = $facade.createView<ComMatchItemView>(EViewID.ComMatchItemView);
			com.onItemClick(this, this.changeShowType, [EComMatchModeType.MatchMode1]);
			com_contentMatch.addChild(com);
		}

		for (let i = 0; i < 2; i++) {
			const com = $facade.createView<ComMatchItemView>(EViewID.ComMatchItemView);
			const createRoom = i == 0;
			com.refresh({
				type: 2, open: true, delete: true, refreshTime: 0,
				descLangId: 2470, infoLangId: createRoom ? 8 : 9,
				icon: $langRes(`myres/bothui/img_${ createRoom ? 3450 : 3455 }.png`),
			});
			if (createRoom)
				com.onItemClick(this, () => this.openView(EViewID.UICreateRoomView, this.data, EViewOpenType.Hide));
			else
				com.onItemClick(this, () => $confirmSma(2, "加入房间"));
			com_contentFriend.addChild(com);
		}

		for (let i = 0; i < 5; i++) {
			const com = $facade.createView<ComMatchItemView>(EViewID.ComMatchItemView);
			com_contentMode.addChild(com);
		}
	}

	protected override onEnable() {
		this.btn_rankMode.alpha = 0;
		this.btn_matchMode.alpha = 0;
		this.btn_friendMode.alpha = 0;
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

	private async changeShowType(type: EComMatchModeType) {
		if (this._changing) return;
		const lastType = this._curType;
		if (type == lastType) return;
		this._curType = type;

		this._changing = true;
		const {
			txt_title, ctrl_type, trans_in, trans_out, trans_titleIn, trans_titleOut, com_contentRank,
			com_contentMatch, com_contentFriend, com_contentMode
		} = this;
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
				txt_title.langText(TitleLang[type]);
				if (lastType == EComMatchModeType.Mode) {
					await $uiUtil.playTrans(trans_out);
					$uiUtil.playTrans(trans_titleIn);
				} else {
					await this.transOutContent(com_contentMode);
				}
				ctrl_type.selectedIndex = type;
				switch (type) {
					case EComMatchModeType.RankMode: await this.transInContent(com_contentRank); break;
					case EComMatchModeType.MatchMode: await this.transInContent(com_contentMatch); break;
					case EComMatchModeType.FriendMode: await this.transInContent(com_contentFriend); break;
				}
				break;
			case EComMatchModeType.RankMode1:
			case EComMatchModeType.MatchMode1:
				switch (lastType) {
					case EComMatchModeType.RankMode: await this.transOutContent(com_contentRank); break;
					case EComMatchModeType.MatchMode: await this.transOutContent(com_contentMatch); break;
					case EComMatchModeType.FriendMode: await this.transOutContent(com_contentFriend); break;
				}
				ctrl_type.selectedIndex = 4;
				await this.transInContent(com_contentMode);
				break;
		}
		this._changing = false;
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
		for (let i = 0; i < _children.length; i++) {
			const com = _children[i];
			com.alpha = 1;
			com.y = -220;
			const oldY = 166 * i;
			com.tweenMoveY(oldY, 0.25).setEase(fgui.EaseType.ExpoOut).setDelay((_children.length - 1 - i) * 0.083);
		}
		await $timeUtil.wait(500);
	}

	private async transOutContent(comContent: fgui.GComponent) {
		const _children = comContent._children;
		for (let i = 0; i < _children.length; i++) {
			const com = _children[i];
			com.tweenFade(0, 0.167).setEase(fgui.EaseType.Linear);
			com.tweenMoveY(com.y - 40, 0.167).setEase(fgui.EaseType.Linear);
		}
		await $timeUtil.wait(167);
	}
}
