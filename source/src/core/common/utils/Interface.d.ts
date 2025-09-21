declare class GameUtil {
    static createUUID(): string;

    /** 随机颜色字符串 */
    static randomColor(): string;

    static HmacSHA256(msg: string): string;
}