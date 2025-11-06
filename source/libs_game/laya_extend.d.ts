declare namespace Laya {
	interface Node extends Laya.EventDispatcher {
		getComponents<T extends Laya.Component>(componentType: Class<T>): T[];
	}
	interface Vector2 {
		get length(): number;
		get lengthSquared(): number;
		add(v2: Vector2): Vector2;
		add(x: number, y: number): Vector2;
		sub(v2: Vector2): Vector2;
		scale(scale: number): Vector2;
		normalize(): Vector2;
		/**
		 * 旋转向量，角度大于0 顺时针旋转，小于0 逆时针旋转
		 * @param angle
		 */
		rotate(angle: number): Vector2;
		copyTo(v2: Vector2): Vector2;
		copyFrom(x: number, y: number): Vector2;
		dot(v2: Vector2): number;
		lerp(v2: Vector2, t: number): Vector2;
		slerp(end: Vector2, t: number): Vector2;
	}
	interface Sprite {
		$owner?: fgui.GObject;
	}
}
