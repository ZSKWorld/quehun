export class SpineController extends Laya.Script implements ISpineController {
	override owner: Laya.Sprite;
	private _spineId: number = 0;
	private _spineNodes: Laya.Spine2DRenderNode[] = [];
	get spineId() { return this._spineId; }
	get spineNodes() { return this._spineNodes; }

	init(id: number) {
		this._spineId = id;
		const childs = this.gowner._children;
		for (let i = 0; i < childs.length; i++) {
			const node = childs[i].getComponent(Laya.Spine2DRenderNode);
			if (!node) continue;
			this._spineNodes.push(node);
		}
	}

	play(nameOrIndex: string | number, loop: boolean, force = true, start = 0, end = 0, freshSkin = true, playAudio = false) {
		const nodes = this.spineNodes;
		if (!nodes) return;
		for (let i = 0; i < nodes.length; i++) {
			nodes[i].play(nameOrIndex, loop, force, start, end, freshSkin, playAudio);
		}
	}

	override onDestroy() {
		this._spineId = 0;
		this._spineNodes.length = 0;
	}

	override onReset() {

	}
}