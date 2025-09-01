//注入全局变量
window.windowImmit = function (name, obj) { window[name] = obj; }

//用于扩展类字段，在外部定义的字段在内部可读，扩展的字段或方法不能在构造期间调用
window.ExtensionClass = function (cls) { return cls; }

/** 页面类型 */
windowImmit("ViewType", (function (enumObj) {
    enumObj["UI"] = "UI";
    enumObj["Component"] = "Component";
    enumObj["Render"] = "Render";
    enumObj["Button"] = "Button";
    return enumObj;
})({}));

/** UI层级 */
windowImmit("Layer", (function (enumObj) {
    enumObj["Scene"] = "Scene";
    enumObj["UIBottom"] = "UIBottom";
    enumObj["UIMiddle"] = "UIMiddle";
    enumObj["UITop"] = "UITop";
    enumObj["Dialog"] = "Dialog";
    enumObj["Alert"] = "Alert";
    enumObj["Lock"] = "Lock";
    return enumObj;
})({}));

/** 按键事件类型 */
windowImmit("KeyEventType", (function (enumObj) {
    enumObj["KeyDown"] = "keydown";
    enumObj["KeyPress"] = "keypress";
    enumObj["KeyUp"] = "keyup";
    return enumObj;
})({}));

/** 鼠标事件类型 */
windowImmit("MouseEventType", (function (enumObj) {
    enumObj["MouseDown"] = "mousedown";
    enumObj["MouseUp"] = "mouseup";
    enumObj["MouseMove"] = "mousemove";
    enumObj["MouseClick"] = "click";
    enumObj["MouseDoubleClick"] = "doubleclick";
    enumObj["MouseRightClick"] = "rightclick";
    enumObj["RightMouseDown"] = "rightmousedown";
    enumObj["RightMouseUp"] = "rightmouseup";
    enumObj["MouseOver"] = "mouseover";
    enumObj["MouseOut"] = "mouseout";
    enumObj["MouseWheel"] = "mousewheel";
    enumObj["MouseDrag"] = "mousedrag";
    enumObj["MouseDragEnd"] = "mousedragend";
    return enumObj;
})({}));

const setEvent = function (name, list, func, once, args) {
    if (list.indexOf(func) >= 0) return;
    list.push(func);
    if (once) {
        func[name] ||= {};
        func[name].__once = once;
    }
    if (args) {
        func[name] ||= {};
        func[name].__args = args;
    }
}

windowImmit("ViewKeyEvent", function (name, key = -1, once = false, args = null) {
    return function (target, propertyKey, descriptor) {
        target.__viewKeyEventMap ||= {};
        target.__viewKeyEventMap[name] ||= {};
        target.__viewKeyEventMap[name][key] ||= [];

        const func = descriptor.value;
        const list = target.__viewKeyEventMap[name][key];
        setEvent(key, list, func, once, args);
    }
});

windowImmit("ViewMouseEvent", function (name, once, args) {
    return function (target, propertyKey, descriptor) {
        target.__viewMouseEventMap ||= {};
        target.__viewMouseEventMap[name] ||= [];

        const func = descriptor.value;
        const list = target.__viewMouseEventMap[name];
        setEvent(name, list, func, once, args);
    }
});

windowImmit("ViewEvent", function (name, once, args) {
    return function (target, propertyKey, descriptor) {
        target.__viewEventMap ||= {};
        target.__viewEventMap[name] ||= [];

        const func = descriptor.value;
        const list = target.__viewEventMap[name];
        setEvent(name, list, func, once, args);
    }
});

windowImmit("InterestNotify", function (eventName, once, args) {
    return function (target, propertyKey, descriptor) {
        target.__notifyMap ||= {};
        target.__notifyMap[eventName] ||= [];

        const func = descriptor.value;
        const list = target.__notifyMap[eventName];
        setEvent(eventName, list, func, once, args);
    };
});

windowImmit("InterestMessage", function (msgId, once, args) {
    return function (target, propertyKey, descriptor) {
        target.__messageMap ||= {};
        target.__messageMap[msgId] ||= [];

        const func = descriptor.value;
        const list = target.__messageMap[msgId];
        setEvent(msgId, list, func, once, args);
    };
});