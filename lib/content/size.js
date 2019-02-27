"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///classNames:begin
exports.EXTRA_SMALL = '-extra-small';
exports.SMALL = '-small';
exports.MEDIUM = '-medium';
exports.LARGE = '-large';
exports.EXTRA_LARGE = '-extra-large';
///classNames:end
/**
 * Size
 */
var Size;
(function (Size) {
    Size["ExtraSmall"] = "extra-small";
    Size["Small"] = "small";
    Size["Medium"] = "medium";
    Size["Large"] = "large";
    Size["ExtraLarge"] = "extra-large";
})(Size = exports.Size || (exports.Size = {}));
/**
 * getSizeClassName
 */
exports.getSizeClassName = function (s) {
    if (s === Size.ExtraSmall)
        return exports.EXTRA_SMALL;
    else if (s === Size.Small)
        return exports.SMALL;
    else if (s === Size.Medium)
        return exports.MEDIUM;
    else if (s === Size.Large)
        return exports.LARGE;
    else if (s === Size.ExtraLarge)
        return exports.EXTRA_LARGE;
    return '';
};
//# sourceMappingURL=size.js.map