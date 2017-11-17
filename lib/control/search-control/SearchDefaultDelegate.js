"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var control_1 = require("@package/self/control");
/**
 * SearchDefaultDelegate fowards all events to their corresponding
 * function handlers, specifed on the attributes of a control.
 */
var SearchDefaultDelegate = /** @class */ (function (_super) {
    __extends(SearchDefaultDelegate, _super);
    function SearchDefaultDelegate(attrs) {
        var _this = _super.call(this, attrs) || this;
        _this.attrs = attrs;
        _this.onSearch = function (e) {
            if (_this.attrs.onSearch)
                _this.attrs.onSearch(e);
        };
        return _this;
    }
    return SearchDefaultDelegate;
}(control_1.DefaultDelegate));
exports.SearchDefaultDelegate = SearchDefaultDelegate;
//# sourceMappingURL=SearchDefaultDelegate.js.map