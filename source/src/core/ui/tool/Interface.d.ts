declare interface IRichText {
    get text(): string;
    /** 添加超链接 */
    href(url: string): IRichText;
    /** 添加图片 */
    img(url: string, width?: number, height?: number): IRichText;
    /** 粗体 */
    bold(): IRichText;
    /** 斜体 */
    italic(): IRichText;
    /** 下划线 */
    underline(): IRichText;
    /** 添加空格 */
    space(count: number = 1): IRichText;
    /** 添加换行 */
    break(count: number = 1): IRichText;
    /** 设置大小 */
    size(size: number): IRichText;
    /** 设置颜色 */
    color(color: string): IRichText;
    /** 追加文本 */
    append(text: string): IRichText;
    /** 结束并返回富文本 */
    end(): string;
}

declare interface ITipManager {
    /**
     * 显示文本提示
     * @param text 显示文本
     * @param color 文本颜色，默认："#ffffff"
     */
    showTip(text: string, color?: string): void;
}