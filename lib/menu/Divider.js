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
var names = require("@package/self/common/names");
var views = require("./wml/divider");
var wml = require("@quenk/wml");
/**
 * Divider
 */
var Divider = /** @class */ (function (_super) {
    __extends(Divider, _super);
    function Divider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            class: {
                root: names.MENU_DIVIDER
            }
        };
        return _this;
    }
    return Divider;
}(wml.Component));
exports.Divider = Divider;
//# sourceMappingURL=Divider.js.map