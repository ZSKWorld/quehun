
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

	/**
	 * 注册设备交互事件
	 * @param mediator 目标控制器
	 * @returns
	 */
	static registerDeviceEvent(mediator: DIMediator) {
		if (!mediator) return;
		const { __viewKeyEventMap, __viewMouseEventMap } = mediator;
		if (__viewKeyEventMap) {
			const func = this.doKeyEvent;
			__viewKeyEventMap.keydown && Laya.stage.on(EKeyEventType.KeyDown, mediator, func);
			__viewKeyEventMap.keypress && Laya.stage.on(EKeyEventType.KeyPress, mediator, func);
			__viewKeyEventMap.keyup && Laya.stage.on(EKeyEventType.KeyUp, mediator, func);
		}
		if (__viewMouseEventMap) {
			const mouseFunc = this.doMouseEvent;
			const owner = mediator.owner;
			__viewMouseEventMap.mousedown && owner.on(EMouseEventType.MouseDown, mediator, mouseFunc);
			__viewMouseEventMap.mouseup && owner.on(EMouseEventType.MouseUp, mediator, mouseFunc);
			__viewMouseEventMap.mousemove && owner.on(EMouseEventType.MouseMove, mediator, mouseFunc);
			__viewMouseEventMap.click && owner.on(EMouseEventType.MouseClick, mediator, mouseFunc);
			__viewMouseEventMap.doubleclick && owner.on(EMouseEventType.MouseDoubleClick, mediator, mouseFunc);
			__viewMouseEventMap.rightclick && owner.on(EMouseEventType.MouseRightClick, mediator, mouseFunc);
			__viewMouseEventMap.rightmousedown && owner.on(EMouseEventType.RightMouseDown, mediator, mouseFunc);
			__viewMouseEventMap.rightmouseup && owner.on(EMouseEventType.RightMouseUp, mediator, mouseFunc);
			__viewMouseEventMap.mouseover && owner.on(EMouseEventType.MouseOver, mediator, mouseFunc);
			__viewMouseEventMap.mouseout && owner.on(EMouseEventType.MouseOut, mediator, mouseFunc);
			__viewMouseEventMap.mousewheel && owner.on(EMouseEventType.MouseWheel, mediator, mouseFunc);
			__viewMouseEventMap.mousedrag && owner.on(EMouseEventType.MouseDrag, mediator, mouseFunc);
			__viewMouseEventMap.mousedragend && owner.on(EMouseEventType.MouseDragEnd, mediator, mouseFunc);
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
			const func = this.doKeyEvent;
			vkem.keydown && Laya.stage.off(EKeyEventType.KeyDown, mediator, func);
			vkem.keypress && Laya.stage.off(EKeyEventType.KeyPress, mediator, func);
			vkem.keyup && Laya.stage.off(EKeyEventType.KeyUp, mediator, func);
		}
		if (vmem) {
			const mouseFunc = this.doMouseEvent;
			const owner = mediator.owner;
			vmem.mousedown && owner.off(EMouseEventType.MouseDown, mediator, mouseFunc);
			vmem.mouseup && owner.off(EMouseEventType.MouseUp, mediator, mouseFunc);
			vmem.mousemove && owner.off(EMouseEventType.MouseMove, mediator, mouseFunc);
			vmem.click && owner.off(EMouseEventType.MouseClick, mediator, mouseFunc);
			vmem.doubleclick && owner.off(EMouseEventType.MouseDoubleClick, mediator, mouseFunc);
			vmem.rightclick && owner.off(EMouseEventType.MouseRightClick, mediator, mouseFunc);
			vmem.rightmousedown && owner.off(EMouseEventType.RightMouseDown, mediator, mouseFunc);
			vmem.rightmouseup && owner.off(EMouseEventType.RightMouseUp, mediator, mouseFunc);
			vmem.mouseover && owner.off(EMouseEventType.MouseOver, mediator, mouseFunc);
			vmem.mouseout && owner.off(EMouseEventType.MouseOut, mediator, mouseFunc);
			vmem.mousewheel && owner.off(EMouseEventType.MouseWheel, mediator, mouseFunc);
			vmem.mousedrag && owner.off(EMouseEventType.MouseDrag, mediator, mouseFunc);
			vmem.mousedragend && owner.off(EMouseEventType.MouseDragEnd, mediator, mouseFunc);
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
					const list = eventList[eventKey];
					list.forEach(v => Object.keys(v).forEach(v1 => v[v1].__done != null && (v[v1].__done = false)));
				}
			}
		}
		if (vmem) {
			for (const key in vmem) {
				const list: CfgFunction[] = vmem[key];
				list.forEach(v => Object.keys(v).forEach(v1 => v[v1].__done != null && (v[v1].__done = false)));
			}
		}
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
		const list = eventList[e.keyCode] || eventList[-1];
		if (!list) return;
		for (let i = 0, len = list.length; i < len; i++) {
			const func = list[i];
			const cfg = func[e.keyCode];
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
		if (!$uiMgr.isTopView(caller)) return;
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