
export class UIScriptBase<T> extends Laya.Script implements IObserver {
    override owner: Laya.Sprite;
    protected get gowner() { return this.owner.$owner as T; }

    dispatch(eventName: string, data?: any): void {
        facade.dispatch(eventName, data);
    }

    override onReset() {
        super.onReset();
        facade.offAllCaller(this);
    }
    
    protected override _onAdded() {
        super._onAdded();
        facade.interestNotify(this);

    }
}
