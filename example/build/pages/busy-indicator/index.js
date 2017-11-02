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
var busy_indicator_1 = require("./wml/busy-indicator");
var Page_1 = require("../Page");
var BusyIndicatorPage = /** @class */ (function (_super) {
    __extends(BusyIndicatorPage, _super);
    function BusyIndicatorPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new busy_indicator_1.Main(_this);
        return _this;
    }
    return BusyIndicatorPage;
}(Page_1.Page));
exports.BusyIndicatorPage = BusyIndicatorPage;
//# sourceMappingURL=index.js.map