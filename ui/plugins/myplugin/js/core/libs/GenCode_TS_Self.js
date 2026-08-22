"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenCode_TS_Self = GenCode_TS_Self;
const CodeWriter_1 = require("./CodeWriter");
const signArr = ["UI", "Com", "Btn", "Render", "Label"];
const viewDirs = ["uis/", "coms/", "btns/", "renders/", "labels/"];
function setMemberTypeName(info, clsInfo) {
    if (!info.res)
        return;
    const resName = info.res.name;
    const viewIndex = signArr.findIndex(v => resName.startsWith(v));
    if (viewIndex >= 0) {
        info.type = resName + "View";
        let infoRefIndex = -1;
        for (let i = 0; i < clsInfo.references.Count; i++) {
            if (clsInfo.references.get_Item(i).startsWith(resName)) {
                infoRefIndex = i;
                break;
            }
        }
        const ref = `/../view/${info.res.owner.name}/view/${viewDirs[viewIndex]}${info.type}`;
        if (infoRefIndex >= 0)
            clsInfo.references.set_Item(infoRefIndex, ref);
        else
            clsInfo.references.Contains(ref) == false && clsInfo.references.Add(ref);
        return true;
    }
    return false;
}
/** 加入不同包的资源引入路径 */
function CollectClasses(handler, stripMember, ns) {
    const classes1 = handler.CollectClasses(stripMember, stripMember, ns);
    let hasOtherPkgRes = false;
    classes1.ForEach(clsInfo => {
        clsInfo.members.ForEach(memberInfo => {
            if (memberInfo.res) {
                if (memberInfo.res.owner.name != handler.pkg.name) {
                    if (!handler.items.Contains(memberInfo.res)) {
                        hasOtherPkgRes = true;
                        handler.items.Add(memberInfo.res);
                    }
                }
            }
        });
    });
    const classes2 = hasOtherPkgRes ? handler.CollectClasses(stripMember, stripMember, ns) : classes1;
    classes2.ForEach(clsInfo => {
        const clsInfo2 = classes1.Find(v => v.className == clsInfo.className);
        if (!clsInfo2)
            return;
        clsInfo2.members.ForEach(memberInfo => {
            if (memberInfo.res) {
                const existRes = classes2.Find(v => v.res == memberInfo.res) != null;
                existRes && setMemberTypeName(memberInfo, clsInfo2);
            }
        });
    });
    return classes1;
}
function genReferenceExt(writer, references) {
    let refCount = references.Count;
    if (refCount > 0) {
        for (let j = 0; j < refCount; j++) {
            let ref = references.get_Item(j);
            if (ref.startsWith("/")) {
                let tempArr = ref.split("/");
                if (ref.startsWith("//")) {
                    writer.writeln('import %s from "..%s";', tempArr[tempArr.length - 1], ref.substring(1));
                }
                else {
                    writer.writeln('import { %s } from "..%s";', tempArr[tempArr.length - 1], ref);
                }
            }
            else
                writer.writeln('import %s from "./%s";', ref, ref);
        }
        writer.writeln();
    }
}
const MemberTypeMap = {
    "fgui.GComponent": "com_",
    "fgui.GButton": "btn_",
    "fgui.GComboBox": "cmb_",
    "fgui.GLabel": "label_",
    "fgui.GProgressBar": "pb_",
    "fgui.GScrollBar": "sb_",
    "fgui.GSlider": "slider_",
    "fgui.GTextField": "txt_",
    "fgui.GRichTextField": "rtxt_",
    "fgui.GTextInput": "itxt_",
    "fgui.GGraph": "graph_",
    "fgui.GList": "list_",
    "fgui.GLoader": "loader_",
    "fgui.GGroup": "group_",
    "fgui.GLoader3D": "loader3d_",
    "fgui.GImage": "img_",
    "fgui.Controller": "ctrl_",
    "fgui.Transition": "trans_",
    // "component":"com_",
    "Button": "btn_",
    "Label": "label_",
    "ProgressBar": "pb_",
    "ScrollBar": "sb_",
    "Slider": "slider_",
    "ComboBox": "cmb_",
};
function customMemberVarName(member) {
    var _a;
    const { varName, type, res } = member;
    const extType = (_a = res === null || res === void 0 ? void 0 : res.GetAsset()) === null || _a === void 0 ? void 0 : _a.extension;
    if (MemberTypeMap[type])
        return MemberTypeMap[type] + varName;
    if (MemberTypeMap[extType])
        return MemberTypeMap[extType] + varName;
    return "com_" + varName;
}
const SuperClassNameMap = {
    "fgui.GComponent": "GComponentView",
    "fgui.GButton": "GButtonView",
    "fgui.GComboBox": "GComboBoxView",
    "fgui.GLabel": "GLabelView",
    "fgui.GProgressBar": "GProgressBarView",
    "fgui.GScrollBar": "GScrollBarView",
    "fgui.GSlider": "GSliderView",
};
function customSuperClassName(superClassName) {
    if (SuperClassNameMap[superClassName])
        return SuperClassNameMap[superClassName];
    console.error("not found super class:", superClassName);
    return superClassName;
}
function GenCode_TS_Self(handler) {
    let settings = handler.project.GetSettings("Publish").codeGeneration;
    let codePkgName = handler.ToFilename(handler.pkg.name); //convert chinese to pinyin, remove special chars etc.
    let exportCodePath = handler.exportCodePath + '/' + codePkgName;
    let namespaceName = codePkgName;
    let ns = "fgui";
    let isThree = handler.project.type == CS.FairyEditor.ProjectType.ThreeJS;
    if (settings.packageName)
        namespaceName = settings.packageName + '.' + namespaceName;
    //CollectClasses(stripeMemeber, stripeClass, fguiNamespace)
    // let classes = handler.CollectClasses(settings.ignoreNoname, settings.ignoreNoname, ns);
    let classes = CollectClasses(handler, settings.ignoreNoname, ns);
    handler.SetupCodeFolder(exportCodePath, "ts"); //check if target folder exists, and delete old files
    let getMemberByName = settings.getMemberByName;
    let classCnt = classes.Count;
    let writer = new CodeWriter_1.default({ blockFromNewLine: false, usingTabs: true });
    for (let i = 0; i < classCnt; i++) {
        let classInfo = classes.get_Item(i);
        let members = classInfo.members;
        let references = classInfo.references;
        writer.reset();
        let refCount = references.Count;
        const superClassName = customSuperClassName(classInfo.superClassName);
        references.Insert(0, `/../core/viewBase/${superClassName}`);
        genReferenceExt(writer, references);
        if (isThree) {
            writer.writeln('import * as fgui from "fairygui-three";');
            if (refCount == 0)
                writer.writeln();
        }
        writer.writeln('export default class %s extends %s', classInfo.className, superClassName);
        writer.startBlock();
        writer.writeln();
        const protectedProperty = signArr.some(v => classInfo.className.startsWith(v));
        let memberCnt = members.Count;
        for (let j = 0; j < memberCnt; j++) {
            let memberInfo = members.get_Item(j);
            let memberVarName = customMemberVarName(memberInfo);
            writer.writeln(`${protectedProperty ? "protected" : "public"} %s: %s;`, memberVarName, memberInfo.type);
        }
        writer.writeln('public static url: string = "ui://%s%s";', handler.pkg.id, classInfo.resId);
        writer.writeln();
        writer.writeln('public static createInstance(): %s', classInfo.className);
        writer.startBlock();
        writer.writeln('return <%s>(%s.UIPackage.createObject("%s", "%s"));', classInfo.className, ns, handler.pkg.name, classInfo.resName);
        writer.endBlock();
        writer.writeln();
        writer.writeln('protected override onConstruct(): void');
        writer.startBlock();
        for (let j = 0; j < memberCnt; j++) {
            let memberInfo = members.get_Item(j);
            let memberVarName = customMemberVarName(memberInfo);
            if (memberInfo.group == 0) {
                if (getMemberByName)
                    writer.writeln('this.%s = <%s>(this.getChild("%s"));', memberVarName, memberInfo.type, memberInfo.name);
                else
                    writer.writeln('this.%s = <%s>(this.getChildAt(%s));', memberVarName, memberInfo.type, memberInfo.index);
            }
            else if (memberInfo.group == 1) {
                if (getMemberByName)
                    writer.writeln('this.%s = this.getController("%s");', memberVarName, memberInfo.name);
                else
                    writer.writeln('this.%s = this.getControllerAt(%s);', memberVarName, memberInfo.index);
            }
            else {
                if (getMemberByName)
                    writer.writeln('this.%s = this.getTransition("%s");', memberVarName, memberInfo.name);
                else
                    writer.writeln('this.%s = this.getTransitionAt(%s);', memberVarName, memberInfo.index);
            }
        }
        writer.endBlock();
        writer.endBlock(); //class
        writer.save(exportCodePath + '/' + classInfo.className + '.ts');
    }
    writer.reset();
    let binderName = codePkgName + 'Binder';
    for (let i = 0; i < classCnt; i++) {
        let classInfo = classes.get_Item(i);
        writer.writeln('import %s from "./%s";', classInfo.className, classInfo.className);
    }
    for (let i = 0; i < classCnt; i++) {
        let classInfo = classes.get_Item(i);
        const viewIndex = signArr.findIndex(v => classInfo.className.startsWith(v));
        if (viewIndex >= 0)
            writer.writeln('import { %sView } from "../../view/%s/view/%s%sView";', classInfo.className, classInfo.res.owner.name, viewDirs[viewIndex], classInfo.className);
    }
    if (isThree) {
        writer.writeln('import * as fgui from "fairygui-three";');
        writer.writeln();
    }
    writer.writeln();
    writer.writeln('export default class %s', binderName);
    writer.startBlock();
    writer.writeln('public static bindAll(): void');
    writer.startBlock();
    for (let i = 0; i < classCnt; i++) {
        let classInfo = classes.get_Item(i);
        const viewIndex = signArr.findIndex(v => classInfo.className.startsWith(v));
        if (viewIndex == -1)
            writer.writeln('%s.UIObjectFactory.setExtension(%s.url, %s);', ns, classInfo.className, classInfo.className);
        else
            writer.writeln('%s.UIObjectFactory.setExtension(%s.url, %sView);', ns, classInfo.className, classInfo.className);
    }
    writer.endBlock(); //bindall
    writer.endBlock(); //class
    writer.save(exportCodePath + '/' + binderName + '.ts');
}
