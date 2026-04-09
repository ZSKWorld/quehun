import { BaseVO } from "./BaseVO";

export class AnnouncementVO extends BaseVO implements VO.IAnnouncementVO {
	private _announcements: ProtoObject<IAnnouncement>[] = [];
	private _readList: number[] = [];

	private get lang() {
		return $gameMgr.clientType == EClientType.EN && $gameMgr.language == ELanguage.KR ? 'us-kr' : $gameMgr.language.toString();
	}
	private get platform() { return $gameMgr.inDmm ? 'web_dmm' : 'web'; }
	get announcements() { return this._announcements; }

	isRead(id: number) { return this._readList.indexOf(id) != -1; }

	fetchAnnouncement() {
		$netMgr.requests.fetchAnnouncement({
			lang: this.lang,
			platform: this.platform,
		});
	}

	@InterestMessage(ENetMessage.fetchAnnouncement)
	private onFetchAnnouncement(res: IResAnnouncement) {
		const decodeRes = $decodeProtoData(res);
		this._announcements = decodeRes.announcements;
		this._readList = decodeRes.read_list;
		this.dispatch(EUserEvent.OnAnnouncementChanged);
	}

	@InterestMessage(ENetNotify.NotifyAnnouncementUpdate)
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