/**
 * DEFAULT style.
 */
export declare const DEFAULT = "-default";
/**
 * PRIMARY style.
 */
export declare const PRIMARY = "-primary";
/**
 * SUCCESS style.
 */
export declare const SUCCESS = "-success";
/**
 * INFO style.
 */
export declare const INFO = "-info";
/**
 * WARNING style.
 */
export declare const WARNING = "-warning";
/**
 * ERROR style.
 */
export declare const ERROR = "-error";
/**
 * OUTLINE style.
 */
export declare const OUTLINE = "-outline";
/**
 * Style enum.
 */
export declare enum Style {
    Default = "default",
    Primary = "primary",
    Success = "success",
    Info = "info",
    Warning = "warning",
    Error = "error"
}
export declare const styles: Style[];
/**
 * getStyleClassName
 */
export declare const getStyleClassName: (s: Style) => string;
