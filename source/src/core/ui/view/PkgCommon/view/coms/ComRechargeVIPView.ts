import ComRechargeVIP from "../../../../ui/PkgCommon/ComRechargeVIP";
import { RenderRechargeItemView } from "../renders/RenderRechargeItemView";

export class ComRechargeVIPView extends ExtendClass<IView, ComRechargeVIP>(ComRechargeVIP) implements IView {

	private _curLevel: number = 1;
	private _vipRewards: IRewardSlot[];

	override onCreate() {
		const { btn_getReward, btn_last, btn_next, list_rewards } = this;
		btn_getReward.onClick(this, this.onBtnGetReward);
		btn_last.onClick(this, this.onBtnLastAndNext, [-1]);
		btn_next.onClick(this, this.onBtnLastAndNext, [1]);
		$uiUtil.setList(list_rewards, true, this, this.onListRewardRender);
	}

	refresh() {
		this._curLevel = $user.recharge.vipLevel;
		this.refreshInfo();
	}

	private refreshInfo() {
		const {
			_curLevel, ctrl_type, com_title, com_curTitle, com_nextTitle, list_rewards,
			pb_vip, btn_getReward, btn_last, btn_next, txt_desc, txt_info1, txt_info2, txt_desc2,
		} = this;
		const { vipExp, vipLevel } = $user.recharge;

		const cfgVip = $cfgMgr.vip.vip[_curLevel];
		const cfgVipMy = $cfgMgr.vip.vip[vipLevel];
		const cfgVipMyNext = $cfgMgr.vip.vip[vipLevel + 1];

		const rewards = this._vipRewards = cfgVip.rewards.filter(v => !!v).map(v => {
			const [id, count] = v.split("-");
			return { id: +id, count: +count };
		});

		const canGetReward = rewards.length && _curLevel <= vipLevel && !$user.recharge.gainedVipLevelReward(_curLevel);
		ctrl_type.selectedIndex = !rewards.length ? 0 : (canGetReward ? 2 : 1);

		com_title.refreshSkin($langRes(cfgVip.img));

		btn_last.visible = !!$cfgMgr.vip.vip[_curLevel - 1];
		btn_next.visible = !!$cfgMgr.vip.vip[_curLevel + 1];
		let leftRedDot = false, rightRedDot = false;
		for (let i = 2; i <= vipLevel; i++) {
			if (!$user.recharge.gainedVipLevelReward(i)) {
				if (i < _curLevel) {
					leftRedDot = true;
					i = _curLevel;
				} else {
					rightRedDot = true;
					break;
				}
			}
		}
		btn_last.iconObject.visible = leftRedDot;
		btn_next.iconObject.visible = rightRedDot;

		list_rewards.numItems = rewards.length;

		txt_desc.langText(2159, cfgVip.charge);

		const descs = cfgVip.langField(ECfgLangField.desc).split("\\n");
		txt_info1.text = descs.filter((_, i) => i % 2 == 0).join("\n");
		txt_info2.text = descs.filter((_, i) => i % 2 == 1).join("\n");

		pb_vip.titleType = cfgVipMyNext ? fgui.ProgressTitleType.ValueAndMax : fgui.ProgressTitleType.Value;
		pb_vip.max = cfgVipMyNext ? cfgVipMyNext.charge : vipExp;
		pb_vip.value = vipExp;

		com_curTitle.refreshSkin($langRes(cfgVipMy.img));
		txt_desc2.visible = !!cfgVipMyNext;
		cfgVipMyNext && txt_desc2.langText(2158, cfgVipMyNext.charge - vipExp);
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

	private onListRewardRender(index: number, item: RenderRechargeItemView) {
		const reward = this._vipRewards[index];
		item.refresh(reward.id, reward.count, $user.recharge.gainedVipLevelReward(this._curLevel));
	}
}
