"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStyleClassName = exports.styles = exports.Style = exports.OUTLINE = exports.ERROR = exports.WARNING = exports.INFO = exports.SUCCESS = exports.PRIMARY = exports.DEFAULT = void 0;
///classNames:begin
/**
 * DEFAULT style.
 */
exports.DEFAULT = '-default';
/**
 * PRIMARY style.
 */
exports.PRIMARY = '-primary';
/**
 * SUCCESS style.
 */
exports.SUCCESS = '-success';
/**
 * INFO style.
 */
exports.INFO = '-info';
/**
 * WARNING style.
 */
exports.WARNING = '-warning';
/**
 * ERROR style.
 */
exports.ERROR = '-error';
/**
 * OUTLINE style.
 */
exports.OUTLINE = '-outline';
///classNames:end
/**
 * Style enum.
 */
var Style;
(function (Style) {
    Style["Default"] = "default";
    Style["Primary"] = "primary";
    Style["Success"] = "success";
    Style["Info"] = "info";
    Style["Warning"] = "warning";
    Style["Error"] = "error";
})(Style = exports.Style || (exports.Style = {}));
exports.styles = [
    Style.Default,
    Style.Success,
    Style.Info,
    Style.Warning,
    Style.Error
];
/**
 * getStyleClassName
 */
exports.getStyleClassName = function (s) {
    switch (s) {
        case Style.Default:
            return exports.DEFAULT;
        case Style.Primary:
            return exports.PRIMARY;
        case Style.Success:
            return exports.SUCCESS;
        case Style.Info:
            return exports.INFO;
        case Style.Warning:
            return exports.WARNING;
        case Style.Error:
            return exports.ERROR;
    }
    return exports.DEFAULT;
};
//# sourceMappingURL=index.js.map