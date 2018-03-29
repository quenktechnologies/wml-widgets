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
var names = require("@package/wml-widgets/common/names");
var wml_1 = require("@quenk/wml");
var checkbox_1 = require("./wml/checkbox");
var CheckboxChangedEvent_1 = require("./CheckboxChangedEvent");
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
            class: {
                root: names.CHECKBOX,
            },
            input: {
                name: _this.attrs.ww.name,
                checked: _this.attrs.ww.checked || false,
                onChange: function () {
                    _this.values.input.checked = !_this.values.input.checked;
                    if (_this.attrs.ww.onChange)
                        _this.attrs.ww.onChange(new CheckboxChangedEvent_1.CheckboxChangedEvent(_this.values.input.name, _this.values.input.checked));
                }
            }
        };
        return _this;
    }
    return Checkbox;
}(wml_1.Component));
exports.Checkbox = Checkbox;
//# sourceMappingURL=Checkbox.js.map