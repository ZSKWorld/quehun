import { ScriptNotifier } from "./ScriptNotifier";

export class ScriptObserver extends ScriptNotifier implements IScriptObserver {
	constructor() {
		super();
		$facade.setGlobalEventDecoratorEnable(this, true);
		$facade.setNetEventDecoratorEnable(this, true);
		$facade.setUserEventDecoratorEnable(this, true);
	}
}
