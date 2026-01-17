declare interface IPbManager {
	get methodMap(): KeyMap<protobuf.Method>;
	get method2Service(): KeyMap<ServiceType>;
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

declare interface INetManager extends Laya.EventDispatcher {
	get requests(): IReqMethod;
	get lobbyConnected(): boolean;
	get gameConnected(): boolean;
	get obConnected(): boolean;

	init(): Promise<void>;
	connectLobby(): void;
	closeLobby(): void;
	connectGame(): void;
	closeGame(): void;
	connectOb(): void;
	closeOb(): void;
	closeAll(): void;
	interestMessage(caller: any): void;
}