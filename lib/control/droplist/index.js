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
var views = require("./wml/droplist");
var util_1 = require("../../util");
var size_1 = require("../../content/size");
var orientation_1 = require("../../content/orientation");
var __1 = require("../../");
var feedback_1 = require("../feedback");
var __2 = require("../");
///classNames:begin
exports.DROPLIST = 'ww-droplist';
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
}(__2.Event));
exports.SelectionChangedEvent = SelectionChangedEvent;
/**
 * Droplist provides a native <select> element with it's
 * event(s) converted to control events.
 */
var Droplist = /** @class */ (function (_super) {
    __extends(Droplist, _super);
    function Droplist() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            control: {
                wml: {
                    id: 'select'
                }
            },
            messages: {
                wml: {
                    id: 'messages'
                }
            },
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.DROPLIST, __1.getClassName(_this.attrs), (_this.attrs.ww && _this.attrs.ww.size) ?
                size_1.getSizeClassName(_this.attrs.ww.size) : '', (_this.attrs.ww && _this.attrs.ww.block) ?
                orientation_1.BLOCK : ''),
            name: __2.getName(_this.attrs),
            options: (_this.attrs.ww && _this.attrs.ww.options) ?
                _this.attrs.ww.options : [],
            onchange: function (e) { dispatchChange(_this, e); },
            selected: -1,
            instruction: 'Select one.'
        };
        return _this;
    }
    return Droplist;
}(feedback_1.AbstractFeedbackControl));
exports.Droplist = Droplist;
var dispatchChange = function (self, e) {
    var value = Number(e.target.value);
    if (self.attrs.ww && self.attrs.ww.onChange)
        self.attrs.ww.onChange(new SelectionChangedEvent((self.attrs.ww && self.attrs.ww.name) ? self.attrs.ww.name : '', self.values.options[value].value));
    self.values.selected = value;
};
//# sourceMappingURL=index.js.map