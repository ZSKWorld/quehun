let a: fgui.GComponent;
let b: fgui.GButton;
let c: fgui.GLabel;
let d: fgui.GProgressBar;
let e: fgui.GScrollBar;
let f: fgui.GSlider;
let g: fgui.GComboBox;

type ViewBaseType = fgui.GComponent
	| fgui.GButton
	| fgui.GLabel
	| fgui.GProgressBar
	| fgui.GScrollBar
	| fgui.GSlider
	| fgui.GComboBox;

// type ViewBaseClass = typeof fgui.GComponent
// 	| typeof fgui.GButton
// 	| typeof fgui.GLabel
// 	| typeof fgui.GProgressBar
// 	| typeof fgui.GScrollBar
// 	| typeof fgui.GSlider
// 	| typeof fgui.GComboBox;

const ClassMap = new Map<Class<ViewBaseType>, Class<ViewBaseType>>();

export function ViewBase(cls: Class<ViewBaseType>) {
	if (ClassMap.has(cls)) return ClassMap.get(cls);
	const NewClass = class extends ExtendClass<IView, Class<ViewBaseType>>(cls) {
	};
	ClassMap.set(cls, NewClass);
	return NewClass;
}