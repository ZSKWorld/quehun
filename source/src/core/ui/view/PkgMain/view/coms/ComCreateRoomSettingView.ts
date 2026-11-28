import { RadioGroup } from "../../../../extention/RadioGroup";
import ComCreateRoomSetting from "../../../../ui/PkgMain/ComCreateRoomSetting";

export class ComCreateRoomSettingView extends ComCreateRoomSetting {
	private _tabJiFei = new RadioGroup();
	private _tabGuYi = new RadioGroup();
	private _tabZiMo = new RadioGroup();
	private _tabChiBaoPai = new RadioGroup();
	private _tabShiDuan = new RadioGroup();
	private _tabFanFu = new RadioGroup();
	private _tabEasy = new RadioGroup();
	private _tabAI = new RadioGroup();
	private _tabOpenHand = new RadioGroup();

	get startPoint() { return +this.btn_startPoint.title; }
	get oneMustPoint() { return +this.btn_oneMustPoint.title; }
	get jiFei() { return this._tabJiFei.selectIndex; }
	get guYi() { return this._tabGuYi.selectIndex; }
	get ziMo() { return this._tabZiMo.selectIndex; }
	get chiBaoPai() { return this._tabChiBaoPai.selectIndex; }
	get shiDuan() { return this._tabShiDuan.selectIndex; }
	get fanFu() { return this._tabFanFu.selectIndex; }
	get easy() { return this._tabEasy.selectIndex; }
	get AI() { return this._tabAI.selectIndex; }
	get openHand() { return this._tabOpenHand.selectIndex; }

	override onCreate() {
		const {
			ctrl_type, ctrl_openSetting,
			btn_startPoint, btn_oneMustPoint, btn_jiFei0, btn_jiFei1, btn_guYi0, btn_guYi1, btn_ziMo0, btn_ziMo1, btn_ziMoTip,
			btn_chiBaoPai0, btn_chiBaoPai1, btn_chiBaoPai2, btn_chiBaoPai3, btn_shiDuan0, btn_shiDuan1, btn_shiDuanTip, btn_fanFu0,
			btn_fanFu1, btn_fanFu2, btn_easy0, btn_easy1, btn_easyTip, btn_ai0, btn_ai1, btn_openHand0, btn_openHand1,

			_tabJiFei, _tabGuYi, _tabZiMo, _tabChiBaoPai, _tabShiDuan, _tabFanFu, _tabEasy, _tabAI, _tabOpenHand,
		} = this;
		btn_ziMoTip.onClick(null, $confirmSma, [2, $lang(63), "", true, EAlignType.Left]);
		btn_shiDuanTip.onClick(null, $confirmSma, [2, $lang(54), "", true, EAlignType.Left]);
		btn_easyTip.onClick(null, $confirmSma, [2, $lang(53), "", true, EAlignType.Left]);

		ctrl_type.on(fgui.Events.STATE_CHANGED, this, () => {
			const index = ctrl_type.selectedIndex;
			if (index > 1) return this.resetSelection();
			const selectedColor = EColorString._000000, unselectedColor = EColorString._ffffff;

			btn_startPoint.title = String(index ? 35000 : 25000);
			btn_oneMustPoint.title = String(index ? 40000 : 30000);
			const oldIndex = _tabChiBaoPai.selectIndex;
			const btns = index ? [btn_chiBaoPai0, btn_chiBaoPai1] : [btn_chiBaoPai0, btn_chiBaoPai2, btn_chiBaoPai3];
			_tabChiBaoPai.init(btns, null, null, selectedColor, unselectedColor);
			_tabChiBaoPai.selectIndex = Math.min(oldIndex, 1);
		});
		ctrl_openSetting.on(fgui.Events.STATE_CHANGED, this, () => {
			if (ctrl_openSetting.selectedIndex == 0)
				this.resetSelection();
		});

		const selectedColor = EColorString._000000, unselectedColor = EColorString._ffffff;
		_tabJiFei.init([btn_jiFei0, btn_jiFei1], null, null, selectedColor, unselectedColor);
		_tabGuYi.init([btn_guYi0, btn_guYi1], null, null, selectedColor, unselectedColor);
		_tabZiMo.init([btn_ziMo0, btn_ziMo1], null, null, selectedColor, unselectedColor);
		_tabChiBaoPai.init([btn_chiBaoPai0, btn_chiBaoPai2, btn_chiBaoPai3], null, null, selectedColor, unselectedColor);
		_tabShiDuan.init([btn_shiDuan0, btn_shiDuan1], null, null, selectedColor, unselectedColor);
		_tabFanFu.init([btn_fanFu0, btn_fanFu1, btn_fanFu2], null, null, selectedColor, unselectedColor);
		_tabEasy.init([btn_easy0, btn_easy1], null, null, selectedColor, unselectedColor);
		_tabAI.init([btn_ai0, btn_ai1], null, null, selectedColor, unselectedColor);
		_tabOpenHand.init([btn_openHand0, btn_openHand1], null, null, selectedColor, unselectedColor);

		this.resetSelection();
	}

	private resetSelection() {
		const {
			ctrl_type, btn_startPoint, btn_oneMustPoint,
			_tabJiFei, _tabGuYi, _tabZiMo, _tabChiBaoPai, _tabShiDuan, _tabFanFu, _tabEasy, _tabAI, _tabOpenHand,
		} = this;

		const siRen = ctrl_type.selectedIndex = 0;
		btn_startPoint.title = String(siRen ? 25000 : 35000);
		btn_oneMustPoint.title = String(siRen ? 30000 : 40000);

		_tabJiFei.selectIndex = 1;
		_tabGuYi.selectIndex = 0;
		_tabZiMo.selectIndex = 1;
		_tabChiBaoPai.selectIndex = 1;
		_tabShiDuan.selectIndex = 1;
		_tabFanFu.selectIndex = 0;
		_tabEasy.selectIndex = 1;
		_tabAI.selectIndex = 0;
		_tabOpenHand.selectIndex = 0;
	}
}
