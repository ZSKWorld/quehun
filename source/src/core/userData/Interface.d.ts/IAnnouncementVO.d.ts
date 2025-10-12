declare namespace VO {
    declare interface IAnnouncementVO {
        announcements: ProtoObject<IAnnouncement>[] ;
        sort: number[];
        readList: number[];
        fetchAnnouncement(): void;
    }
}