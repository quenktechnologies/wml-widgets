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
var views = require("./wml/tab-view");
var Page_1 = require("../Page");
var TabViewPage = /** @class */ (function (_super) {
    __extends(TabViewPage, _super);
    function TabViewPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.tabs = {
            first: {
                view: new views.FirstTab(_this)
            },
            second: {
                view: new views.SecondTab(_this)
            },
            third: {
                view: new views.ThirdTab(_this)
            }
        };
        return _this;
    }
    return TabViewPage;
}(Page_1.Page));
exports.TabViewPage = TabViewPage;
//# sourceMappingURL=index.js.map