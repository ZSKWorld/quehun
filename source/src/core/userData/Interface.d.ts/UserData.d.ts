declare namespace UserData {
    declare interface IUserData {
        loginUpdate(data: IResLogin): void;
        update(data: IAccountUpdate): void;
    }
}