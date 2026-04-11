import { RadioGroup } from "../../../../extention/RadioGroup";
import UIHelp from "../../../../ui/PkgMain/UIHelp";

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

const PointPopIcons = [
	"myres/rules_point/page1.png",
	"myres/rules_point/page2.png",
	"myres/rules_point/page3.png",
];

const PointPopImages = [
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

	override onCreate() {
		CourseIcons.forEach((v, i) => (CourseIcons[i] = $langRes(v)));
		PointPopIcons.forEach((v, i) => (PointPopIcons[i] = $langRes(v)));
		PointPopImages.forEach((v, i) => (PointPopImages[i] = $langRes(v)));

		const { btn_bg, btn_tab0, btn_tab1, btn_tab2, btn_fanTab0, btn_fanTab1, btn_fanTab2, btn_fanTab3, btn_fanTab4, btn_fanTab5, btn_fanTab6, btn_fanTab7, btn_preCourse, btn_nextCourse, btn_pointTab0, btn_pointTab1, btn_pointTab2, btn_pointLink0, btn_pointLink1, btn_pointLink2, btn_pointLink3, btn_pointLink4, btn_pointLink5, btn_pointLink6, btn_pointLink7, btn_pointLink8, btn_pointLink9, btn_close } = this;
		btn_bg.onClick(this, this.closeSelf);
		btn_close.onClick(this, this.closeSelf);
		btn_preCourse.onClick(this, this.refreshCourse, [-1]);
		btn_nextCourse.onClick(this, this.refreshCourse, [1]);

		this._tabGroup.init([btn_tab0, btn_tab1, btn_tab2], this, this.onTabChanged, "#E8AF71", "#E8AF71");
		this._fanGroup.init([
			btn_fanTab0, btn_fanTab1, btn_fanTab2, btn_fanTab3, btn_fanTab4, btn_fanTab5, btn_fanTab6, btn_fanTab7
		], null, null, "#E0AB67", "#E0AB67");
		this._pointGroup.init([
			btn_pointTab0, btn_pointTab1, btn_pointTab2
		], null, null, "#E0AB67", "#E0AB67");
	}

	override onEnable() {
		this._tabGroup.selectIndex = 0;
	}

	override onDisable() {
		this._tabGroup.clearSelection();
		$dynamicResMgr.clearLoader(this.loader_courseIcon);
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

	private onFanTabChanged(index: number) {

	}

	private onPointTabChanged(index: number) {

	}

	private refreshCourse(offset = 0) {
		const index = $mathUtil.clamp(this._courseIndex + offset, 0, CourseIcons.length - 1);
		this._courseIndex = index;
		this.btn_preCourse.visible = index > 0;
		this.btn_nextCourse.visible = index < CourseIcons.length - 1;
		this.txt_coursePage.text = `${ index + 1 }/${ CourseIcons.length }`;
		$dynamicResMgr.setLoader(this.loader_courseIcon, CourseIcons[index]);
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
