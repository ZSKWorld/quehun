import Vector3 = Laya.Vector3;

interface IPoint {
	x: number;
	y: number;
}

/** 匀速贝塞尔曲线，文档：https://www.freesion.com/article/2280255606/ */
export class Bezier {
	/**
	 * 获取 n 阶贝塞尔曲线在参数 t 处的点
	 * @param t 参数值，范围 [0, 1]
	 * @param controlPoints 控制点数组，长度为 n+1，每个点是一个坐标数组
	 * @returns 曲线上 t 时刻对应的点坐标（与输入点维度相同）
	 * @throws 当 t 超出范围或控制点列表为空时抛出错误
	 */
	static nBezierPoint2D(t: number, controlPoints: IPoint[]) {
		if (t < 0 || t > 1) {
			throw new Error('参数 t 必须在 [0, 1] 范围内');
		}
		if (controlPoints.length === 0) {
			throw new Error('至少需要一个控制点');
		}

		// 复制控制点，避免修改原数组
		let points = controlPoints;
		let n = points.length;

		// 逐层降阶，直到只剩一个点
		while (n > 1) {
			const newPoints: IPoint[] = [];
			for (let i = 0; i < n - 1; i++) {
				const p1 = points[i];
				const p2 = points[i + 1];
				// 线性插值： (1-t)*p1 + t*p2
				const interpolated = { x: (1 - t) * p1.x + t * p2.x, y: (1 - t) * p1.y + t * p2.y };
				newPoints.push(interpolated);
			}
			points = newPoints;
			n = points.length;
		}

		return points[0];
	}

	static nBezierPoints2D(controlPoints: IPoint[], pointNum: number) {
		const points: IPoint[] = [];
		for (let i = 0; i <= pointNum; i++) {
			points.push(this.nBezierPoint2D(i / pointNum, controlPoints));
		}
		return points;
	}

	/** 普通2d贝塞尔点 */
	static bezierPoint2D(start: IPoint, end: IPoint, control: IPoint, t: number, out?: IPoint) {
		const u = 1 - t;
		const tt = t * t;
		const uu = u * u;
		const ut2 = u * t * 2;

		const p = out || { x: 0, y: 0 };
		p.x = uu * start.x + ut2 * control.x + tt * end.x;
		p.y = uu * start.y + ut2 * control.y + tt * end.y;
		return p;
	}

	/**
	 * 普通2d贝塞尔点集合
	 * @param start {@link IPoint} 起始位置
	 * @param end {@link IPoint} 结束位置
	 * @param control {@link IPoint} 控制点位置
	 * @param pointNum 点数量
	 * @returns
	 */
	static bezierPoints2D(start: IPoint, end: IPoint, control: IPoint, pointNum: number) {
		const points: IPoint[] = [];
		for (let i = 0; i <= pointNum; i++) {
			points.push(this.bezierPoint2D(start, end, control, i / pointNum));
		}
		return points;
	}

	/** 匀速2d贝塞尔点 */
	static uniformBezierPoint2D(start: IPoint, end: IPoint, control: IPoint, t: number, out?: IPoint) {
		let ax = start.x - 2 * control.x + end.x;
		let ay = start.y - 2 * control.y + end.y;
		let bx = 2 * control.x - 2 * start.x;
		let by = 2 * control.y - 2 * start.y;

		let A = 4 * (ax * ax + ay * ay);
		let B = 4 * (ax * bx + ay * by);
		let C = bx * bx + by * by;

		//曲线总长度
		const total_length = this.getLength(A, B, C, 1);
		//按照线形增长,此时对应的曲线长度
		let l = t * total_length;
		//根据 L 函数的反函数，求得 l 对应的 t 值
		t = this.invertLength(A, B, C, t, l);
		let _1_t = (1 - t) * (1 - t), _2_1_t = 2 * (1 - t) * t, tt = t * t;
		//根据贝塞尔曲线函数，求得取得此时的x,y坐标
		let x = _1_t * start.x + _2_1_t * control.x + tt * end.x;
		let y = _1_t * start.y + _2_1_t * control.y + tt * end.y;
		const point = out || { x: 0, y: 0 };
		point.x = x;
		point.y = y;
		return point;
	}

