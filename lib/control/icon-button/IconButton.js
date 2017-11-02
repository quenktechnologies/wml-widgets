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
var wml_runtime_1 = require("@quenk/wml-runtime");
var icon_button_1 = require("./wml/icon-button");
/**
 * IconButton provides a 'hamburger' menu button.
 */
var IconButton = /** @class */ (function (_super) {
    __extends(IconButton, _super);
    function IconButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new icon_button_1.Main(_this);
        _this.values = {
            class: {
                root: names.ICON_BUTTON
            }
        };
        return _this;
    }
    return IconButton;
}(wml_runtime_1.Component));
exports.IconButton = IconButton;
//# sourceMappingURL=IconButton.js.map