import { ScriptNotifier } from "./ScriptNotifier";

export class ScriptObserverOnEnable extends ScriptNotifier implements IScriptObserverOnEnable {

	protected override _onEnable() {
		super._onEnable();
		$facade.setGlobalEventDecoratorEnable(this, true);
		$facade.setNetEventDecoratorEnable(this, true);
		$facade.setUserEventDecoratorEnable(this, true);
	}

	protected override _onDisable() {
		super._onDisable();
		$facade.setGlobalEventDecoratorEnable(this, false);
		$facade.setNetEventDecoratorEnable(this, false);
		$facade.setUserEventDecoratorEnable(this, false);
	}
}
