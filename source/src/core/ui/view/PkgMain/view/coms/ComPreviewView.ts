import ComPreview from "../../../../ui/PkgMain/ComPreview";

export class ComPreviewView extends ExtendClass<IView, ComPreview>(ComPreview) implements IView {

	override onCreate() {
		const { btn_close1, btn_close2 } = this;
		btn_close1.onClick(this, this.close);
		btn_close2.onClick(this, this.close);
	}

	show(id: number, itemType:EItemCommonType) {
		const { ctrl_type, com_item, com_head, txt_name, com_mjp0, com_mjp1, com_mjp2, com_mjp3, com_mjp4 } = this;
		ctrl_type.selectedIndex = itemType == EItemCommonType.HeadFrame ? 1 : 0;
		if (itemType == EItemCommonType.HeadFrame) {
			com_head.refresh($user.account.avatarId, id);
		} else {
			com_item.refresh(id);
			com_mjp0.refresh("5z");
			com_mjp1.refresh("back");
			com_mjp2.refresh("back");
			com_mjp3.refresh("back");
			com_mjp4.refresh("back");
		}
		txt_name.text = $itemUtil.getItemInfo(id).name;
		this.visible = true;
	}

	close() {
		this.visible = false;
	}
}
