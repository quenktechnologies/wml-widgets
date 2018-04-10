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
var DefaultDelegate_1 = require("./DefaultDelegate");
var SortDelegate = /** @class */ (function (_super) {
    __extends(SortDelegate, _super);
    function SortDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SortDelegate.prototype.onHeadingClicked = function (e) {
        this.table.sort(e.field);
        _super.prototype.onHeadingClicked.call(this, e);
    };
    return SortDelegate;
}(DefaultDelegate_1.DefaultDelegate));
exports.SortDelegate = SortDelegate;
//# sourceMappingURL=SortDelegate.js.map