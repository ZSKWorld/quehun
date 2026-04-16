
type FuncCfg = { __once: boolean, __done: boolean, __args: any[]; };
type CfgFunction = Function & { [key: string]: FuncCfg; };
type DIMediator = IMediator & {
	__viewKeyEventMap?: { [key in EKeyEventType]: KeyMap<CfgFunction[]> };
	__viewMouseEventMap?: { [key in EMouseEventType]: CfgFunction[] },
};

/**
 * 中介类设备（鼠标、键盘）交互事件扩展 MediatorDIExtend => MediatorDeviceInteractionExtend的缩写
  */
export class MediatorDIExtend {
	private static readonly KEY_EVENT_PAIRS: EKeyEventType[] = [
		EKeyEventType.KeyDown,
		EKeyEventType.KeyPress,
		EKeyEventType.KeyUp,
	];

	private static readonly MOUSE_EVENT_PAIRS: EMouseEventType[] = [
		EMouseEventType.MouseDown,
		EMouseEventType.MouseUp,
		EMouseEventType.MouseMove,
		EMouseEventType.MouseClick,
		EMouseEventType.MouseDoubleClick,
		EMouseEventType.MouseRightClick,
		EMouseEventType.RightMouseDown,
		EMouseEventType.RightMouseUp,
		EMouseEventType.MouseOver,
		EMouseEventType.MouseOut,
		EMouseEventType.MouseWheel,
		EMouseEventType.MouseDrag,
		EMouseEventType.MouseDragEnd,
	];

	/**
	 * 注册设备交互事件
	 * @param mediator 目标控制器
	 * @returns
	 */
	static registerDeviceEvent(mediator: DIMediator) {
		if (!mediator) return;
		const { __viewKeyEventMap: vkem, __viewMouseEventMap: vmem } = mediator;
		if (vkem) {
			this.bindKeyEvents(mediator, true);
		}
		if (vmem) {
			this.bindMouseEvents(mediator, true);
		}

		this.resetOnceEvent(mediator);
	}

	/**
	 * 关闭设备交互事件
	 * @param mediator 目标控制器
	 * @returns
	 */
	static offDeviceEvent(mediator: DIMediator) {
		if (!mediator) return;
		const { __viewKeyEventMap: vkem, __viewMouseEventMap: vmem } = mediator;
		if (vkem) {
			this.bindKeyEvents(mediator, false);
		}
		if (vmem) {
			this.bindMouseEvents(mediator, false);
		}
	}

	/**重置once事件标志 */
	private static resetOnceEvent(mediator: DIMediator) {
		if (!mediator) return;
		//重置事件once标志
		const { __viewKeyEventMap: vkem, __viewMouseEventMap: vmem } = mediator;
		if (vkem) {
			for (const key in vkem) {
				const eventList: KeyMap<CfgFunction[]> = vkem[key];
				for (const eventKey in eventList) {
					this.resetFuncDoneFlag(eventList[eventKey]);
				}
			}
		}
		if (vmem) {
			for (const key in vmem) {
				this.resetFuncDoneFlag(vmem[key]);
			}
		}
	}

	private static bindKeyEvents(mediator: DIMediator, enable: boolean) {
		const vkem = mediator.__viewKeyEventMap;
		if (!vkem) return;
		const func = this.doKeyEvent;
		for (let i = 0; i < this.KEY_EVENT_PAIRS.length; i++) {
			const eventType = this.KEY_EVENT_PAIRS[i];
			if (!vkem[eventType]) continue;
			if (enable) Laya.stage.on(eventType, mediator, func);
			else Laya.stage.off(eventType, mediator, func);
		}
	}

	private static bindMouseEvents(mediator: DIMediator, enable: boolean) {
		const vmem = mediator.__viewMouseEventMap;
		if (!vmem) return;
		const mouseFunc = this.doMouseEvent;
		const owner = mediator.owner;
		for (let i = 0; i < this.MOUSE_EVENT_PAIRS.length; i++) {
			const eventType = this.MOUSE_EVENT_PAIRS[i];
			if (!vmem[eventType]) continue;
			if (enable) owner.on(eventType, mediator, mouseFunc);
			else owner.off(eventType, mediator, mouseFunc);
		}
	}

	private static resetFuncDoneFlag(list: CfgFunction[]) {
		if (!list) return;
		list.forEach(v => Object.keys(v).forEach(v1 => v[v1].__done != null && (v[v1].__done = false)));
	}

	/**处理键盘事件 */
	private static doKeyEvent(e: Laya.Event) {
		//这里的this是MediatorBase
		const caller = this as unknown as DIMediator;
		if (!$uiMgr.isTopView(caller)) return;
		const vkem = caller.__viewKeyEventMap;
		if (!vkem) return;
		const eventList: KeyMap<CfgFunction[]> = vkem[e.type];
		if (!eventList) return;
		const list = eventList[-1] || eventList[e.keyCode];
		if (!list) return;
		for (let i = 0, len = list.length; i < len; i++) {
			const func = list[i];
			const cfg = func[-1] || func[e.keyCode];
			const args = cfg && cfg.__args ? [...cfg.__args, e] : [e];
			if (cfg && cfg.__once) {
				if (!cfg.__done) {
					cfg.__done = true;
					func && func.call(this, ...args);
				}
			} else {
				func && func.call(this, ...args);
			}
		}
	}

	/**处理鼠标事件 */
	private static doMouseEvent(e: Laya.Event) {
		//这里的this是MediatorBase
		const caller = this as unknown as DIMediator;
		const vmem = caller.__viewMouseEventMap;
		if (!vmem) return;
		const list: CfgFunction[] = vmem[e.type];
		if (!list) return;
		for (let i = 0, len = list.length; i < len; i++) {
			const func = list[i];
			const cfg = func[e.type];
			const args = cfg && cfg.__args ? [...cfg.__args, e] : [e];
			if (cfg && cfg.__once) {
				if (!cfg.__done) {
					cfg.__done = true;
					func && func.call(this, ...args);
				}
			} else {
				func && func.call(this, ...args);
			}
		}
	}
}