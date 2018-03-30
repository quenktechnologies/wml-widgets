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
var views = require("./wml/main");
var names = require("../../common/names");
var util_1 = require("../../common/util");
var Group_1 = require("../../content/Group");
/**
 * Main provides a container for the main content of an application.
 */
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            class: {
                root: util_1.concat(names.MAIN_VIEW, names.PUSHABLE, _this.attrs.ww ? _this.attrs.ww.class : '')
            }
        };
        return _this;
    }
    return Main;
}(Group_1.Group));
exports.Main = Main;
//# sourceMappingURL=Main.js.map