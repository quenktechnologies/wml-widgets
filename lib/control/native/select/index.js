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
var util_1 = require("../../../util");
var _1 = require("../../");
///classNames:begin
exports.NATIVE_SELECT = 'ww-native-select';
/**
 * SelectionChangedEvent indicates the user's selection
 * has changed.
 */
var SelectionChangedEvent = /** @class */ (function (_super) {
    __extends(SelectionChangedEvent, _super);
    function SelectionChangedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SelectionChangedEvent;
}(_1.Event));
exports.SelectionChangedEvent = SelectionChangedEvent;
/**
 * Values available to the Select's view.
 */
var Values = /** @class */ (function () {
    function Values(self, options, onchange, selected, className, instruction) {
        if (onchange === void 0) { onchange = exports.dispatchChange(self); }
        if (selected === void 0) { selected = -1; }
        if (className === void 0) { className = util_1.concat(exports.NATIVE_SELECT, self.attrs.ww.class); }
        if (instruction === void 0) { instruction = 'Select one.'; }
        this.self = self;
        this.options = options;
        this.onchange = onchange;
        this.selected = selected;
        this.className = className;
        this.instruction = instruction;
    }
    return Values;
}());
exports.Values = Values;
/**
 * Select provides a native <select> element with it's
 * event(s) converted to control events.
 */
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = new Values(_this, _this.attrs.ww.options);
        return _this;
    }
    return Select;
}(_1.GenericControl));
exports.Select = Select;
/**
 * dispatchChange when the selected item changes.
 */
exports.dispatchChange = function (self) { return function (e) {
    var value = Number(e.target.value);
    if (self.attrs.ww && self.attrs.ww.onChange)
        self.attrs.ww.onChange(new SelectionChangedEvent(self.attrs.ww.name, self.values.options[value].value));
    self.values.selected = value;
}; };
//# sourceMappingURL=index.js.map