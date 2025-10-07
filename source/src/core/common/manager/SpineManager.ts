class SpineController extends Laya.Script {
    override owner: Laya.Sprite;
    protected get gowner() { return this.owner.$owner; }
}
export class SpineManager {
    load(id: number) {

    }
}