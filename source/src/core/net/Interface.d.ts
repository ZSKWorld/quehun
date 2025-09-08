declare interface IHeaderData {
    /** HeaderType */
    type: number;
    /** for HeaderType.REQUEST */
    reqIndex?: number;
}

declare interface IPbManager {
    get methodMap(): KeyMap<ServiceType>;
    loadPb(): Promise<void>;
    lookup(path: (string | string[]), parentAlreadyChecked?: boolean): protobuf.ReflectionObject;
    lookupType(path: (string | string[])): protobuf.Type;
    lookupEnum(path: (string | string[])): protobuf.Enum;
    lookupTypeOrEnum(path: (string | string[])): protobuf.Type;
    lookupService(path: (string | string[])): protobuf.Service;
    lookupMethod(path: (string | string[])): protobuf.Method;
    encodeHeaderData(header: IHeaderData): Uint8Array;
    encodeMessage(message: protobuf.Message<{}>): Uint8Array;
    decodeMessage(bytes: Uint8Array): protobuf.Message<{}>;
    encodeRpc(method: string, bytes: Uint8Array): Uint8Array;
    decodeRpc(bytes: Uint8Array): { name: string, data: Uint8Array };
}

declare interface IIPInfo {
    name: string;
    gateways: { id: string, url: string }[];
    system_email_url: string;
    prefix_url: string;
    contest_chat_url: string;
    dhs_url: string;
}
declare interface IIPConfig {
    ip: IIPInfo[];
    goods_sheleve_id: string;
    emergency_url: string;
    awsc_sdk_js: string;
    nec_sdk_js: string;
    tracker_url: string;
    wapchat_url: string;
    mycard_url: string;
    homepage_url: string;
    fb_oauth_url: string;
    fb_sdk_js: string;
    sgoogle_redirect_uri: string;
}
declare interface IRouteInfo {
    domain: string,
    id: string,
    level: number,
    name: string,
    order: number,
    ssl: boolean,
    state: ERouteState,
}

declare interface IResponseData{

}

declare interface INetManager {
    fetchConfig(): Promise<void>;
}