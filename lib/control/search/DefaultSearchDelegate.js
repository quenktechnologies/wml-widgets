"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * DefaultSearchDelegate is used when the user does not specify a delegate.
 */
var DefaultSearchDelegate = /** @class */ (function () {
    function DefaultSearchDelegate(search) {
        this.search = search;
    }
    DefaultSearchDelegate.prototype.onChange = function (e) {
        this.search.attrs.ww.onChange ?
            this.search.attrs.ww.onChange(e) : null;
    };
    DefaultSearchDelegate.prototype.onEscape = function (e) {
        this.search.attrs.ww.onEscape ?
            this.search.attrs.ww.onEscape(e) : null;
    };
    DefaultSearchDelegate.prototype.onSelect = function (e) {
        this.search.attrs.ww.onSelect ?
            this.search.attrs.ww.onSelect(e) : null;
    };
    return DefaultSearchDelegate;
}());
exports.DefaultSearchDelegate = DefaultSearchDelegate;
//# sourceMappingURL=DefaultSearchDelegate.js.map