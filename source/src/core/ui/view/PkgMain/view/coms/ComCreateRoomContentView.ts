import { RadioGroup } from "../../../../extention/RadioGroup";
import ComCreateRoomContent from "../../../../ui/PkgMain/ComCreateRoomContent";

export const enum EComCreateRoomContentMsg {

}

export class ComCreateRoomContentView extends ComCreateRoomContent {
	private _specialBtns: fgui.GButton[] = [];
	private _modeData: ISheetData_Desktop_FriendRoom[] = [];

	private _tabModeCb: (index: number) => void;
	private _tabMode = new RadioGroup();
	private _tabJuShu = new RadioGroup();
	private _tabThink = new RadioGroup();
	private _tabSetting = new RadioGroup();

	get selectedModeId() {
		return this._modeData[this._tabMode.selectIndex].id;
	}

	get createData() {
		const { _modeData, _tabMode, _tabJuShu, _tabThink, _tabSetting, com_setting } = this;

		const cfgMode = _modeData[_tabMode.selectIndex];

		const juShu = _tabJuShu.selectIndex;
		const juShuValue = juShu == 0 ? 4 : 0;
		const mode = cfgMode.set_jushu == 0 ? 1 : (cfgMode.id == 2 ? (10 + juShu + juShuValue) : (juShu + juShuValue));

		//高级设置部分，如果是三人局或四人局，开启高级设置，则按照设置内容传，未开启则按照初始值传，其它模式不用传
		const detailRule: Partial<IGameDetailRule> = {
			time_add: [5, 10, 20, 0, 0][_tabThink.selectIndex],
			time_fixed: [3, 5, 5, 60, 300][_tabThink.selectIndex]
		};
		if (cfgMode.id == 1 || cfgMode.id == 2) {
			const {
				startPoint: sp, oneMustPoint: omp, jiFei, guYi, ziMo, chiBaoPai, shiDuan, fanFu, easy, AI, openHand,
			} = com_setting;

			detailRule.init_point = sp;
			detailRule.fandian = omp;

			//四人模式下才有古役
			if (cfgMode.id == 1) {
				detailRule.guyi_mode = guYi;
				if (guYi) detailRule.enable_renhe = 2;
				detailRule.dora_count = chiBaoPai == 0 ? 0 : chiBaoPai == 1 ? 3 : 4;
			} else if (cfgMode.id == 2) { //三人模式下才有自摸损
				detailRule.have_zimosun = ziMo == 1;
				detailRule.dora_count = chiBaoPai == 0 ? 0 : 2;
			}
			detailRule.shiduan = shiDuan;
			detailRule.fanfu = fanFu == 2 ? 4 : fanFu == 1 ? 2 : 1;
			detailRule.bianjietishi = easy == 1;
			detailRule.ai_level = AI + 1;
			detailRule.open_hand = openHand;
			detailRule.can_jifei = jiFei == 1;
		}

		const reqData: IReqCreateRoom = {
			player_count: _tabJuShu.selectIndex == 3 ? 1 : (_tabMode.selectIndex == 1 ? 3 : 4),
			mode: {
				mode: mode,
				ai: true,
				detail_rule: detailRule as any,
				extendinfo: undefined,
				testing_environment: undefined,
				game_setting: undefined
			},
			public_live: false,
			client_version_string: $gameMgr.clientVersionStr,
			pre_rule: (cfgMode.id == 1 || cfgMode.id == 2) ? undefined : cfgMode.pre_rule,
		};
		return reqData;

	}

	override onCreate() {
		const {
			_specialBtns, ctrl_type, ctrl_openSetting, com_setting, group_jushu,
			btn_siRen, btn_sanRen, btn_special, btn_juShu0, btn_juShu1, btn_juShu2, btn_juShu3, btn_think0,
			btn_think1, btn_think2, btn_think3, btn_think4, btn_setting0, btn_setting1,

			_tabMode, _tabJuShu, _tabThink, _tabSetting
		} = this;

		_specialBtns.push(btn_siRen, btn_sanRen, btn_special);

		const selectedColor = EColorString._000000, unselectedColor = EColorString._ffffff;
		this._tabModeCb = index => {
			group_jushu.visible = index < 2 || !!this._modeData[index].set_jushu;
			ctrl_type.selectedIndex = Math.min(index, 2);
			com_setting.scaleY = com_setting.onStage ? 1 : 0;
			this.updateBounds();
		};

		_tabJuShu.init([btn_juShu0, btn_juShu1, btn_juShu2, btn_juShu3], null, null, selectedColor, unselectedColor);
		_tabThink.init([btn_think0, btn_think1, btn_think2, btn_think3, btn_think4], null, null, selectedColor, unselectedColor);
		_tabSetting.init([btn_setting0, btn_setting1], this, index => {
			ctrl_openSetting.selectedIndex = index;
			com_setting.scaleY = com_setting.onStage ? 1 : 0;
			this.updateBounds();
		}, selectedColor, unselectedColor);

		this.initModesTab();
		_tabJuShu.selectIndex = 2;
		_tabThink.selectIndex = 2;
		_tabSetting.selectIndex = 0;
	}

	protected override onEnable() {
		this.initModesTab();
	}

	private initModesTab() {
		const { _specialBtns, btn_special, _tabMode, _modeData } = this;

		const openModes = $user.friend.room.getOpenModes;
		const siRen = openModes.find(v => v.id == 1);
		const sanRen = openModes.find(v => v.id == 2);
		const modes = openModes.filter(v => (v.id != 1 && v.id != 2));
		modes.unshift(siRen, sanRen);

		const invalidModes = _modeData.length != modes.length || _modeData.some((v, i) => v.id != modes[i].id);
		if (invalidModes) {
			this._modeData = modes;
			const max = Math.max(modes.length, _specialBtns.length);
			for (let i = 0; i < max; i++) {
				const m = modes[i];
				let btn = _specialBtns[i];
				if (m) {
					if (!btn) {
						btn = fgui.UIPackage.createObject("PkgMain", "BtnCreateRoomSpecial").asButton;
						_specialBtns[i] = btn;
						this.addChild(btn);
					}
					btn.visible = true;
					btn.langText(+m.str_name);
					if (i > 1)
						btn.group = btn_special.group;
				} else {
					btn && (btn.visible = false);
				}
			}
			_specialBtns.forEach((v, i) => v.visible && i > 1 && (v.y = 147));
			const validBtns = _specialBtns.filter(v => v.visible);
			_tabMode.init(validBtns, this, this._tabModeCb, EColorString._000000, EColorString._ffffff);
			_tabMode.selectIndex = 0;
		}
	}
}
