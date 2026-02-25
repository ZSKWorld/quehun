//注入全局变量
const $windowImmit = function (name, obj) { window[name] = obj; }

//用于扩展类字段，在外部定义的字段在内部可读，扩展的字段或方法不能在构造期间调用
const ExtensionClass = function (cls) { return cls; }

function Singleton() {
	return class Singleton {
		constructor() { }
		static get Inst() {
			return this._inst || (this._inst = new this());
		}
	};
}

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

const ViewKeyEvent = function (name, key = -1, once = false, args = null) {
	return function (target, propertyKey, descriptor) {
		target.__viewKeyEventMap ||= {};
		target.__viewKeyEventMap[name] ||= {};
		target.__viewKeyEventMap[name][key] ||= [];

		const func = descriptor.value;
		const list = target.__viewKeyEventMap[name][key];
		setEvent(key, list, func, once, args);
	}
}

const ViewMouseEvent = function (name, once, args) {
	return function (target, propertyKey, descriptor) {
		target.__viewMouseEventMap ||= {};
		target.__viewMouseEventMap[name] ||= [];

		const func = descriptor.value;
		const list = target.__viewMouseEventMap[name];
		setEvent(name, list, func, once, args);
	}
}

const ViewEvent = function (name, once, args) {
	return function (target, propertyKey, descriptor) {
		target.__viewEventMap ||= {};
		target.__viewEventMap[name] ||= [];

		const func = descriptor.value;
		const list = target.__viewEventMap[name];
		setEvent(name, list, func, once, args);
	}
}

const InterestNotify = function (eventName, once, args) {
	return function (target, propertyKey, descriptor) {
		target.__notifyMap ||= {};
		target.__notifyMap[eventName] ||= [];

		const func = descriptor.value;
		const list = target.__notifyMap[eventName];
		setEvent(eventName, list, func, once, args);
	};
}

const InterestMessage = function (msgName, once, args) {
	return function (target, propertyKey, descriptor) {
		target.__messageMap ||= {};
		target.__messageMap[msgName] ||= [];

		const func = descriptor.value;
		const list = target.__messageMap[msgName];
		setEvent(msgName, list, func, once, args);
	};
}

const InterestUserEvent = function (eventName, once, args) {
	return function (target, propertyKey, descriptor) {
		target.__userEventMap ||= {};
		target.__userEventMap[eventName] ||= [];

		const func = descriptor.value;
		const list = target.__userEventMap[eventName];
		setEvent(eventName, list, func, once, args);
	};
}