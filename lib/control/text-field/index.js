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
var views = require("./wml/text-field");
var util_1 = require("../../util");
var form_1 = require("../form");
var __1 = require("../../");
var __2 = require("../");
var oninput = function (f) { return function (e) {
    if (f.attrs.ww && f.attrs.ww)
        f.attrs.ww.onChange(new TextChangedEvent((f.attrs.ww && f.attrs.ww.name) ?
            f.attrs.ww.name : '', e.target.value));
}; };
var input = function (f) {
    return util_1.getById(f.view, f.values.control.wml.id);
};
///classNames:begin
exports.TEXT_FIELD = 'form-control';
/**
 * TextChangedEvent
 */
var TextChangedEvent = /** @class */ (function (_super) {
    __extends(TextChangedEvent, _super);
    function TextChangedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TextChangedEvent;
}(__2.Event));
exports.TextChangedEvent = TextChangedEvent;
/**
 * TextField provides a wrapped native text input control.
 */
var TextField = /** @class */ (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.get = function () { return input(_this).map(function (e) { return e.value; }).get(); };
        _this.set = function (v) { return input(_this).map(function (e) { e.value = v; return _this; }).get(); };
        _this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.TEXT_FIELD, __1.getClassName(_this.attrs))
            },
            messages: {
                wml: {
                    id: 'message'
                }
            },
            label: {
                id: __2.getName(_this.attrs),
                text: (_this.attrs.ww && _this.attrs.ww.label) ? _this.attrs.ww.label : ''
            },
            control: {
                wml: {
                    id: 'control'
                },
                template: function () {
                    return (_this.attrs.ww && _this.attrs.ww.controlTemplate) ?
                        _this.attrs.ww.controlTemplate : views.group;
                },
                name: __2.getName(_this.attrs),
                type: 'text',
                focus: (_this.attrs.ww && _this.attrs.ww.focus) ?
                    _this.attrs.ww.focus : null,
                placeholder: (_this.attrs.ww && _this.attrs.ww.placeholder) ?
                    _this.attrs.ww.placeholder : '',
                value: (_this.attrs.ww && _this.attrs.ww.value) ?
                    _this.attrs.ww.value : '',
                disabled: (_this.attrs.ww && _this.attrs.ww.disabled) ? true : null,
                readOnly: (_this.attrs.ww && _this.attrs.ww.readOnly) ?
                    true : null,
                rows: (_this.attrs.ww && _this.attrs.ww.rows) ?
                    _this.attrs.ww.rows : 1,
                oninput: (_this.attrs.ww && _this.attrs.ww.onChange) ?
                    oninput(_this) : function () { }
            }
        };
        return _this;
    }
    return TextField;
}(form_1.AbstractFormControl));
exports.TextField = TextField;
//# sourceMappingURL=index.js.map