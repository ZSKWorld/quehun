import ComRechargeVIP from "../../../../ui/PkgCommon/ComRechargeVIP";

export class ComRechargeVIPView extends ExtensionClass<IView, ComRechargeVIP>(ComRechargeVIP) implements IView {

	private _myLevel: number = 1;
	private _curLevel: number = 1;

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
		Logger.error(_myLevel, _curLevel);
		const canGetReward = _curLevel > 1 && _curLevel <= _myLevel && !$user.recharge.gainedVipLevelReward(_curLevel);
		ctrl_type.selectedIndex = _curLevel == 1 ? 0 : (canGetReward ? 2 : 1);

		const cfgVip = $cfgMgr.vip.vip[_curLevel];
	}

	private onBtnGetReward() {

	}

	private onBtnLastAndNext(step: number) {
		const level = this._curLevel + step;
		if (!$cfgMgr.vip.vip[level]) return;
		this._curLevel = level;
		this.refreshInfo();
	}

	private canGetReward(level: number) {
		const { _myLevel, _curLevel } = this;
		if (level <= 1 || level > _myLevel) return;
		return !$user.recharge.gainedVipLevelReward(level);
	}
}
