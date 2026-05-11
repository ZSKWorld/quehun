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

		const canGetReward = _curLevel > 1 && _curLevel <= _myLevel && !$user.recharge.gainedVipLevelReward(_curLevel);
		ctrl_type.selectedIndex = _curLevel == 1 ? 0 : (canGetReward ? 2 : 1);

		const cfgVip = $cfgMgr.vip.vip[_curLevel];
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

		txt_desc.langText(2159, cfgVip.charge);
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
