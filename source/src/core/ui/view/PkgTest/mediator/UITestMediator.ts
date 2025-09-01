import { MathUtil } from "../../../../common/math/MathUtil";
import { GameUtil } from "../../../../common/utils/GameUtil";
import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import LabelItem from "../../../ui/PkgTest/LabelItem";
import { UITestView } from "../view/UITestView";


class CenterList<T = fgui.GObject> {
    private;
    owner: fgui.GComponent;
    itemRenderer: Laya.Handler | ((index: number, item: T) => void);
    itemProvider: Laya.Handler | ((index: number) => T);
    private _virtualItems: any[] = [];
    get numItems() { return this._virtualItems.length; }
    set numItems(v) {
        let a: fgui.GList;
        a.itemProvider;
    }
    constructor(owner: fgui.GComponent) {
        this.owner = owner;
    }

    // private getItemFromPool(): T {
    //     const item = Laya.Pool.getItemByCreateFun()
    // }
}

export interface UITestData {

}

const ItemWidth = 300;
const ItemHeight = 600;
const ItemPosMin = 0;
const ItemPosMax = 1080;
const ItemCenterX = (ItemPosMin + ItemPosMax) / 2;
const ItemCenterY = 1920 / 2 + 500;
const ItemScaleMin = 0.00;
const ItemMoveLerp = 0.2;
const ItemAutoLerp = 0.2;
const GetItemPos = (lastX: number, index: number) => {
    const lastRate = Math.abs(lastX - ItemCenterX) / (ItemPosMax - ItemCenterX);
    const lastScale = 1 - lastRate * (1 - ItemScaleMin);

    return lastScale * ItemWidth / 2;
};
class TestItem {
    me: LabelItem;
    id: number;
    targetX: number;
    constructor(me: LabelItem) {
        this.me = me;
        me.setSize(ItemWidth, ItemHeight);
        this.setX(-1);
    }

    setId(id: number) {
        this.id = id;
        this.me.title = id.toString();
        this.me.graph_bg.fillColor = GameUtil.randomColor();
        return this;
    }

    setOrder(order: number) {
        this.me.sortingOrder = order;
        return this;
    }

    setClick(caller: any, func: Function) {
        this.me.onClick(caller, func, [this]);
        return this;
    }

    update() {
        const { me, targetX } = this;
        if (me.x == targetX) return true;
        const x = Math.abs(me.x - targetX) <= 1 ? targetX : MathUtil.lerp(me.x, targetX, ItemAutoLerp);
        return !this.setX(x);
    }

    setTarget(targetX: number, anim: boolean = true) {
        this.targetX = Math.round(targetX);
        !anim && this.setX(this.targetX);
    }

    private setX(x: number) {
        if (this.me.x == x) return false;
        this.me.x = x;
        const rate = Math.abs(x - ItemCenterX) / (ItemPosMax - ItemCenterX);
        const scale = 1 - rate * (1 - ItemScaleMin);
        this.me.setScale(scale, scale);
        this.me.graph_mask.alpha = rate * 0.9;
        return true;
    }
}
export class UITestMediator extends MediatorBase<UITestView, UITestData> {
    private _items: TestItem[];
    private _mouseDown: boolean = false;
    private _lastMouseX: number = 0;
    private _moveDelta: number = 0;

    private _choosedIndex: number;
    private get choosedIndex() { return this._choosedIndex; }
    private set choosedIndex(value) {
        if (value == this._choosedIndex) return;
        this._choosedIndex = value;
        this.view.txt_choosed.text = value.toString();
    }
    override onAwake() {
        this._items = new Array(200).fill(0).map(v => new TestItem(this.view.addChild(LabelItem.createInstance())).setClick(this, this.onItemClick));
        this._items.forEach(v => v.me.y = ItemCenterY);
    }

    override onEnable() {
        this._items.forEach((v, i) => v.setId(i));
        this._moveDelta = 0;
        this.choosedIndex = MathUtil.randomInt(0, this._items.length - 1);
        this.updateItem(false);
    }