	/**
	 * 匀速2d贝塞尔点集合
	 * @param start {@link IPoint} 起始位置
	 * @param end {@link IPoint} 结束位置
	 * @param control {@link IPoint} 控制点位置
	 * @param pointNum 点数量
	 * @returns
	 */
	static uniformBezierPoints2D(start: IPoint, end: IPoint, control: IPoint, pointNum: number) {
		let ax = start.x - 2 * control.x + end.x;
		let ay = start.y - 2 * control.y + end.y;
		let bx = 2 * control.x - 2 * start.x;
		let by = 2 * control.y - 2 * start.y;

		let A = 4 * (ax * ax + ay * ay);
		let B = 4 * (ax * bx + ay * by);
		let C = bx * bx + by * by;

		const points: IPoint[] = [];
		//曲线总长度
		const total_length = this.getLength(A, B, C, 1);
		for (let i = 0; i <= pointNum; i++) {
			let t = i / pointNum;
			//按照线形增长,此时对应的曲线长度
			let l = t * total_length;
			//根据 L 函数的反函数，求得 l 对应的 t 值
			t = this.invertLength(A, B, C, t, l);
			let _1_t = (1 - t) * (1 - t);
			let _2_1_t = 2 * (1 - t) * t;
			let tt = t * t;
			//根据贝塞尔曲线函数，求得取得此时的x,y坐标
			let x = _1_t * start.x + _2_1_t * control.x + tt * end.x;
			let y = _1_t * start.y + _2_1_t * control.y + tt * end.y;
			points.push({ x, y });
		}
		return points;
	}

	private static getLength(a: number, b: number, c: number, t: number) {
		let temp1 = Math.sqrt(c + t * (b + a * t));
		let temp2 = (2 * a * t * temp1 + b * (temp1 - Math.sqrt(c)));
		let temp3 = Math.log(b + 2 * Math.sqrt(a) * Math.sqrt(c));
		let temp4 = Math.log(b + 2 * a * t + 2 * Math.sqrt(a) * temp1);
		let temp5 = 2 * Math.sqrt(a) * temp2;
		let temp6 = (b * b - 4 * a * c) * (temp3 - temp4);
		return (temp5 + temp6) / (8 * Math.pow(a, 1.5));
	}

	private static invertLength(a: number, b: number, c: number, t: number, l: number) {
		let t1 = t, t2: number;
		do {
			t2 = t1 - (this.getLength(a, b, c, t1) - l) / this.getSpeed(a, b, c, t1);
			if (Math.abs(t1 - t2) < 0.000001) // 如果几乎不再变化，即收敛
				break;
			t1 = t2;
		} while (true);
		return t2;
	}

	/**速度函数 s(t_) = Sqrt[A*t*t+B*t+C] */
	private static getSpeed(a: number, b: number, c: number, t: number) {
		return Math.sqrt(a * t * t + b * t + c);
	}

	private static _tempV30 = new Vector3();
	private static _tempV31 = new Vector3();
	/** 二阶贝塞尔曲线 */
	static bezierPoint3D(startPos: Vector3, ctrlPos: Vector3, endPos: Vector3, t: number, out: Vector3) {
		const { _tempV30: tempV30 } = this;
		Vector3.subtract(ctrlPos, startPos, tempV30);
		Vector3.scale(tempV30, t, tempV30);
		Vector3.add(startPos, tempV30, tempV30);

		Vector3.subtract(endPos, ctrlPos, out);
		Vector3.scale(out, t, out);
		Vector3.add(ctrlPos, out, out);

		Vector3.subtract(out, tempV30, out);
		Vector3.scale(out, t, out);
		Vector3.add(tempV30, out, out);
		return out;
	}

	/** 三阶贝塞尔曲线 */
	static cubicBezierPoint3D(a: Vector3, b: Vector3, c: Vector3, d: Vector3, t: number, cc: Vector3) {
		const { _tempV30: aa, _tempV31: bb } = this;

		Vector3.subtract(b, a, aa);
		Vector3.scale(aa, t, aa);
		Vector3.add(a, aa, aa);

		Vector3.subtract(c, b, bb);
		Vector3.scale(bb, t, bb);
		Vector3.add(b, bb, bb);

		Vector3.subtract(d, c, cc);
		Vector3.scale(cc, t, cc);
		Vector3.add(c, cc, cc);

		const bbb = cc;
		Vector3.subtract(cc, bb, bbb);
		Vector3.scale(bbb, t, bbb);
		Vector3.add(bb, bbb, bbb);

		const aaa = bb;
		Vector3.subtract(bb, aa, aaa);
		Vector3.scale(aaa, t, aaa);
		Vector3.add(aa, aaa, aaa);

		Vector3.subtract(bbb, aaa, bbb);
		Vector3.scale(bbb, t, bbb);
		Vector3.add(aaa, bbb, bbb);
		return cc;
	}
}