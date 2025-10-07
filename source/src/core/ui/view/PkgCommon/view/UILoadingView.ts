import UILoading from "../../../ui/PkgCommon/UILoading";

export const enum EUILoadingMsg {

}

export class UILoadingView extends ExtensionClass<IView, UILoading>(UILoading) implements IView {

    override onCreate() {

    }

    refreshContent() {
        const isCG = $userData.account.isLoadingCG();
        this.ctrl_state.selectedIndex = isCG ? 1 : 0;
        if (isCG) {
            const cgId = $userData.account.getCGId();
            const cgPath = $cfgMgr.item_definition.loading_image[cgId].img_path;
            this.loader_cg.icon = $langRes(cgPath);
        } else {
            this.loader_left.icon = $langRes(`myres2/loading_3que1/left_${ $mathUtil.randomInt(0, 18) }.png`);
            this.loader_mid.icon = $langRes(`myres2/loading_3que1/mid_${ $mathUtil.randomInt(0, 18) }.png`);
            this.loader_right.icon = $langRes(`myres2/loading_3que1/right_${ $mathUtil.randomInt(0, 19) }.png`);
            this.loader_desk.icon = $langRes(`myres2/loading_3que1/desktop${ $mathUtil.randomInt(0, 2) }.png`);
        }
        this.refreshProgress(0);
        this.updateBlockPos();
    }

    updateBlockPos() {
        const pb = $userData.account.isLoadingCG() ? this.pb_progress2 : this.pb_progress;
        const x = pb.value / pb.max * pb.width;
        pb.img_block.x = x;
    }

    refreshProgress(pro: number) {
        const pb = $userData.account.isLoadingCG() ? this.pb_progress2 : this.pb_progress;
        pb.value = pro * pb.max;
    }

}
