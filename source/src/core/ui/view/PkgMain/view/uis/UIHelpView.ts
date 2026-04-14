import { RadioGroup } from "../../../../extention/RadioGroup";
import UIHelp from "../../../../ui/PkgMain/UIHelp";
import { RenderHelpItem1View } from "../renders/RenderHelpItem1View";

export const enum EUIHelpMsg {
	OnBtnPreCourseClick = "UIHelp_OnBtnPreCourseClick",
	OnBtnNextCourseClick = "UIHelp_OnBtnNextCourseClick",
}

const CourseIcons = [
	"course/course0.png",
	"course/course1.png",
	"course/course2.png",
	"course/course3.png",
	"course/course4.png",
	"course/course5.png",
	"course/course6.png",
	"course/course7.png",
	"course/course8.png",
];

const PointIcons = [
	"myres/rules_point/page1.png",
	"myres/rules_point/page2.png",
	"myres/rules_point/page3.png",
];

const PointPopIcons = [
	"myres/rules_point/illustration3.png",
	"myres/rules_point/illustration4.png",
	"myres/rules_point/illustration5.png",
	"myres/rules_point/illustration6.png",
	"myres/rules_point/illustration1.png",
	"myres/rules_point/illustration2.png",
	"myres/rules_point/illustration7.png",
	"myres/rules_point/illustration8.png",
	"myres/rules_point/illustration9.png",
	"myres/rules_point/illustration10.png",
];

export class UIHelpView extends ExtensionClass<IView, UIHelp>(UIHelp) implements IView {
	private _courseIndex = 0;
	private _tabGroup = new RadioGroup();
	private _fanGroup = new RadioGroup();
	private _pointGroup = new RadioGroup();
	private _fanMode = 0;
	//0-普通，1-川麻
	private _fanData: [number, string[]][][][] = [
		[[], [], [], [], [], [], [], []],
		[[], [], [], [], [], [], [], []],
	];

	override onCreate() {
		CourseIcons.forEach((v, i) => (CourseIcons[i] = $langRes(v)));
		PointIcons.forEach((v, i) => (PointIcons[i] = $langRes(v)));
		PointPopIcons.forEach((v, i) => (PointPopIcons[i] = $langRes(v)));

		const {
			btn_bg, btn_tab0, btn_tab1, btn_tab2, btn_fanTab0, btn_fanTab1, btn_fanTab2, btn_fanTab3,
			btn_fanTab4, btn_fanTab5, btn_fanTab6, btn_fanTab7, btn_preCourse, btn_nextCourse, btn_pointTab0,
			btn_pointTab1, btn_pointTab2, btn_pointLink0, btn_pointLink1, btn_pointLink2, btn_pointLink3,
			btn_pointLink4, btn_pointLink5, btn_pointLink6, btn_pointLink7, btn_pointLink8, btn_pointLink9,
			btn_close, list_fan
		} = this;
		btn_bg.onClick(this, this.closeSelf);
		btn_close.onClick(this, this.closeSelf);
		btn_preCourse.onClick(this, this.refreshCourse, [-1]);
		btn_nextCourse.onClick(this, this.refreshCourse, [1]);

		this._tabGroup.init([btn_tab0, btn_tab1, btn_tab2], this, this.onTabChanged, "#E8AF71", "#E8AF71");

		this._fanGroup.init([
			btn_fanTab0, btn_fanTab1, btn_fanTab2, btn_fanTab3, btn_fanTab4, btn_fanTab5, btn_fanTab6,
			btn_fanTab7
		], this, this.onFanTabChanged, "#E0AB67", "#E0AB67");

		this._pointGroup.init([
			btn_pointTab0, btn_pointTab1, btn_pointTab2
		], this, this.onPointTabChanged, "#E0AB67", "#E0AB67");

		[
			btn_pointLink0, btn_pointLink1, btn_pointLink2, btn_pointLink3, btn_pointLink4, btn_pointLink5,
			btn_pointLink6, btn_pointLink7, btn_pointLink8, btn_pointLink9
		].forEach((v, i) => v.onClick(this, this.onPointLinkClick, [v, i]));

		$uiUtil.setList(list_fan, true, this, this.onListFanRender);

		$cfgMgr.fandesc.fandesc.forEach(v => {
			if (!v.show) return;
			const tag = v.tag - 1;
			const mode = v.mode;
			const arr = this._fanData[mode];
			if (arr && tag >= 0 && tag < arr.length) {
				const caseArr: [number, string[]] = [v.id, []];
				for (let i = 0; i < v.case.length;) {
					const e = v.case[i];
					if (e == "|") {
						caseArr[1].push("|");
						i++;
					} else if (e == "b") {
						caseArr[1].push(e);
						i++;
					} else {
						caseArr[1].push(e + v.case[i + 1]);
						i += 2;
					}
				}
				let a = arr[tag];
				arr[tag].push(caseArr);
			}
		});
	}

