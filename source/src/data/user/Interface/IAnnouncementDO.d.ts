declare namespace DO {
	interface IAnnouncementDO {
		announcements: ProtoObject<IAnnouncement>[];
		isRead(id: number): boolean;
		fetchAnnouncement(): void;
	}
}