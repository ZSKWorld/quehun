import { Bezier } from "../../../../../common/utils/Bezier";
import UITestBezier from "../../../../ui/PkgTest/UITestBezier";

export const enum EUITestBezierMsg {

}

const PointRadius = 10;
const MinX = 110, MaxX = 1200 + 110;
const MinY = 110, MaxY = 860 + 110;

class BezierPoint extends fgui.GObject {
	private _graphics: Laya.Graphics;
	constructor() {
		super();
		this.setSize(PointRadius * 2, PointRadius * 2);
		this.setPivot(0.5, 0.5, true);
		this._graphics = this.displayObject.graphics;
		this.draggable = true;
		this.dragBounds = new Laya.Rectangle(MinX + PointRadius, MinY + PointRadius, MaxX - MinX, MaxY - MinY);
	}

	draw(color: EColorString, index: number | string) {
		this._graphics.clear();
		this._graphics.drawCircle(PointRadius, PointRadius, PointRadius, color, null, 0);
		this._graphics.fillText(index.toString(), PointRadius, 0, "20px SimHei", EColorString._000000, "center");
	}
}

export class UITestBezierView extends UITestBezier {
	private _startPoint: BezierPoint;
	private _endPoint: BezierPoint;
	private _controlPoints: BezierPoint[] = [];
	private _pointsPool: BezierPoint[] = [];

	override onCreate() {
		const { btn_close, btn_add, btn_remove, graph_canvas } = this;
		btn_close.onClick(this, this.closeSelf);
		btn_add.onClick(this, this.changePoints, [1]);
		btn_remove.onClick(this, this.changePoints, [-1]);

		this._startPoint = this.getPoints(EColorString._ff0000, "");
		this._endPoint = this.getPoints(EColorString._0000ff, "");
	}

	override onEnable() {
		this._startPoint.setXY(MinX, MinY);
		this._endPoint.setXY(MaxX, MaxY);
		this.drawCanvas();
	}

	override onDisable() {
		this._controlPoints.forEach(point => this.recoverPoints(point));
		this._controlPoints.length = 0;
	}

	private changePoints(count: number) {
		if (count > 0) {
			const t = this._controlPoints.length;
			for (let i = 0; i < count; i++) {
				const point = this.getPoints(EColorString._00ff00, t + i + 1);
				this._controlPoints.push(point);
			}
		} else if (count < 0) {
			count = -count;
			for (let i = 0; i < count; i++) {
				const point = this._controlPoints.pop();
				this.recoverPoints(point);
			}
		}
		this.drawCanvas();
	}

	private getPoints(color: EColorString, txt: number | string) {
		const point = this._pointsPool.pop() || new BezierPoint();
		point.draw(color, txt);
		point.setXY(Laya.MathUtil.lerp(MinX, MaxX, Math.random()), Laya.MathUtil.lerp(MinY, MaxY, Math.random()));
		point.on(fgui.Events.DRAG_MOVE, this, this.onPointDragMove);
		this.addChild(point);
		return point;
	}

	private recoverPoints(point: BezierPoint) {
		if (!point) return;
		point.removeFromParent();
		point.off(fgui.Events.DRAG_MOVE, this, this.onPointDragMove);
		this._pointsPool.push(point);
	}

	private onPointDragMove() {
		Laya.timer.callLater(this, this.drawCanvas);
	}

	private drawCanvas() {
		const { graph_canvas, _startPoint, _endPoint, _controlPoints } = this;
		const graphics = graph_canvas.displayObject.graphics;
		graphics.clear();
		graphics.drawRect(0, 0, graph_canvas.width, graph_canvas.height, EColorString._ffffff, null, 0);

		const points = Bezier.nBezierPoints2D([_startPoint, ..._controlPoints, _endPoint].map(p => ({ x: p.x, y: p.y })), 200).map(p => [p.x - MinX, p.y - MinY]);
		graphics.drawLines(0, 0, points.flat(), EColorString._00ff00, 1);
		// points.forEach(v => {
		// 	graphics.drawCircle(v[0], v[1], 3, EColorString._00ff00, null, 0);
		// });

	}
}
