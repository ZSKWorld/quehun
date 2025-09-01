
type FuncCfg = { __once: boolean, __done: boolean, __args: any[]; };
type CfgFunction = Function & { [key: string]: FuncCfg; };
type DIMediator = IMediator & {
	__viewKeyEventMap?: { [key in KeyEventType]: KeyMap<CfgFunction[]> };
	__viewMouseEventMap?: { [key in MouseEventType]: CfgFunction[] },
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
			__viewKeyEventMap.keydown && Laya.stage.on(KeyEventType.KeyDown, mediator, func);
			__viewKeyEventMap.keypress && Laya.stage.on(KeyEventType.KeyPress, mediator, func);
			__viewKeyEventMap.keyup && Laya.stage.on(KeyEventType.KeyUp, mediator, func);
		}
		if (__viewMouseEventMap) {
			const mouseFunc = this.doMouseEvent;
			const owner = mediator.owner;
			__viewMouseEventMap.mousedown && owner.on(MouseEventType.MouseDown, mediator, mouseFunc);
			__viewMouseEventMap.mouseup && owner.on(MouseEventType.MouseUp, mediator, mouseFunc);
			__viewMouseEventMap.mousemove && owner.on(MouseEventType.MouseMove, mediator, mouseFunc);
			__viewMouseEventMap.click && owner.on(MouseEventType.MouseClick, mediator, mouseFunc);
			__viewMouseEventMap.doubleclick && owner.on(MouseEventType.MouseDoubleClick, mediator, mouseFunc);
			__viewMouseEventMap.rightclick && owner.on(MouseEventType.MouseRightClick, mediator, mouseFunc);
			__viewMouseEventMap.rightmousedown && owner.on(MouseEventType.RightMouseDown, mediator, mouseFunc);
			__viewMouseEventMap.rightmouseup && owner.on(MouseEventType.RightMouseUp, mediator, mouseFunc);
			__viewMouseEventMap.mouseover && owner.on(MouseEventType.MouseOver, mediator, mouseFunc);
			__viewMouseEventMap.mouseout && owner.on(MouseEventType.MouseOut, mediator, mouseFunc);
			__viewMouseEventMap.mousewheel && owner.on(MouseEventType.MouseWheel, mediator, mouseFunc);
			__viewMouseEventMap.mousedrag && owner.on(MouseEventType.MouseDrag, mediator, mouseFunc);
			__viewMouseEventMap.mousedragend && owner.on(MouseEventType.MouseDragEnd, mediator, mouseFunc);
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
			vkem.keydown && Laya.stage.off(KeyEventType.KeyDown, mediator, func);
			vkem.keypress && Laya.stage.off(KeyEventType.KeyPress, mediator, func);
			vkem.keyup && Laya.stage.off(KeyEventType.KeyUp, mediator, func);
		}
		if (vmem) {
			const mouseFunc = this.doMouseEvent;
			const owner = mediator.owner;
			vmem.mousedown && owner.off(MouseEventType.MouseDown, mediator, mouseFunc);
			vmem.mouseup && owner.off(MouseEventType.MouseUp, mediator, mouseFunc);
			vmem.mousemove && owner.off(MouseEventType.MouseMove, mediator, mouseFunc);
			vmem.click && owner.off(MouseEventType.MouseClick, mediator, mouseFunc);
			vmem.doubleclick && owner.off(MouseEventType.MouseDoubleClick, mediator, mouseFunc);
			vmem.rightclick && owner.off(MouseEventType.MouseRightClick, mediator, mouseFunc);
			vmem.rightmousedown && owner.off(MouseEventType.RightMouseDown, mediator, mouseFunc);
			vmem.rightmouseup && owner.off(MouseEventType.RightMouseUp, mediator, mouseFunc);
			vmem.mouseover && owner.off(MouseEventType.MouseOver, mediator, mouseFunc);
			vmem.mouseout && owner.off(MouseEventType.MouseOut, mediator, mouseFunc);
			vmem.mousewheel && owner.off(MouseEventType.MouseWheel, mediator, mouseFunc);
			vmem.mousedrag && owner.off(MouseEventType.MouseDrag, mediator, mouseFunc);
			vmem.mousedragend && owner.off(MouseEventType.MouseDragEnd, mediator, mouseFunc);
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
		if (!uiMgr.isTopView(caller)) return;
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
		if (!uiMgr.isTopView(caller)) return;
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