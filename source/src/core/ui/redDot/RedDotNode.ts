export class RedDotNode implements IRedDotNode {
	private static _gid: number = 0;
	private _id = ++RedDotNode._gid;
	private _enable = false;
	private _nameList: string[];
	private _parent: RedDotNode;
	private _children: RedDotNode[] = [];
	private _triggers: ERDTriggerType[];
	private _rdCount = 0;
	private _triggeredMap = new Map<ERDTriggerType, number>();
	/** 红点组件 */
	private _comp: fgui.GComponent;

	get id() { return this._id; }

	get enable() { return this._enable && (!this._parent || this._parent.enable); }
	set enable(value: boolean) {
		if (value == this._enable) return;
		this._enable = value;
		this.calculateCountLater();
	}

	get parent() { return this._parent; }
	set parent(v) { v ? v.addChild(this) : this.removeSelf(); }

	get children() { return this._children; }

	private get hasTrigger() { return this._triggers && this._triggers.length > 0; }

	get triggers() { return this._triggers; }
	set triggers(value) {
		$redDotMgr.triggerListener.offAllCaller(this);
		this._triggeredMap.clear();

		this._triggers = value;
		if (this.hasTrigger && value)
			for (const v of value) {
				this._triggeredMap.set(v, 0);
				$redDotMgr.triggerListener.on(v, this, this.onTrigger);
			}
		this.trigger();
	}

	get comp() {
		if (this._comp && this._comp.isDisposed) this._comp = null;
		if (this._comp) return this._comp;

		const nameList = this._nameList;
		if (nameList && nameList.length) {
			let target: fgui.GComponent = fgui.GRoot.inst;
			for (const name of nameList) {
				target = <fgui.GComponent>target.getChild(name);
				if (!target) break;
			}

			if (target instanceof fgui.GComponent) {
				this._comp = <fgui.GComponent>target.getChild("redDot");
			}
		}
		return this._comp;
	}
	set comp(value: fgui.GComponent) {
		if (this._comp == value) return;
		this._comp = value;
		this.refresh();
	}

	private constructor() { }

	static create(parent?: IRedDotNode, path: string = "", triggers?: ERDTriggerType[]) {
		const data = Laya.Pool.createByClass(RedDotNode as any) as RedDotNode;
		data._enable = true;

		data._nameList = path ? path.split(".") : null;
		data.parent = parent as any;
		data.triggers = triggers;
		return data as IRedDotNode;
	}

	refresh() {
		this.comp && (this.comp.visible = this._rdCount > 0 && this.enable);
	}

	/** 触发当前节点红点检测事件 */
	trigger() {
		if (this.hasTrigger) {
			for (const v of this.triggers) {
				$redDotMgr.checkListener.event(v);
			}
		} else {
			this.calculateCountLater();
		}
	}

	addChild(child: RedDotNode) {
		if (!child || child === this || child._parent === this) return;

		child.removeSelf();
		child._parent = this;
		this._children.push(child);
		child.calculateCountLater();
	}

	/**
	 * 获取子节点
	 * @param id 子节点id
	 * @returns
	 */
	getChild(id: number) {
		return this._children.find(v => v.id == id);
	}

	/**
	 * 移除子节点
	 * @param id 子节点id
	 */
	removeChild(id: number) {
		const { _children } = this;
		const index = _children.findIndex(v => v.id == id);
		const child = _children[index];
		if (child) {
			child._parent = null;
			_children.splice(index, 1);
			this.calculateCountLater();
		}
		return child;
	}

	removeSelf() {
		this._parent && this._parent.removeChild(this.id);
	}

	recover() {
		this.removeSelf();
		$redDotMgr.triggerListener.offAllCaller(this);
		Laya.timer.clearAll(this);

		this._rdCount = 0;
		this._enable = false;
		this._parent = null;
		this._triggers = null;
		this._nameList = null;
		this._children.length = 0;
		this._triggeredMap.clear();
		this._comp = null;

		Laya.Pool.recoverByClass(this);
	}

	/**
	 * 红点事件触发回调
	 * @param type 事件类型
	 * @param triggered 是否检测出了红点
	 */
	private onTrigger(type: ERDTriggerType, triggered: boolean | number) {
		if (!this.hasTrigger) return;
		if (this.triggers.indexOf(type) >= 0) {
			const count = typeof triggered === "boolean" ? +!!triggered : triggered;
			this._triggeredMap.set(type, count);
			this.calculateCountLater();
		}
	}

	private calculateCountLater() {
		Laya.timer.callLater(this, this.calculateRD);
	}

	private calculateRD() {
		const { _triggeredMap, _children } = this;
		let count = 0;
		_triggeredMap.forEach(v => count += v);

		for (let i = 0; i < _children.length; i++) {
			count += Math.max(_children[i]._rdCount, 0)
		}

		if (count != this._rdCount) {
			this._rdCount = count;
			this._parent && this._parent.calculateCountLater();
		}

		this.refresh();
	}
}

