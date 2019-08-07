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
var checkbox_1 = require("./wml/checkbox");
var util_1 = require("../../util");
var __1 = require("../");
var __2 = require("../../");
///classNames:begin
exports.CHECKBOX = 'ww-checkbox';
/**
 * CheckChangedEvent signals the user has changed the checkbox state.
 */
var CheckChangedEvent = /** @class */ (function (_super) {
    __extends(CheckChangedEvent, _super);
    function CheckChangedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CheckChangedEvent;
}(__1.Event));
exports.CheckChangedEvent = CheckChangedEvent;
/**
 * Checkbox control.
 *
 * This is an alternative to the native checkbox that can be styled.
 */
var Checkbox = /** @class */ (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new checkbox_1.Main(_this);
        _this.values = {
            root: {
                id: __2.getId(_this.attrs),
                className: util_1.concat(exports.CHECKBOX, __2.getClassName(_this.attrs))
            },
            input: {
                name: __1.getName(_this.attrs),
                value: (_this.attrs.ww && _this.attrs.ww.value) ?
                    _this.attrs.ww.value : null,
                onChange: function () {
                    _this.values.input.value = (!_this.values.input.value) || null;
                    if (_this.attrs.ww && _this.attrs.ww.onChange)
                        _this.attrs.ww.onChange(new CheckChangedEvent(_this.values.input.name, _this.values.input.value || false));
                }
            }
        };
        return _this;
    }
    return Checkbox;
}(__1.AbstractControl));
exports.Checkbox = Checkbox;
//# sourceMappingURL=index.js.map