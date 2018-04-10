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
var views = require("./wml/main-layout");
var orientation = require("../../../lib/content/orientation");
var util_1 = require("../../util");
var Group_1 = require("../../content/Group");
///classNames:begin
exports.MAIN_LAYOUT = 'ww-main-layout';
/**
 * MainLayout provides a container for the main content of an application.
 */
var MainLayout = /** @class */ (function (_super) {
    __extends(MainLayout, _super);
    function MainLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                class: util_1.concat(exports.MAIN_LAYOUT, orientation.RIGHT_PUSHABLE, _this.attrs.ww ? _this.attrs.ww.class : '')
            }
        };
        return _this;
    }
    return MainLayout;
}(Group_1.Group));
exports.MainLayout = MainLayout;
//# sourceMappingURL=index.js.map