declare namespace VO {
	interface IAnnouncementVO {
		announcements: ProtoObject<IAnnouncement>[];
		isRead(id: number): boolean;
		fetchAnnouncement(): void;
	}
}