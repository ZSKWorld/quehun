import UILoading from "../../../ui/PkgCommon/UILoading";

export const enum EUILoadingMsg {

}

export class UILoadingView extends ExtensionClass<IView, UILoading>(UILoading) implements IView {

    override onCreate() {

    }

    updateBlockPos() {
        const pb = this.pb_progress;
        const x = pb.value / pb.max * pb.width;
        pb.img_block.x = x;
    }

    refreshProgress(pro: number) {
        const pb = this.pb_progress;
        pb.value = pro * pb.max;
    }

}