    override onUpdate() {
        if (!this._mouseDown)
            this.updateItem(true);
        if (this._moveDelta != 0) {
            this._moveDelta = MathUtil.lerp(this._moveDelta, 0, ItemMoveLerp);
            if (Math.abs(this._moveDelta) < 1)
                this._moveDelta = 0;
        }
    }

    private refreshItemTarget(centerX: number, anim: boolean = true) {
        const { _items, choosedIndex } = this;
        centerX = choosedIndex == 0 ? Math.min(centerX, ItemCenterX) : (choosedIndex == _items.length - 1 ? Math.max(centerX, ItemCenterX) : centerX);
        const choosedItemX = MathUtil.clamp(centerX, ItemPosMin, ItemPosMax);
        _items[choosedIndex].setTarget(choosedItemX, anim);
        let lastX = choosedItemX, i: number, index = 0;
        for (i = choosedIndex - 1; i >= 0; i--) {
            lastX = MathUtil.clamp(lastX - GetItemPos(lastX, index++), ItemPosMin, ItemPosMax);
            _items[i].setTarget(lastX, anim);
        }
        index = 0;
        lastX = choosedItemX;
        for (i = choosedIndex + 1; i < _items.length; i++) {
            lastX = MathUtil.clamp(lastX + GetItemPos(lastX, index++), ItemPosMin, ItemPosMax);
            _items[i].setTarget(lastX, anim);
        }
    }

    private updateItem(anim: boolean) {
        const items = this._items;
        const isMoving = this._mouseDown || this._moveDelta != 0;
        if (isMoving) {
            this.refreshItemTarget(items[this.choosedIndex].me.x + this._moveDelta, anim);
        } else {
            this.refreshItemTarget(ItemCenterX, anim);
        }
        let allComplete = true;
        let nearestItemIndex = 0, distance = Number.MAX_SAFE_INTEGER;
        for (let i = items.length - 1; i >= 0; i--) {
            allComplete = items[i].update() && allComplete;
            const dis = Math.abs(items[i].me.x - ItemCenterX);
            if (dis < distance) {
                distance = dis;
                nearestItemIndex = i;
            }
        }
        if (!anim || !allComplete) {
            if (isMoving)
                this.choosedIndex = nearestItemIndex;
            const choosedIndex = this.choosedIndex;
            let order = items.length;
            items[choosedIndex].setOrder(order--);
            for (let i = choosedIndex - 1; i >= 0; i--) {
                items[i].setOrder(order--);
            }
            for (let i = choosedIndex + 1; i < items.length; i++) {
                items[i].setOrder(order--);
            }
        }
    }

    private onItemClick(item: TestItem) {
        const index = this._items.findIndex(v => v.id == item.id);
        this.choosedIndex = index;
        this._moveDelta = 0;
    }

    @ViewMouseEvent(MouseEventType.MouseDown)
    private mouseDown() {
        this._mouseDown = true;
        this._moveDelta = 0;
        this._lastMouseX = Laya.stage.mouseX;
    }

    @ViewMouseEvent(MouseEventType.MouseMove)
    private mouseMove() {
        if (!this._mouseDown) return;
        const moveDelta = Laya.stage.mouseX - this._lastMouseX;
        const oldDelta = this._moveDelta;
        this._moveDelta = MathUtil.clamp(moveDelta, -ItemWidth, ItemWidth);
        this.updateItem(false);
        this._moveDelta = MathUtil.clamp(oldDelta + moveDelta, -ItemWidth, ItemWidth);
        this._lastMouseX = Laya.stage.mouseX;
    }

    @ViewMouseEvent(MouseEventType.MouseUp)
    @ViewMouseEvent(MouseEventType.MouseOut)
    private mouseUp() {
        if (!this._mouseDown) return;
        this._mouseDown = false;
    }

    @ViewMouseEvent(MouseEventType.MouseWheel)
    private mouseWheel(e: Laya.Event) {
        if (this._mouseDown) return;
        this._moveDelta = MathUtil.clamp(this._moveDelta + -MathUtil.symbol(e.delta) * ItemWidth / 2.8, -ItemWidth, ItemWidth);
    }

    @ViewKeyEvent(KeyEventType.KeyUp, Laya.Keyboard.ESCAPE)
    private close() {
        this.closeSelf();
    }
}