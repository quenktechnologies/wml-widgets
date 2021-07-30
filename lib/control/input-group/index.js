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
exports.AddOn = exports.InputGroup = exports.INPUT_GROUP_BUTTON_ADDON = exports.INPUT_GROUP_ADDON = exports.INPUT_GROUP = void 0;
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var __1 = require("../../");
var input_group_1 = require("./wml/input-group");
///classNames:begin
exports.INPUT_GROUP = 'ww-input-group';
exports.INPUT_GROUP_ADDON = 'ww-input-group__addon';
exports.INPUT_GROUP_BUTTON_ADDON = 'ww-input-group__button-addon';
/**
 * InputGroup allows an input to be wrapped together with other controls to
 * appear as one.
 *
 * This is useful for creating inputs that may have related fields that should
 * be modified when changed. For example, entering an amount and currency in the
 * same place.
 *
 *  +--------------------------------+
 *  | TTD ^ | 5000.00                |
 *  +--------------------------------+
 */
var InputGroup = /** @class */ (function (_super) {
    __extends(InputGroup, _super);
    function InputGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new input_group_1.InputGroupView(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.INPUT_GROUP, __1.getClassName(_this.attrs)),
        };
        return _this;
    }
    return InputGroup;
}(wml_1.Component));
exports.InputGroup = InputGroup;
/**
 * AddOn is used to attach the extra text or control to the input.
 */
var AddOn = /** @class */ (function (_super) {
    __extends(AddOn, _super);
    function AddOn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new input_group_1.AddOnView(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(_this.attrs.button ?
                exports.INPUT_GROUP_BUTTON_ADDON :
                exports.INPUT_GROUP_ADDON, __1.getClassName(_this.attrs)),
        };
        return _this;
    }
    return AddOn;
}(wml_1.Component));
exports.AddOn = AddOn;
//# sourceMappingURL=index.js.map