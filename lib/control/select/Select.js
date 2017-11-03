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
var views = require("./wml/select");
var util_1 = require("@package/self/common/util");
var control_1 = require("@package/self/control");
var SelectChangedEvent_1 = require("./SelectChangedEvent");
/**
 * Select provides a dropdown list for selecting items.
 *
 * Note: Currently this relies on the native select but this
 * is likely to change in the future. Use the native <select>
 * directly if you must have that.
 */
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                id: 'root',
                class: util_1.concat('form-group', _this.attrs.ww.class, _this.state())
            },
            label: {
                id: _this.attrs.ww.name,
                text: _this.attrs.ww.label || ''
            },
            select: {
                id: 'select',
                name: _this.attrs.ww.name,
                class: 'form-control',
                value: _this.attrs.ww.value || '',
                disabled: (_this.attrs.ww.disabled === true) ? true : null,
                readOnly: (_this.attrs.ww.readOnly === true) ? true : null,
                options: _this.attrs.ww.options,
                placeholder: _this.attrs.ww.placeholder || 'Select one.',
                optValue: function (o) { return typeof o === 'string' ? o : o.value; },
                optLabel: function (o) { return typeof o === 'string' ? o : o.label; },
                isSelected: function (s) { return _this.values.select.value === s; },
                onChange: function (e) {
                    var target = e.target;
                    _this
                        .delegate
                        .onChange(new SelectChangedEvent_1.SelectChangedEvent(_this.attrs.ww.name, target.value));
                }
            },
            help: {
                id: 'message',
                success: _this.attrs.ww.success,
                error: _this.attrs.ww.error,
                warning: _this.attrs.ww.warning
            }
        };
        return _this;
    }
    return Select;
}(control_1.FormControl));
exports.Select = Select;
//# sourceMappingURL=Select.js.map