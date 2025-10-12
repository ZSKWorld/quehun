declare namespace VO {
    declare interface IClientValueVO {
        get data(): ProtoObject<IResClientValue_Value>[];
        get rechargeCount(): number;
    }
}