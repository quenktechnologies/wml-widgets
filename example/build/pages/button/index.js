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
var views = require("./wml/button");
var class_names_1 = require("../../../../lib/util/class-names");
var Page_1 = require("../Page");
var ButtonPage = /** @class */ (function (_super) {
    __extends(ButtonPage, _super);
    function ButtonPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            capitalize: function (s) { return "" + s[0].toUpperCase() + s.slice(1); },
            styles: class_names_1.styles,
            sizes: class_names_1.sizes
        };
        return _this;
    }
    return ButtonPage;
}(Page_1.Page));
exports.ButtonPage = ButtonPage;
//# sourceMappingURL=index.js.map