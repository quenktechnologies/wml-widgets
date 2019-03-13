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
var views = require("./wml/text-input");
var util_1 = require("../../util");
var orientation_1 = require("../../content/orientation");
var size_1 = require("../../content/size");
var feedback_1 = require("../feedback");
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
            messages: {
                wml: {
                    id: '<N/A>'
                }
            },
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.TEXT_INPUT, __1.getClassName(_this.attrs), (_this.attrs.ww && _this.attrs.ww.size) ?
                size_1.getSizeClassName(_this.attrs.ww.size) : '', (_this.attrs.ww && _this.attrs.ww.validationState) ?
                feedback_1.getValidationStateClassName(_this.attrs.ww.validationState) : '', (_this.attrs.ww && _this.attrs.ww.block) ?
                orientation_1.BLOCK : ''),
            name: __2.getName(_this.attrs),
            type: (_this.attrs.ww && _this.attrs.ww.type) ?
                _this.attrs.ww.type : 'text',
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
            oninput: dispatchInput(_this)
        };
        return _this;
    }
    return TextInput;
}(feedback_1.AbstractFeedbackControl));
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