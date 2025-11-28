declare namespace VO {
	declare interface IAnnouncementVO {
		announcements: ProtoObject<IAnnouncement>[];
		readList: number[];
		fetchAnnouncement(): void;
	}
}