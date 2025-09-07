export const enum ServiceType {
    Lobby = ".lq.Lobby",
    FastTest = ".lq.FastTest",
    Route = ".lq.Route",
}

export const enum HeaderType {
    Notify = 1,
    Request,
    Response,
}

export const enum ERouteState {
    /** 空闲 */
    Idle = "idle",
    /** 正常 */
    Normal = "normal",
    /** 忙碌 */
    Busy = "busy",
    /** 移除 */
    Removed = "removed",
    /** 拒绝 */
    Rejected = "rejected",
}