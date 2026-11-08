import UITestSnake from "../../../../ui/PkgTest/UITestSnake";

export class UITestSnakeView extends UITestSnake {
	private _preCount: number = 0;
	private _count: number = 0;

	override onCreate() {
		const { btn_close, btn_resetObs, graph_map, graph_bg, slider_cellSize } = this;
		btn_close.onClick(this, this.closeSelf);
		graph_bg.onClick(this, this.onGraphMapClick);
		slider_cellSize.max = 1000;
	}

	protected override onEnable() {
		this._preCount = this._count = 0;
		this.refreshCount();
		Laya.timer.loop(1000, this, this.onSecondLoop);
		Laya.timer.frameLoop(1, this, this.refreshCount);
	}

	protected override onDisable() {
		Laya.timer.clear(this, this.onSecondLoop);
		Laya.timer.clear(this, this.refreshCount);
	}

	private onGraphMapClick() {
		this._preCount++;
	}

	private onSecondLoop() {
		this._count = this._preCount;
		this._preCount = 0;
	}

	private refreshCount() {
		this.slider_cellSize.value = Math.max(this._count, this._preCount);
	}
}
