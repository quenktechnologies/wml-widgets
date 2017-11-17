"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * DefaultDelegate fowards all events to their corresponding
 * function handlers, specifed on the attributes of a control.
 */
var DefaultDelegate = /** @class */ (function () {
    function DefaultDelegate(attrs) {
        var _this = this;
        this.attrs = attrs;
        this.onClick = function (e) {
            return _this.attrs.onClick ? _this.attrs.onClick(e) : null;
        };
        this.onChange = function (e) {
            return _this.attrs.onChange ? _this.attrs.onChange(e) : null;
        };
        this.onSelect = function (e) {
            return _this.attrs.onSelect ? _this.attrs.onSelect(e) : null;
        };
    }
    return DefaultDelegate;
}());
exports.DefaultDelegate = DefaultDelegate;
//# sourceMappingURL=DefaultDelegate.js.map