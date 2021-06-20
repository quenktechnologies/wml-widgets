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
exports.TextField = exports.TEXT_FIELD = exports.TextChangedEvent = void 0;
var views = require("./wml/text-field");
var util_1 = require("../../util");
var feedback_1 = require("../feedback");
var form_1 = require("../form");
var text_input_1 = require("../text-input");
Object.defineProperty(exports, "TextChangedEvent", { enumerable: true, get: function () { return text_input_1.TextChangedEvent; } });
var __1 = require("../../");
var __2 = require("../");
///classNames:begin
exports.TEXT_FIELD = 'ww-text-field';
/**
 * TextField provides a wrapped native text input control.
 */
var TextField = /** @class */ (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                className: util_1.concat(exports.TEXT_FIELD, __1.getClassName(_this.attrs), feedback_1.getValidityClassName(_this.attrs))
            },
            messages: {
                wml: {
                    id: 'message'
                },
                text: feedback_1.getMessage(_this.attrs)
            },
            label: {
                id: __2.getName(_this.attrs),
                text: form_1.getLabel(_this.attrs)
            },
            control: {
                wml: {
                    id: 'root'
                },
                id: __1.getId(_this.attrs),
                name: __2.getName(_this.attrs),
                type: (_this.attrs.ww && _this.attrs.ww.type) ?
                    _this.attrs.ww.type : 'text',
                min: (_this.attrs.ww && _this.attrs.ww.min) ?
                    _this.attrs.ww.min : undefined,
                max: (_this.attrs.ww && _this.attrs.ww.max) ?
                    _this.attrs.ww.max : undefined,
                focus: (_this.attrs.ww && _this.attrs.ww.focus) ?
                    _this.attrs.ww.focus : undefined,
                placeholder: (_this.attrs.ww && _this.attrs.ww.placeholder) ?
                    _this.attrs.ww.placeholder : '',
                match: (_this.attrs.ww && _this.attrs.ww.match) ?
                    _this.attrs.ww.match : undefined,
                length: (_this.attrs.ww && _this.attrs.ww.length) ?
                    _this.attrs.ww.length : undefined,
                value: (_this.attrs.ww && _this.attrs.ww.value) ?
                    _this.attrs.ww.value : '',
                disabled: (_this.attrs.ww && _this.attrs.ww.disabled) ? true : undefined,
                readOnly: (_this.attrs.ww && _this.attrs.ww.readOnly) ?
                    true : undefined,
                rows: (_this.attrs.ww && _this.attrs.ww.rows) ?
                    _this.attrs.ww.rows : 1,
                oninput: (_this.attrs.ww && _this.attrs.ww.onChange) ?
                    oninput(_this) : function () { },
                onChange: (_this.attrs.ww && _this.attrs.ww.onChange) ?
                    _this.attrs.ww.onChange : function () { }
            }
        };
        return _this;
    }
    TextField.prototype.setMessage = function (msg) {
        getHelp(this).map(function (h) { return h.setMessage(msg); });
        return this;
    };
    TextField.prototype.removeMessage = function () {
        getHelp(this).map(function (h) { return h.removeMessage(); });
        return this;
    };
    return TextField;
}(form_1.AbstractFormControl));
exports.TextField = TextField;
var getHelp = function (t) {
    return util_1.getById(t.view, t.values.messages.wml.id);
};
var oninput = function (f) { return function (e) {
    if (f.attrs.ww && f.attrs.ww && f.attrs.ww.onChange)
        f.attrs.ww.onChange(new text_input_1.TextChangedEvent((f.attrs.ww && f.attrs.ww.name) ?
            f.attrs.ww.name : '', e.target.value));
}; };
//# sourceMappingURL=index.js.map