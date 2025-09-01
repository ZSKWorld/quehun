import { MathUtil } from "../../../../common/math/MathUtil";
import { GameUtil } from "../../../../common/utils/GameUtil";
import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import LabelItem2 from "../../../ui/PkgTest/LabelItem2";
import { UITest2View } from "../view/UITest2View";

export interface UITest2Data {

}

const ItemW = 200, ItemH = 200, ItemSpace = 20;
const HalfItemW = ItemW / 2, HalfItemH = ItemH / 2, HalfItemSpace = ItemSpace / 2;
class TestItem extends LabelItem2 {
    itemId: number;
    static create() {
        return Laya.Pool.getItemByCreateFun("UITest2Mediator_TestItem", () => {
            return TestItem.createInstance() as TestItem;
        });
    }

    setId(itemId: number) {
        this.itemId = itemId;
        this.title = itemId.toString();
        this.graph_bg.fillColor = GameUtil.randomColor();
        return this;
    }

    setPos(x: number, y: number, ani: boolean) {
        Laya.Tween.killAll(this);
        if (this.x == x && this.y == y) return;
        if (!ani) {
            this.setXY(x, y);
        } else {
            const dis = Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2);
            Laya.Tween.create(this).to("x", x).to("y", y).duration(dis / 4);
        }
    }

    recover() {
        this.offAll(Laya.Event.MOUSE_DOWN);
        this.removeFromParent();
        Laya.Pool.recover("UITest2Mediator_TestItem", this);
    }
}

export class UITest2Mediator extends MediatorBase<UITest2View, UITest2Data> {
    private _items: TestItem[] = [];
    private _col: number = 5;
    private _holdItem: TestItem;
    private _dragIndex: number;
    private _dragItem: TestItem;
    private _tempPoint = new Laya.Point();

    override onAwake() {
        fgui.UIObjectFactory.setExtension(LabelItem2.url, TestItem);
    }

    override onEnable() {
        const count = 96;
        for (let i = 1; i <= count; i++) {
            const item = TestItem.create().setId(i);
            item.setSize(ItemW, ItemH);
            this.view.addChild(item);
            this._items.push(item);
        }
        this.refreshItemPos(false);
        Laya.timer.callLater(this, () => {
            this.view.graph_bg.setSize(this.view.scrollPane.contentWidth, this.view.scrollPane.contentHeight);
        });
    }

    override onUpdate() {
        if (!this._dragItem) return;
        const { view, _dragItem, _tempPoint } = this;
        const { mouseX, mouseY, width: stageW, height: stageH } = Laya.stage;
        _tempPoint.setTo(MathUtil.clamp(mouseX, HalfItemW, stageW - HalfItemW), MathUtil.clamp(mouseY, HalfItemH, stageH - HalfItemH));
        view._container.globalToLocal(_tempPoint);
        const x = MathUtil.clamp(_tempPoint.x, HalfItemW, view.scrollPane.contentWidth - HalfItemW);
        const y = MathUtil.clamp(_tempPoint.y, HalfItemH, view.scrollPane.contentHeight - HalfItemH);
        _dragItem.setPos(x, y, false);
        _tempPoint.setTo(x, y);
        view._container.localToGlobal(_tempPoint);
        if (_tempPoint.y <= ItemH) {
            view.scrollPane.posY -= ((ItemH - _tempPoint.y) / HalfItemH) * 50;
        }
        else if (_tempPoint.y >= stageH - ItemH) {
            view.scrollPane.posY += (_tempPoint.y - (stageH - ItemH)) / HalfItemH * 50;
        }
        else {
        }
        this.tryToReplaceIndex();
    }

    override onDisable() {
        this._items.forEach(v => v.recover());
        this._items.length = 0;
        this.releaseDragItem();
    }

    private refreshItemPos(ani: boolean) {
        this._items.forEach((v, i) => {
            if (v == this._dragItem) return;
            const row = Math.floor(i / this._col);
            const col = i % this._col;
            const x = HalfItemW + col * (ItemW + ItemSpace);
            const y = HalfItemH + row * (ItemH + ItemSpace);
            v.setPos(x, y, ani);
        });
    }

    override onMouseDown(e: Laya.Event) {
        this._holdItem = (e?.target as Laya.Sprite)?.$owner as TestItem;
        Laya.timer.once(100, this, this.checkDragItem);
    }

    override onMouseMove(e: Laya.Event) {
        if (this._holdItem) this.releaseDragItem();
    }

    override onMouseUp() {
        this.releaseDragItem();
    }

    private checkDragItem() {
        const dragItem = this._holdItem;
        this._holdItem = null;
        if (!dragItem || dragItem.isDisposed || !(dragItem instanceof TestItem)) return;
        dragItem.sortingOrder = 1;
        this._dragIndex = this._items.indexOf(dragItem);
        this._dragItem = dragItem;
        this.view.scrollPane.touchEffect = false;
    }

    private releaseDragItem() {
        Laya.timer.clear(this, this.checkDragItem);
        this._holdItem = null;
        const dragItem = this._dragItem;
        this._dragIndex = -1;
        this._dragItem = null;
        this.view.scrollPane.touchEffect = true;
        if (dragItem) {
            dragItem.sortingOrder = 0;
            this.refreshItemPos(true);
        }
    }

    private tryToReplaceIndex() {
        const { _col, _items, _dragIndex, _dragItem } = this;
        const row = _dragItem.y < (ItemH + HalfItemSpace) ? 0 : (1 + Math.floor((_dragItem.y - (ItemH + HalfItemSpace)) / (ItemH + ItemSpace)));
        const startIndex = row * _col;
        let offsetIndex = 0;
        let nearestItem: TestItem, nearestIndex: number, minDis = Number.MAX_SAFE_INTEGER;
        for (let i = startIndex + (_col - 1); i >= startIndex; i--) {
            if (!_items[i]) continue;
            const dis = Math.abs((HalfItemW + (i - startIndex) * (ItemW + ItemSpace)) - _dragItem.x);
            if (dis < minDis) {
                nearestIndex = i;
                nearestItem = _items[i];
                minDis = dis;
                offsetIndex = i - startIndex;
            }
        }
        if (!nearestItem) {
            if (_items[startIndex]) return;
            else {
                nearestIndex = _items.length - 1;
                nearestItem = _items[nearestIndex];
            }
        }
        if (nearestItem == _dragItem) return;
        let targetIndex = nearestIndex;
        if (_dragItem.x < nearestItem.x || (_dragItem.x == nearestItem.x && offsetIndex == 0)) {
            if (_dragIndex < nearestIndex) targetIndex = nearestIndex - 1;
        } else if (_dragItem.x > nearestItem.x || (_dragItem.x == nearestItem.x && offsetIndex == _col - 1)) {
            if (_dragIndex > nearestIndex) targetIndex = nearestIndex + 1;
        }
        if (targetIndex == _dragIndex) return;
        if (targetIndex < _dragIndex) {
            for (let i = _dragIndex; i > targetIndex; i--) {
                _items[i] = _items[i - 1];
            }
        } else {
            for (let i = _dragIndex; i < targetIndex; i++) {
                _items[i] = _items[i + 1];
            }
        }
        _items[targetIndex] = _dragItem;
        this._dragIndex = targetIndex;
        this.refreshItemPos(true);
    }

    @ViewKeyEvent(KeyEventType.KeyUp, Laya.Keyboard.ESCAPE)
    private close() {
        this.closeSelf();
    }

}