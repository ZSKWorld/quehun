/** 把proto数据转成普通object对象 */
declare function $decodeProtoData<T extends IProto | IProto[]>(data: T): ProtoObject<T>;

declare interface IPbManager {
	get methodMap(): KeyMap<protobuf.Method>;
	get method2Service(): KeyMap<EServiceType>;
	init(): Promise<void>;
	decodeMessage(bytes: Uint8Array): protobuf.Message<{}>;
	encodeRpc(method: string, bytes: Uint8Array): Uint8Array;
	decodeRpc(bytes: Uint8Array): { name: string, data: Uint8Array };
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

declare interface INetManager {
	get requests(): IReqMethod;
	get lobbyConnected(): boolean;
	get gameConnected(): boolean;
	get obConnected(): boolean;

	init(): Promise<void>;
	connectLobby(): void;
	connectGame(): void;
	connectOb(): void;
	closeLobby(): void;
	closeGame(): void;
	closeOb(): void;
	closeAll(): void;
}