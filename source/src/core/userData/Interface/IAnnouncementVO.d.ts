declare namespace VO {
	interface IAnnouncementVO {
		announcements: ProtoObject<IAnnouncement>[];
		readList: number[];
		fetchAnnouncement(): void;
	}
}