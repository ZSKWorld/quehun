declare namespace DO {
	interface IAnnouncementDO {
		get announcements(): ProtoObject<IAnnouncement>[];
		get haveNotRead(): boolean;
		isRead(id: number): boolean;
		fetchAnnouncement(): Promise<IResAnnouncement>;
	}
}