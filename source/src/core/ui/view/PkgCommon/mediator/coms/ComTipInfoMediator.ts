import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { ComTipInfoView } from "../../view/coms/ComTipInfoView";

export class ComTipInfoMediator extends MediatorBase<ComTipInfoView, IComTipInfoData> {
	private static _displayTips: ComTipInfoMediator[] = [];
	private static readonly _showTime: number = 2000;
	private static readonly _moveUpSpeed: number = 10;
	private static readonly _tipSpace: number = 3;
	/** 剩余显示时间 */
	private _time: number;
	private _targetY: number;
	/** 是否到时该移除了 */
	private _timeToRemove: boolean;

	private static correctTipPosY() {
		const { _displayTips: displayTips, _tipSpace: tipSpace } = ComTipInfoMediator;
		if (displayTips.length == 0) return;
		const cnt = displayTips.length - 1;
		let startY = Laya.stage.height / 2;
		for (let i = cnt; i >= 0; i--) {
			const tip = displayTips[i];
			tip._targetY = startY - (i == cnt ? 0 : tip.view.height / 2);
			startY = tip._targetY - tip.view.height / 2 - tipSpace;
		}
	}

	override onEnable() {
		const { view, data } = this;
		this._time = ComTipInfoMediator._showTime;
		this._timeToRemove = false;
		view.alpha = 0;
		view.setContent(data);
		view.setXY(Laya.stage.width + view.width / 2, Laya.stage.height / 2);
		Laya.Tween.to(
			view,
			{ alpha: 1, x: Laya.stage.width / 2 },
			Math.log((view.height - 30) / 35 + 2) * 200,
			Laya.Ease.backOut,
			Laya.Handler.create(this, () => this._timeToRemove = true)
		);
		ComTipInfoMediator._displayTips.push(this);
		ComTipInfoMediator.correctTipPosY();
	}

	override onUpdate() {
		const { view, _targetY, _time, _timeToRemove } = this;
		const moveUpSpeed = ComTipInfoMediator._moveUpSpeed;
		const subY = _targetY - view.y;
		if (subY != 0)
			view.y += Math.abs(subY) > moveUpSpeed ? (Math.abs(subY) / subY * moveUpSpeed) : subY;
		if (_timeToRemove) {
			if (_time > 0) this._time -= Laya.timer.delta;
			else {
				this._timeToRemove = false;
				Laya.Tween.to(
					view,
					{ alpha: 0, x: -view.width / 2 },
					200, Laya.Ease.backIn,
					Laya.Handler.create(view, view.removeFromParent)
				);
			}
		}
	}

	override onDisable() {
		const index = ComTipInfoMediator._displayTips.indexOf(this);
		if (index > -1) ComTipInfoMediator._displayTips.splice(index, 1);
		Laya.Pool.recover(EUIPoolKey.TipInfo, this);
		ComTipInfoMediator.correctTipPosY();
	}
}