	override onEnable() {
		const { _tabGroup, loader_pointIcon0, loader_pointIcon1, loader_pointIcon2, loader_pointPop } = this;
		_tabGroup.selectIndex = 0;
		$dynamicResMgr.setLoaders([loader_pointIcon0, loader_pointIcon1, loader_pointIcon2], PointIcons);
		loader_pointPop.visible = false;
	}

	private onTabChanged(index: number) {
		this.ctrl_tab.selectedIndex = index;
		switch (index) {
			case 0: this._fanGroup.selectIndex = 0; break;
			case 1:
				this._courseIndex = 0;
				this.refreshCourse();
				break;
			case 2: this._pointGroup.selectIndex = 0; break;
		}
	}

	//#region 役种一览
	private onFanTabChanged(index: number) {
		const fanData = this._fanData[this._fanMode][index];
		this.list_fan.numItems = fanData.length;
	}

	private onListFanRender(index: number, item: RenderHelpItem1View) {
		const tagIndex = this._fanGroup.selectIndex;
		const fanData = this._fanData[this._fanMode][tagIndex][index];
		item.refresh(fanData[0], fanData[1]);
	}
	//#endregion

	//#region 新手入门
	private refreshCourse(offset = 0) {
		const { _courseIndex, btn_preCourse, btn_nextCourse, txt_coursePage, loader_courseIcon } = this;
		const index = $mathUtil.clamp(_courseIndex + offset, 0, CourseIcons.length - 1);
		this._courseIndex = index;
		btn_preCourse.visible = index > 0;
		btn_nextCourse.visible = index < CourseIcons.length - 1;
		txt_coursePage.text = `${ index + 1 }/${ CourseIcons.length }`;
		$dynamicResMgr.setLoader(loader_courseIcon, CourseIcons[index]);
	}
	//#endregion

	//#region 点数计算
	private onPointTabChanged(index: number) {
		this.ctrl_pointTab.selectedIndex = index;
	}

	private onPointLinkClick(btn: fgui.GButton, index: number, e: Laya.Event) {
		this.refreshPointLinkPop(btn, index);
		Laya.stage.once(Laya.Event.MOUSE_DOWN, this, this.refreshPointLinkPop, [null]);
		e.stopPropagation();
	}

	private refreshPointLinkPop(btn: fgui.GButton, index: number) {
		const pointPop = this.loader_pointPop;
		fgui.GTween.kill(pointPop);
		if (btn) {
			pointPop.alpha = 0;
			pointPop.visible = true;
			pointPop.setPivot(index < 7 ? 0 : 1, 0, true);
			const x = index < 7 ? (btn.x + btn.width + 2) : (btn.x - 2);
			const y = btn.y + 35;
			pointPop.setXY(x, y);
			pointPop.setScale(0, 0);
			pointPop.tweenFade(1, 0.2);
			pointPop.tweenScale(1, 1, 0.2).setEase(fgui.EaseType.BackOut);
			$dynamicResMgr.setLoader(pointPop, PointPopIcons[index]);
		} else {
			fgui.GTween.kill(pointPop);
			pointPop.tweenFade(0, 0.2).onComplete(() => pointPop.visible = false);
		}
	}
	//#endregion

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }

	override onDisable() {
		const { _tabGroup, loader_courseIcon, loader_pointIcon0, loader_pointIcon1, loader_pointIcon2, loader_pointPop } = this;
		_tabGroup.clearSelection();
		$dynamicResMgr.clearLoaders(loader_courseIcon, loader_pointIcon0, loader_pointIcon1, loader_pointIcon2, loader_pointPop);
	}
}
