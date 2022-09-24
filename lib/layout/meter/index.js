"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeterBar = exports.Meter = exports.METER_BAR = exports.METER = void 0;
const views = require("./wml/meter");
const wml_1 = require("@quenk/wml");
const util_1 = require("../../util");
const __1 = require("../../");
///classNames:begin
exports.METER = 'ww-meter';
exports.METER_BAR = 'ww-meter__bar';
/**
 * Meter
 */
class Meter extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.Meter(this);
        this.values = {
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.METER, (0, __1.getClassName)(this.attrs))
        };
    }
}
exports.Meter = Meter;
/**
 * MeterBar
 */
class MeterBar extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.MeterBar(this);
        this.values = {
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.METER_BAR, (0, __1.getClassName)(this.attrs)),
            value: (this.attrs && this.attrs.value) ?
                this.attrs.value : 0,
            color: (this.attrs && this.attrs.color) ?
                this.attrs.color : '',
            style: () => {
                let list = [];
                if (this.values.color)
                    list.push(`background-color:${this.values.color}`);
                if (this.values.value)
                    list.push(`width:${this.values.value}%`);
                return list.join(';');
            }
        };
    }
    /**
     * setValue sets the value of the MeterBar.
     */
    setValue(value) {
        this.values.value = value;
        this.view.invalidate();
        return this;
    }
    /**
     * increase the value by the specified amount.
     */
    increase(value) {
        this.values.value = this.values.value + value;
        this.view.invalidate();
        return this;
    }
    /**
     * decrease the value by the specified amount.
     */
    decrease(value) {
        this.values.value = this.values.value - value;
        this.view.invalidate();
        return this;
    }
    /**
     * setColor of the MeterBar.
     */
    setColor(color) {
        this.values.color = color;
        this.view.invalidate();
        return this;
    }
}
exports.MeterBar = MeterBar;
//# sourceMappingURL=index.js.map