declare interface UIConfirmData {
    format: 0 | 1 | 2 | 3;
    title: string;
    content: string;
    onConfirm?: Laya.Handler;
    onCancel?: Laya.Handler;
}