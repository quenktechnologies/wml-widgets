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
var views = require("./wml/text-input");
var util_1 = require("../../util");
var orientation_1 = require("../../content/orientation");
var size_1 = require("../../content/size");
var focus_1 = require("../focus");
var __1 = require("../../");
var __2 = require("../");
///classNames:begin
exports.TEXT_INPUT = 'ww-text-input';
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
 * TextInput provides some extra styling to the native input.
 */
var TextInput = /** @class */ (function (_super) {
    __extends(TextInput, _super);
    function TextInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = (_this.attrs.ww && _this.attrs.ww.rows && _this.attrs.ww.rows > 1) ?
            new views.Textarea(_this) : new views.Input(_this);
        _this.values = {
            control: {
                wml: {
                    id: 'root'
                }
            },
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.TEXT_INPUT, __1.getClassName(_this.attrs), (_this.attrs.ww && _this.attrs.ww.size) ?
                size_1.getSizeClassName(_this.attrs.ww.size) : '', (_this.attrs.ww && _this.attrs.ww.block) ?
                orientation_1.BLOCK : ''),
            name: __2.getName(_this.attrs),
            type: (_this.attrs.ww && _this.attrs.ww.type) ?
                _this.attrs.ww.type : 'text',
            min: (_this.attrs.ww && _this.attrs.ww.min) ?
                String(_this.attrs.ww.min) : null,
            max: (_this.attrs.ww && _this.attrs.ww.max) ?
                String(_this.attrs.ww.max) : null,
            match: new RegExp((_this.attrs.ww && _this.attrs.ww.match) ?
                _this.attrs.ww.match : '.'),
            length: (_this.attrs.ww && _this.attrs.ww.length) ?
                _this.attrs.ww.length : Infinity,
            placeholder: (_this.attrs.ww && _this.attrs.ww.placeholder) ?
                _this.attrs.ww.placeholder : '',
            value: (_this.attrs.ww && _this.attrs.ww.value) ?
                _this.attrs.ww.value : '',
            rows: (_this.attrs.ww && _this.attrs.ww.rows) ?
                _this.attrs.ww.rows : 1,
            disabled: (_this.attrs.ww && _this.attrs.ww.disabled === true) ?
                true : null,
            readOnly: (_this.attrs.ww && _this.attrs.ww.readOnly === true) ?
                true : null,
            onkeydown: function (e) {
                var value = e.target.value || '';
                if ((!_this.values.match.test(e.key)) ||
                    (value.length > _this.values.length))
                    e.preventDefault();
            },
            oninput: dispatchInput(_this),
            autofocus: (_this.attrs.ww && _this.attrs.ww.focus) ? true : undefined,
            onfocus: function () {
                if (_this.attrs.ww && _this.attrs.ww.onFocusGained)
                    _this.attrs.ww.onFocusGained(new focus_1.FocusGainedEvent(__2.getName(_this.attrs)));
            },
            onblur: function () {
                if (_this.attrs.ww && _this.attrs.ww.onFocusLost)
                    _this.attrs.ww.onFocusLost(new focus_1.FocusLostEvent(__2.getName(_this.attrs)));
            }
        };
        return _this;
    }
    TextInput.prototype.focus = function () {
        return focus_1.focus(this.view, this.values.control.wml.id);
    };
    return TextInput;
}(__2.AbstractControl));
exports.TextInput = TextInput;
/**
 * dispatchInput when the user inputs some text.
 */
var dispatchInput = function (i) { return function (e) {
    if (i.attrs.ww && i.attrs.ww.onChange)
        i.attrs.ww.onChange(new TextChangedEvent((i.attrs && i.attrs.ww.name) ?
            i.attrs.ww.name : '', e.target.value));
}; };
//# sourceMappingURL=index.js.map