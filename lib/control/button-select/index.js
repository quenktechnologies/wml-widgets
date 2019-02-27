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
var views = require("./wml/button-select");
var style_1 = require("../../content/style");
var util_1 = require("../../util");
var __1 = require("../../");
var __2 = require("../");
///className:begin
exports.BUTTON_SELECT = 'ww-button-select';
exports.BUTTON_SELECT_OPTION = 'ww-button-select__option';
/**
 * ButtonChangedEvent
 */
var ButtonChangedEvent = /** @class */ (function (_super) {
    __extends(ButtonChangedEvent, _super);
    function ButtonChangedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ButtonChangedEvent;
}(__2.Event));
exports.ButtonChangedEvent = ButtonChangedEvent;
/**
 * ButtonSelect
 */
var ButtonSelect = /** @class */ (function (_super) {
    __extends(ButtonSelect, _super);
    function ButtonSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.BUTTON_SELECT, __1.getClassName(_this.attrs))
            },
            buttons: {
                current: -1,
                options: (_this.attrs.ww && _this.attrs.ww.options) ?
                    _this.attrs.ww.options : [],
                click: function (idx) {
                    _this.values.buttons.current = idx;
                    if ((_this.attrs.ww && _this.attrs.ww.onChange))
                        _this.attrs.ww.onChange(new ButtonChangedEvent(_this.attrs.ww.name, _this.values.buttons.options[idx].value));
                    _this.view.invalidate();
                },
                getStyle: function () { return (_this.attrs.ww && _this.attrs.ww.style) ?
                    _this.attrs.ww.style : style_1.Style.Default; },
                getActive: function (n) { return _this.values.buttons.current === n; },
                getClassNames: function (n) {
                    return util_1.concat(exports.BUTTON_SELECT_OPTION, _this.values.buttons.options[n].className);
                }
            }
        };
        return _this;
    }
    return ButtonSelect;
}(__2.AbstractControl));
exports.ButtonSelect = ButtonSelect;
/**
 * MultiButtonSelect
 */
var MultiButtonSelect = /** @class */ (function (_super) {
    __extends(MultiButtonSelect, _super);
    function MultiButtonSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.BUTTON_SELECT, __1.getClassName(_this.attrs))
            },
            buttons: {
                values: [],
                options: (_this.attrs.ww && _this.attrs.ww.options) ?
                    _this.attrs.ww.options : [],
                click: function (n) {
                    var values = _this.values.buttons.values;
                    var pos = values.indexOf(n);
                    if (pos > -1)
                        values.splice(pos, 1);
                    else
                        values.push(n);
                    if (_this.attrs.ww && _this.attrs.ww.onChange)
                        _this.attrs.ww.onChange(new ButtonChangedEvent(_this.attrs.ww.name, values.map(function (n) { return _this.values.buttons.options[n].value; })));
                    _this.view.invalidate();
                },
                getStyle: function () { return (_this.attrs.ww && _this.attrs.ww.style) ?
                    _this.attrs.ww.style : style_1.Style.Default; },
                getActive: function (n) { return _this.values.buttons.values.indexOf(n) > -1; },
                getClassNames: function (n) {
                    return util_1.concat(exports.BUTTON_SELECT_OPTION, _this.values.buttons.options[n].className);
                }
            }
        };
        return _this;
    }
    return MultiButtonSelect;
}(__2.AbstractControl));
exports.MultiButtonSelect = MultiButtonSelect;
//# sourceMappingURL=index.js.map