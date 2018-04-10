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
var views = require("./wml/nav");
var Page_1 = require("../Page");
var NavPage = /** @class */ (function (_super) {
    __extends(NavPage, _super);
    function NavPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.active = '';
        _this.links = {
            Home: {},
            Profile: {},
            Messages: {}
        };
        _this.navigate = function (e) {
            _this
                .view
                .findGroupByName('links')
                .map(function (ls) { return ls.map(function (l) { return l.deactivate(); }); })
                .chain(function () { return _this.view.findById(e.name); })
                .map(function (l) { return l.activate(); });
        };
        return _this;
    }
    return NavPage;
}(Page_1.Page));
exports.NavPage = NavPage;
//# sourceMappingURL=index.js.map