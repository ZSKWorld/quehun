module net {
// 协议头类型
export enum ProtoHeaderType { NULL, NOTIFY, REQUEST, RESPONSE }

// 线路类型
export enum RouteType {None, Main, Standby, Detect}

// 延迟的默认值(秒)
export const DELAY_INF: number = 1000;

// 延迟太差的阈值。ui显示上 > 0.8就红了，这里数值偏大一些，红的时候还连着也算能用
export const DELAY_BAD_THRESHOLD: number = 1.0;

// 延迟好的阈值。ui显示上 < 0.3就绿了
export const DELAY_GOOD_THRESHOLD: number = 0.3;

}