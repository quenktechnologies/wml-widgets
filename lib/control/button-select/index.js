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
exports.MultiButtonSelect = exports.ButtonSelect = exports.MultiButtonSection = exports.ButtonSection = exports.ButtonSelectValues = exports.ButtonChangedEvent = exports.BUTTON_SELECT_OPTION = exports.BUTTON_SELECT = void 0;
var util_1 = require("../../util");
var __1 = require("../../");
var __2 = require("../");
var button_select_1 = require("./wml/button-select");
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
 * @private
 */
var ButtonSelectValues = /** @class */ (function () {
    function ButtonSelectValues(ref, button) {
        this.ref = ref;
        this.button = button;
        this.id = __1.getId(this.ref.attrs);
        this.className = util_1.concat(exports.BUTTON_SELECT, __1.getClassName(this.ref.attrs));
    }
    return ButtonSelectValues;
}());
exports.ButtonSelectValues = ButtonSelectValues;
/**
 * @private
 */
var ButtonSection = /** @class */ (function () {
    function ButtonSection(ref, onClick) {
        var _this = this;
        this.ref = ref;
        this.onClick = onClick;
        this.current = getCurrent(this.ref.attrs);
        this.selected = [];
        this.options = (this.ref.attrs.ww && this.ref.attrs.ww.options) ?
            this.ref.attrs.ww.options : [];
        this.isActive = function (n) { return _this.ref.values.button.current === n; };
        this.getClassNames = function (n) {
            return util_1.concat(exports.BUTTON_SELECT_OPTION, _this.ref.values.button.options[n].className);
        };
    }
    return ButtonSection;
}());
exports.ButtonSection = ButtonSection;
/**
 * @private
 */
var MultiButtonSection = /** @class */ (function (_super) {
    __extends(MultiButtonSection, _super);
    function MultiButtonSection(ref, onClick) {
        var _this = _super.call(this, ref, onClick) || this;
        _this.ref = ref;
        _this.onClick = onClick;
        _this.selected = getSelected(_this.ref);
        _this.isActive = function (n) { return _this.ref.values.button.selected.indexOf(n) > -1; };
        return _this;
    }
    return MultiButtonSection;
}(ButtonSection));
exports.MultiButtonSection = MultiButtonSection;
/**
 * ButtonSelect
 */
var ButtonSelect = /** @class */ (function (_super) {
    __extends(ButtonSelect, _super);
    function ButtonSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new button_select_1.ButtonSelectView(_this);
        _this.values = new ButtonSelectValues(_this, new ButtonSection(_this, function (idx) {
            _this.values.button.current = idx;
            if ((_this.attrs.ww && _this.attrs.ww.onChange))
                _this.attrs.ww.onChange(new ButtonChangedEvent(_this.attrs.ww.name, _this.values.button.options[idx].value));
            _this.view.invalidate();
        }));
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
        _this.view = new button_select_1.ButtonSelectView(_this);
        _this.values = new ButtonSelectValues(_this, new MultiButtonSection(_this, function (n) {
            var selected = _this.values.button.selected;
            var pos = selected.indexOf(n);
            if (pos > -1)
                selected.splice(pos, 1);
            else
                selected.push(n);
            if (_this.attrs.ww && _this.attrs.ww.onChange)
                _this.attrs.ww.onChange(new ButtonChangedEvent(_this.attrs.ww.name, selected.map(function (n) { return _this.values.button.options[n].value; })));
            _this.view.invalidate();
        }));
        return _this;
    }
    return MultiButtonSelect;
}(__2.AbstractControl));
exports.MultiButtonSelect = MultiButtonSelect;
var getCurrent = function (attrs) {
    if ((attrs.ww != null) &&
        (attrs.ww.value != null) &&
        (attrs.ww.options != null)) {
        return attrs.ww.options.reduce(function (p, c, k) {
            return c.value ===
                attrs.ww.value ? k : p;
        }, -1);
    }
    return -1;
};
var getSelected = function (that) {
    if (that.attrs &&
        that.attrs.ww &&
        that.attrs.ww.value &&
        that.attrs.ww.options) {
        var _a = that.attrs.ww, value = _a.value, options_1 = _a.options;
        return value.map(function (v) { return options_1.reduce(function (p, c, i) {
            return (p > -1) ? p : (c.value === v) ? i : p;
        }, -1); });
    }
    else {
        return [];
    }
};
//# sourceMappingURL=index.js.map