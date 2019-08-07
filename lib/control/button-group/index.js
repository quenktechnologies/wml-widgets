"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/button-group");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var toolbar_1 = require("../toolbar");
var __1 = require("../../");
///classNames:begin
exports.BUTTON_GROUP = 'ww-button-group';
/**
 * ButtonGroup groups multiple buttons into one element.
 */
var ButtonGroup = /** @class */ (function (_super) {
    __extends(ButtonGroup, _super);
    function ButtonGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.BUTTON_GROUP, toolbar_1.TOOLBAR_COMPAT, __1.getClassName(_this.attrs))
            }
        };
        return _this;
    }
    return ButtonGroup;
}(wml_1.Component));
exports.ButtonGroup = ButtonGroup;
//# sourceMappingURL=index.js.map