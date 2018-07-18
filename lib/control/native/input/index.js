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
var views = require("./wml/input");
var util_1 = require("../../../util");
var _1 = require("../../");
///classNames:begin
exports.NATIVE_INPUT = 'ww-native-input';
/**
 * TextChangedEvent
 */
var TextChangedEvent = /** @class */ (function (_super) {
    __extends(TextChangedEvent, _super);
    function TextChangedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TextChangedEvent;
}(_1.Event));
exports.TextChangedEvent = TextChangedEvent;
/**
 * Values available to the Input's views.
 */
var Values = /** @class */ (function () {
    function Values(self, id, className, name, type, placeholder, value, disabled, readOnly, oninput) {
        if (id === void 0) { id = 'root'; }
        if (className === void 0) { className = util_1.concat(exports.NATIVE_INPUT, self.attrs.ww.class); }
        if (name === void 0) { name = (self.attrs.ww && self.attrs.ww.name) ? self.attrs.ww.name : ''; }
        if (type === void 0) { type = (self.attrs.ww && self.attrs.ww.type) ? self.attrs.ww.type : 'text'; }
        if (placeholder === void 0) { placeholder = (self.attrs.ww && self.attrs.ww.placeholder) ?
            self.attrs.ww.placeholder : ''; }
        if (value === void 0) { value = (self.attrs.ww && self.attrs.ww.value) ?
            self.attrs.ww.value : ''; }
        if (disabled === void 0) { disabled = (self.attrs.ww && self.attrs.ww.disabled === true) ?
            true : null; }
        if (readOnly === void 0) { readOnly = (self.attrs.ww && self.attrs.ww.readOnly === true) ?
            true : null; }
        if (oninput === void 0) { oninput = exports.dispatchInput(self); }
        this.self = self;
        this.id = id;
        this.className = className;
        this.name = name;
        this.type = type;
        this.placeholder = placeholder;
        this.value = value;
        this.disabled = disabled;
        this.readOnly = readOnly;
        this.oninput = oninput;
    }
    return Values;
}());
exports.Values = Values;
/**
 * Input provides a wrapped native text input control.
 */
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = new Values(_this);
        return _this;
    }
    return Input;
}(_1.GenericControl));
exports.Input = Input;
/**
 * dispatchInput when the user inputs some text.
 */
exports.dispatchInput = function (i) { return function (e) {
    if (i.attrs.ww && i.attrs.ww.onChange)
        i.attrs.ww.onChange(new TextChangedEvent(i.attrs.ww.name, e.target.value));
}; };
//# sourceMappingURL=index.js.map