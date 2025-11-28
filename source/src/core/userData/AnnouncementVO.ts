import { BaseVO } from "./BaseVO";

export class AnnouncementVO extends BaseVO implements VO.IAnnouncementVO {
	private _announcements: ProtoObject<IAnnouncement>[] = [];
	private _readList: number[] = [];

	private get lang() {
		return $gameMgr.clientType == EClientType.EN && $gameMgr.language == ELanguage.KR ? 'us-kr' : $gameMgr.language.toString();
	}
	private get platform() { return $gameMgr.inDmm ? 'web_dmm' : 'web'; }
	get announcements() { return this._announcements; }
	get readList() { return this._readList; }

	fetchAnnouncement() {
		$netMgr.requests.fetchAnnouncement({
			lang: this.lang,
			platform: this.platform,
		});
	}

	@InterestMessage(EMessageID.fetchAnnouncement)
	private onFetchAnnouncement(res: IResAnnouncement) {
		const decodeRes = $decodeProtoData(res);
		this._announcements = decodeRes.announcements;
		this._readList = decodeRes.read_list;
	}

	@InterestMessage(ENotify.NotifyAnnouncementUpdate)
	private onAnnouncementUpdate(data: INotifyAnnouncementUpdate) {
		for (let i = 0; i < data.update_list.length; i++) {
			const e = data.update_list[i];
			if (e.lang == this.lang && e.platform == this.platform) {
				this.fetchAnnouncement();
				break;
			}
		}
	}
}