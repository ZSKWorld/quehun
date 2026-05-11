import ComRechargeVIP from "../../../../ui/PkgCommon/ComRechargeVIP";

export class ComRechargeVIPView extends ExtensionClass<IView, ComRechargeVIP>(ComRechargeVIP) implements IView {

	private _myLevel: number = 1;
	private _curLevel: number = 1;
	private _vipRewards: IRewardSlot[];

	override onCreate() {
		const { btn_getReward, btn_last, btn_next } = this;
		btn_getReward.onClick(this, this.onBtnGetReward);
		btn_last.onClick(this, this.onBtnLastAndNext, [-1]);
		btn_next.onClick(this, this.onBtnLastAndNext, [1]);
	}

	refresh(level: number) {
		this._myLevel = level;
		this._curLevel = level;
		this.refreshInfo();
	}

	private refreshInfo() {
		const {
			_myLevel, _curLevel, ctrl_type, com_title, com_curTitle, com_nextTitle, list_rewards,
			pb_vip, btn_getReward, btn_last, btn_next, txt_desc, txt_info1, txt_info2, txt_desc2,
		} = this;

		const { vipExp, vipLevel } = $user.recharge;

		const isFirstLevel = _curLevel <= 1;
		const canGetReward = !isFirstLevel && _curLevel <= _myLevel && !$user.recharge.gainedVipLevelReward(_curLevel);
		ctrl_type.selectedIndex = isFirstLevel ? 0 : (canGetReward ? 2 : 1);

		const cfgVip = $cfgMgr.vip.vip[_curLevel];
		const cfgVipMy = $cfgMgr.vip.vip[_myLevel];
		const cfgVipMyNext = $cfgMgr.vip.vip[_myLevel + 1];

		com_title.refreshSkin($langRes(cfgVip.img));

		btn_last.visible = !!$cfgMgr.vip.vip[_curLevel - 1];
		btn_next.visible = !!$cfgMgr.vip.vip[_curLevel + 1];
		let leftRedDot = false, rightRedDot = false;
		for (let i = 2; i <= _myLevel; i++) {
			if (!$user.recharge.gainedVipLevelReward(i)) {
				if (i < _curLevel) {
					leftRedDot = true;
					i = _curLevel + 1;
				} else {
					rightRedDot = true;
					break;
				}
			}
		}
		btn_last.iconObject.visible = leftRedDot;
		btn_next.iconObject.visible = rightRedDot;

		this._vipRewards = isFirstLevel ? null : cfgVip.rewards.filter(v => !!v).map(v => {
			const [id, count] = v.split("-");
			return { id: +id, count: +count };
		});
		!isFirstLevel && (list_rewards.numItems = this._vipRewards.length);

		!isFirstLevel && txt_desc.langText(2159, cfgVip.charge);

		pb_vip.titleType = cfgVipMyNext ? fgui.ProgressTitleType.ValueAndMax : fgui.ProgressTitleType.Value;
		pb_vip.max = cfgVipMyNext ? cfgVipMyNext.charge : vipExp;
		pb_vip.value = vipExp;

		com_curTitle.refreshSkin($langRes(cfgVipMy.img));
		txt_desc2.visible = !!cfgVipMyNext;
		cfgVipMyNext && txt_desc2.langText(2158, cfgVipMyNext.charge - cfgVipMy.charge);
		com_nextTitle.visible = !!cfgVipMyNext;
		cfgVipMyNext && com_nextTitle.refreshSkin($langRes(cfgVipMyNext.img));
	}

	private onBtnGetReward() {

	}

	private onBtnLastAndNext(step: number) {
		const level = this._curLevel + step;
		if (!$cfgMgr.vip.vip[level]) return;
		this._curLevel = level;
		this.refreshInfo();
	}
}
