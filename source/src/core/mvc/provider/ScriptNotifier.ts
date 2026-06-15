export abstract class ScriptNotifier extends Laya.Script implements IScriptNotifier {
	dispatch(eventName: string, data?: any) {
		$facade.dispatch(eventName, data);
	}
}
