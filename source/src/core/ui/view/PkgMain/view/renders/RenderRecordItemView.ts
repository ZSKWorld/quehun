import RenderRecordItem from "../../../../ui/PkgMain/RenderRecordItem";

export class RenderRecordItemView extends RenderRecordItem {
	private _data: IRecordListEntry;

	override onCreate() {
		const { btn_rename, btn_collect, btn_share, btn_maka, btn_look, btn_foldArea, } = this;
		btn_rename.onClick(this, this.onBtnRenameClick);
		btn_collect.onClick(this, this.onBtnCollectClick);
		btn_share.onClick(this, this.onBtnShareClick);
		btn_maka.onClick(this, this.onBtnMakaClick);
		btn_look.onClick(this, this.onBtnLookClick);
		btn_foldArea.onClick(this, this.onBtnFoldAreaClick);
	}

	refresh(data: IRecordListEntry, index: number) {
		const {
			ctrl_siMa, btn_rename, btn_collect, btn_share, btn_maka, btn_look, btn_foldArea, img_arrow,
			com_info0, com_info1, com_info2, com_info3, txt_name, txt_time,
		} = this;
		const { version, uuid, start_time, end_time, tag, subtag, players, standard_rule, } = data;
		const isCollect = $user.record.isCollect(uuid);

		this._data = data;

		const isSiMa = players.length == 4;
		ctrl_siMa.selectedIndex = isSiMa ? 1 : 0;

		btn_rename.visible = isCollect;
		const canAnalysis = $user.record.maka.canAnalysis(data);
		btn_maka.visible = canAnalysis;

		const defaultRemarks = $uiUtil.getRecordTitle(tag, subtag);
		const collectBrief = $user.record.getCollectBrief(uuid);
		txt_name.text = collectBrief && collectBrief.remarks || defaultRemarks;
		txt_time.text = $timeUtil.timeFormat1(end_time * 1000, false);
		btn_collect.iconObject.icon = isCollect ? btn_collect.selectedIcon : btn_collect.icon;

		com_info0.refresh(uuid, players[0], isSiMa);
		com_info1.refresh(uuid, players[1], isSiMa);
		com_info2.refresh(uuid, players[2], isSiMa);
		com_info3.refresh(uuid, players[3], isSiMa);

		img_arrow.visible = btn_foldArea.visible = version == 202408; //2024年8月20日之前的牌谱不可展开
		this.refreshTopBtnsLayout();
		this.refreshLoaderBg();
	}

	private refreshTopBtnsLayout() {
		const {
			btn_rename, btn_collect, btn_share, btn_maka, btn_look,
		} = this;
		const space = 30;
		let startX = btn_look.x;
		[btn_maka, btn_share, btn_collect, btn_rename,].forEach((v, i) => {
			if (!v.visible) return;
			v.x = startX - space - v.width;
			startX = v.x;
		});
	}

	private onBtnRenameClick() {
		const { uuid } = this._data;
		if (!$user.record.isCollect(uuid)) return;

		const { btn_rename, group_gremarks, itxt_remarks, txt_name } = this;
		btn_rename.visible = false;
		group_gremarks.visible = true;
		itxt_remarks.text = txt_name.text;
		(<Laya.Input>itxt_remarks.displayObject).select();

		itxt_remarks.once(Laya.Event.BLUR, this, () => {
			btn_rename.visible = true;
			group_gremarks.visible = false;
			const remarks = itxt_remarks.text;

			if ($uiUtil.getWordsLen(remarks) > 30)
				$confirmSma(2, $lang(2765));
			else
				$user.record.changeCollectRemarks(uuid, remarks);
		});
		itxt_remarks.requestFocus();
	}

	private onBtnCollectClick() {
		const uuid = this._data.uuid;
		const isCollect = $user.record.isCollect(uuid);
		if (isCollect) {
			$confirmSma(3, $lang(3248)).then(v => {
				v && $user.record.removeCollect(uuid);
			});
		}
		else {
			this.openView<IUIRecordRemarksData>(EViewID.UIRecordRemarksView, {
				callback: (cancled, remarks) => {
					if (cancled) return;
					$user.record.addCollect(uuid, remarks);
				}
			});
		}
	}

	private onBtnShareClick() {
		this.openView<IUIRecordShareData>(EViewID.UIRecordShareView, {
			type: 0,
			uuid: this._data.uuid,
		});
	}

	private onBtnMakaClick() {
		this.openView(EViewID.UIMakaAnalysisView, this._data.uuid);
	}

	private onBtnLookClick() {
		$tipMgr.showTip("暂未实现！！！");
	}

	private onBtnFoldAreaClick() {
		const { _data, ctrl_fold } = this;
		const index = ctrl_fold.selectedIndex;
		if (index == 0) {
			ctrl_fold.selectedIndex = _data.players.length == 3 ? 1 : 2;
		} else {
			ctrl_fold.selectedIndex = 0;
		}
		this.refreshLoaderBg();
		(<fgui.GList>this.parent).refreshVirtualList();
	}

	private refreshLoaderBg() {
		let imgPath: string;
		switch (this.ctrl_fold.selectedIndex) {
			case 0: imgPath = ResPath.ETexturePath.PNG_Img_3930; break;
			case 1: imgPath = ResPath.ETexturePath.PNG_Img_4066; break;
			case 2: imgPath = ResPath.ETexturePath.PNG_Img_4100; break;
			default: return;
		}
		$dynamicResMgr.setLoader(this.loader_bg, imgPath);
	}

	protected override onDisable() {
		$dynamicResMgr.clearLoader(this.loader_bg);
	}
}
