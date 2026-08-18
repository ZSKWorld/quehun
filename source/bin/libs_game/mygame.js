//注入全局变量
function $windowImmit(name, obj) { window[name] = obj; }

function Singleton(constructor) {
	let inst;
	class cls extends constructor {
		constructor(...args) {
			if (inst) {
				Logger.error(constructor.name + " 单例类只能实例化一次");
				return inst;
			}
			super(...args);
			inst = this;
		}
	};
	Object.defineProperty(cls, 'Inst', {
		get: function () {
			return inst || (inst = new cls());
		},
		configurable: false,
	});
	return cls;
}

function setEvent(name, list, func, once, args) {
	if (list.indexOf(func) >= 0) return;
	list.push(func);
	if (once) {
		func[name] = func[name] || {};
		func[name].__once = once;
	}
	if (args) {
		func[name] = func[name] || {};
		func[name].__args = args;
	}
};

function RDTriggerEvent(eventName) {
	return function (target, propertyKey, descriptor) {
		const eventMap = target._triggerEventMap = target._triggerEventMap || {};
		const func = descriptor.value;
		if (eventMap[eventName])
			eventMap[eventName].push(func);
		else
			eventMap[eventName] = [func];
	};
}

function InjectViewKeyEvent(name, key = -1, once = false, args = null) {
	return function (target, propertyKey, descriptor) {
		target.__viewKeyEventMap = target.__viewKeyEventMap || {};
		target.__viewKeyEventMap[name] = target.__viewKeyEventMap[name] || {};
		target.__viewKeyEventMap[name][key] = target.__viewKeyEventMap[name][key] || [];

		const func = descriptor.value;
		const list = target.__viewKeyEventMap[name][key];
		setEvent(key, list, func, once, args);
	};
};

function InjectViewMouseEvent(name, once, args) {
	return function (target, propertyKey, descriptor) {
		target.__viewMouseEventMap = target.__viewMouseEventMap || {};
		target.__viewMouseEventMap[name] = target.__viewMouseEventMap[name] || [];

		const func = descriptor.value;
		const list = target.__viewMouseEventMap[name];
		setEvent(name, list, func, once, args);
	};
};

function InjectViewEvent(name, once, args) {
	return function (target, propertyKey, descriptor) {
		target.__viewEventMap = target.__viewEventMap || {};
		target.__viewEventMap[name] = target.__viewEventMap[name] || [];

		const func = descriptor.value;
		const list = target.__viewEventMap[name];
		setEvent(name, list, func, once, args);
	};
};

function InjectGlobalEvent(eventName, once, args) {
	return function (target, propertyKey, descriptor) {
		target.__globalEventMap = target.__globalEventMap || {};
		target.__globalEventMap[eventName] = target.__globalEventMap[eventName] || [];

		const func = descriptor.value;
		const list = target.__globalEventMap[eventName];
		setEvent(eventName, list, func, once, args);
	};
};

function InjectNetEvent(msgName, once, args) {
	return function (target, propertyKey, descriptor) {
		target.__netEventMap = target.__netEventMap || {};
		target.__netEventMap[msgName] = target.__netEventMap[msgName] || [];

		const func = descriptor.value;
		const list = target.__netEventMap[msgName];
		setEvent(msgName, list, func, once, args);
	};
};

function InjectUserEvent(eventName, once, args) {
	return function (target, propertyKey, descriptor) {
		target.__userEventMap = target.__userEventMap || {};
		target.__userEventMap[eventName] = target.__userEventMap[eventName] || [];

		const func = descriptor.value;
		const list = target.__userEventMap[eventName];
		setEvent(eventName, list, func, once, args);
	};
};