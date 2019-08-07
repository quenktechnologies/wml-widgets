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
var views = require("./wml/meter");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var __1 = require("../../");
///classNames:begin
exports.METER = 'ww-meter';
exports.METER_BAR = 'ww-meter__bar';
/**
 * Meter
 */
var Meter = /** @class */ (function (_super) {
    __extends(Meter, _super);
    function Meter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Meter(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.METER, __1.getClassName(_this.attrs))
        };
        return _this;
    }
    return Meter;
}(wml_1.Component));
exports.Meter = Meter;
/**
 * MeterBar
 */
var MeterBar = /** @class */ (function (_super) {
    __extends(MeterBar, _super);
    function MeterBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.MeterBar(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.METER_BAR, __1.getClassName(_this.attrs)),
            value: (_this.attrs.ww && _this.attrs.ww.value) ?
                _this.attrs.ww.value : 0,
            color: (_this.attrs.ww && _this.attrs.ww.color) ?
                _this.attrs.ww.color : '',
            style: function () {
                var list = [];
                if (_this.values.color)
                    list.push("background-color:" + _this.values.color);
                if (_this.values.value)
                    list.push("width:" + _this.values.value + "%");
                return list.join(';');
            }
        };
        return _this;
    }
    /**
     * setValue sets the value of the MeterBar.
     */
    MeterBar.prototype.setValue = function (value) {
        this.values.value = value;
        this.view.invalidate();
        return this;
    };
    /**
     * increase the value by the specified amount.
     */
    MeterBar.prototype.increase = function (value) {
        this.values.value = this.values.value + value;
        this.view.invalidate();
        return this;
    };
    /**
     * decrease the value by the specified amount.
     */
    MeterBar.prototype.decrease = function (value) {
        this.values.value = this.values.value - value;
        this.view.invalidate();
        return this;
    };
    /**
     * setColor of the MeterBar.
     */
    MeterBar.prototype.setColor = function (color) {
        this.values.color = color;
        this.view.invalidate();
        return this;
    };
    return MeterBar;
}(wml_1.Component));
exports.MeterBar = MeterBar;
//# sourceMappingURL=index.js.map