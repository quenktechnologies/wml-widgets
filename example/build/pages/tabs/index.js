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
var views = require("./wml/tabs");
var Page_1 = require("../Page");
var TabsPage = /** @class */ (function (_super) {
    __extends(TabsPage, _super);
    function TabsPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.tab = 'First';
        _this.content = 'First Tab';
        _this.clicked = function (_a) {
            var name = _a.name;
            _this.tab = name;
            _this.content = name + " Tab";
            _this.view.invalidate();
        };
        return _this;
    }
    return TabsPage;
}(Page_1.Page));
exports.TabsPage = TabsPage;
//# sourceMappingURL=index.js.map