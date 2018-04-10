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
var style = require("../../content/style");
var active = require("../../content/state/active");
var Maybe_1 = require("afpl/lib/monad/Maybe");
var util_1 = require("../../util");
var _1 = require("../");
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
}(_1.Event));
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
                class: exports.BUTTON_SELECT
            },
            buttons: {
                value: _this.attrs.ww.value,
                options: _this.attrs.ww.options,
                isActive: function (v) { return _this.values.buttons.value === v; },
                click: function (value) {
                    _this.values.buttons.value = value;
                    if (_this.attrs.ww.onChange)
                        _this.attrs.ww.onChange(new ButtonChangedEvent(_this.attrs.ww.name, value));
                    _this.view.invalidate();
                },
                getClass: function (o) {
                    return util_1.concat(exports.BUTTON_SELECT_OPTION, o.class, (_this.attrs.ww.style) ?
                        _this.attrs.ww.style :
                        style.DEFAULT, _this.values.buttons.isActive(o.value) ? active.ACTIVE : '');
                }
            }
        };
        return _this;
    }
    return ButtonSelect;
}(_1.GenericControl));
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
                class: exports.BUTTON_SELECT
            },
            buttons: {
                value: _this.attrs.ww.value || [],
                options: _this.attrs.ww.options,
                isActive: function (v) { return _this.values.buttons.value.indexOf(v) > -1; },
                click: function (v) {
                    _this.values.buttons.value =
                        Maybe_1.Maybe
                            .fromArray(_this.values.buttons.value)
                            .map(function (value) {
                            var pos = value.indexOf(v);
                            if (pos > -1)
                                value.splice(pos, 1);
                            else
                                value.push(v);
                            if (_this.attrs.ww.onChange)
                                _this.attrs.ww.onChange(new ButtonChangedEvent(_this.attrs.ww.name, value.slice()));
                            _this.view.invalidate();
                            return value;
                        })
                            .orJust(function () { return [v]; })
                            .get();
                },
                getClass: function (o) {
                    return util_1.concat(exports.BUTTON_SELECT_OPTION, o.class, (_this.attrs.ww.style) ?
                        _this.attrs.ww.style :
                        style.DEFAULT, _this.values.buttons.isActive(o.value) ? active.ACTIVE : '');
                }
            }
        };
        return _this;
    }
    return MultiButtonSelect;
}(_1.GenericControl));
exports.MultiButtonSelect = MultiButtonSelect;
//# sourceMappingURL=index.js.map