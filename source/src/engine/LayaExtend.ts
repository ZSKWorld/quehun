
/** Laya扩展 */
export class LayaExtend {
	static extends() {
		this.vector2Extend();
	}

	/** Laya.Vector2扩展 */
	private static vector2Extend() {
		if (!Laya.Vector2) return;
		const prototype = Laya.Vector2.prototype;
		if (prototype.add) return;
		Object.defineProperties(prototype, {
			length: {
				get() { return Math.sqrt(this.lengthSquared); },
			},
			lengthSquared: {
				get() {
					const { x, y } = this;
					return x * x + y * y;
				},
			},
			add: {
				value: function (v1: number | Laya.Vector2, v2: number | Laya.Vector2) {
					const { x, y } = this;
					if (typeof v1 == "number") this.setValue(x + v1, y + v2);
					else this.setValue(x + v1.x, y + v1.y);
					return this;
				}
			},
			sub: {
				value: function (v2: Laya.Vector2) {
					this.setValue(this.x - v2.x, this.y - v2.y);
					return this;
				}
			},
			scale: {
				value: function (scale: number) {
					this.setValue(this.x * scale, this.y * scale);
					return this;
				}
			},
			normalize: {
				value: function () {
					Laya.Vector2.normalize(this, this);
					return this;
				}
			},
			rotate: {
				value: function (angle: number) {
					const radian = angle * Math.PI / 180;
					const cos = Math.cos(radian);
					const sin = Math.sin(radian);
					const { x, y } = this;
					this.setValue(x * cos - y * sin, x * sin + y * cos);
					return this;
				}
			},
			copyTo: {
				value: function (v2: Laya.Vector2) {
					v2.setValue(this.x, this.y);
					return v2;
				}
			},
			copyFrom: {
				value: function (x: number, y: number) {
					this.setValue(x, y);
					return this;
				}
			},
			dot: {
				value: function (v2: Laya.Vector2) {
					return Laya.Vector2.dot(this, v2);
				}
			},
			lerp: {
				value: function (b: Laya.Vector2, t: number) {
					const { x, y } = this;
					this.x = x + t * (b.x - x);
					this.y = y + t * (b.y - y);
					return this;
				}
			},
			slerp: {
				value: function (end: Laya.Vector2, t: number) {
					const dot = Math.min(Math.max(this.dot(end), -1), 1);
					const theta = Math.acos(dot) * t;
					const relativeVec = end.clone().sub(this.clone().scale(dot));
					relativeVec.normalize();
					return this.scale(Math.cos(theta)).add(relativeVec.scale(Math.sin(theta)));
				}
			}
		});
	}
}