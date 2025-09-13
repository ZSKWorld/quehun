import { SceneType } from "../../../../../scene/SceneDefine";
import { NotifyConst } from "../../../../common/NotifyConst";
import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { BattleType } from "../../../../userData/const/BattleEnums";
import { UIUtil } from "../../../tool/UIUtil";
import { RenderChooseBattleView } from "../view/renders/RenderChooseBattleView";
import { UIChooseBattleMsg, UIChooseBattleView } from "../view/UIChooseBattleView";
import { RenderChooseBattleMediator } from "./renders/RenderChooseBattleMediator";

export class UIChooseBattleMediator extends MediatorBase<UIChooseBattleView, BattleType> {
	private items: BattleCfgData[];

	override onAwake() {
		this.addEvent(UIChooseBattleMsg.OnBtnBackClick, this.onBtnBackClick);

		UIUtil.setList(this.view.list_battle, true, this, this.onListBattleRender);
	}

	override onEnable() {
		this.refreshList();
	}

	override onOpenAni() {
		return new Promise<void>(resolve => {
			const children = this.view.list_battle._children;
			if (children.length == 0) resolve();
			else {
				const childIndex = children.length - 1;
				children.forEach((v, i) => {
					v.alpha = 0;
					const y = v.y;
					v.y -= 100;
					Laya.Tween.to(v, { y, alpha: 1 }, 100, null, i == childIndex ? Laya.Handler.create(null, resolve) : null, i * 50, true);
				});
			}
		});
	}

	override onDisable() {
		this.view.list_battle.numItems = 0;
	}

	private refreshList() {
		this.view.setBattleType(this.data - 1);
		let itemCfg: BattleCfg;
		switch (this.data) {
			case BattleType.Level: itemCfg = cfgMgr.Level; break;
			case BattleType.Copy: itemCfg = cfgMgr.Copy; break;
			case BattleType.Secret: itemCfg = cfgMgr.Secret; break;
			case BattleType.Boss: itemCfg = cfgMgr.Boss; break;
			case BattleType.Gather: itemCfg = cfgMgr.Gather; break;
			default: this.items ? this.items.length = 0 : this.items = []; break;
		}
		itemCfg && (this.items = Object.keys(itemCfg).map((v) => itemCfg[v]));
		this.view.list_battle.numItems = this.items.length;
	}

	private onListBattleRender(index: number, item: RenderChooseBattleView) {
		const itemMediator = item.mediator as RenderChooseBattleMediator;
		itemMediator.setData(this.data, this.items[index]);
	}

	private onBtnBackClick() {
		sceneMgr.enterScene(SceneType.MainScene);
	}

	@InterestNotify(NotifyConst.EnterBattle)
	private onEnterBattle() {
		this.closeSelf();
	}

}