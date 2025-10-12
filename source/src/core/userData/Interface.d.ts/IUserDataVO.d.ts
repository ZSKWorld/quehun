declare namespace VO {
    declare interface IUserDataVO extends IObserver {
        account: IAccountVO;
        character: ICharacterVO;
        activity: IActivityVO;
        recharge: IRechargeVO;
        announcement: IAnnouncementVO;
        clientValue: ClientValueVO;
    }
}