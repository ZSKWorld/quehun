import ComPreview from "../../../../ui/PkgMain/ComPreview";

export class ComPreviewView extends ComPreview {

	override onCreate() {
		const { btn_close1, btn_close2 } = this;
		btn_close1.onClick(this, this.close);
		btn_close2.onClick(this, this.close);
	}

	show(id: number, itemType: EItemCommonType) {
		const { ctrl_type, com_item, com_head, txt_name, com_preview } = this;
		txt_name.text = $itemUtil.getItemInfo(id).name;
		switch (itemType) {
			case EItemCommonType.HeadFrame:
				ctrl_type.selectedIndex = 0;
				com_head.refresh($user.account.avatarId, id);
				break;
			case EItemCommonType.TableCloth:
				ctrl_type.selectedIndex = 1;
				com_item.refreshItemIcon(id);
				com_preview.refreshPreview($user.commonView.curMjpBack);
				break;
			case EItemCommonType.MjpBack:
				ctrl_type.selectedIndex = 2;
				com_item.refreshItemIcon($user.commonView.curTableCloth);
				com_preview.refreshPreview(id);

				break;
			case EItemCommonType.MjpFront:
				ctrl_type.selectedIndex = 3;
				com_item.refreshItemIcon($user.commonView.curTableCloth);
				com_preview.refreshPreview(id);
				break;
			case EItemCommonType.DaTingBeiJing:
				ctrl_type.selectedIndex = 4;
				com_item.refreshPreview(id);
				break;

			default:
				break;
		}
		this.visible = true;
	}

	close() {
		this.visible = false;
	}
}
