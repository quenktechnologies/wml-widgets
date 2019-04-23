import * as views from './wml/meter';
import { View, Component } from '@quenk/wml';
import { concat } from '../../util';
import {
    HTMLElementAttrs,
    WidgetAttrs,
    getId,
    getClassName
} from '../../';

///classNames:begin
export const METER = 'ww-meter';
export const METER_BAR = 'ww-meter__bar';
///classNames:end

/**
 * MeterAttrs
 */
export interface MeterAttrs extends HTMLElementAttrs { }

/**
 * Meter
 */
export class Meter extends Component<WidgetAttrs<MeterAttrs>> {

    view: View = new views.Meter(this);

    values = {

        id: getId(this.attrs),

        className: concat(METER, getClassName(this.attrs))

    }

}

/**
 * MeterBarAttrs
 */
export interface MeterBarAttrs extends HTMLElementAttrs {

    /**
     * value
     */
    value: number,

    /**
     * color
     */
    color: string

}

/**
 * MeterBar
 */
export class MeterBar extends Component<WidgetAttrs<MeterBarAttrs>> {

    view: View = new views.MeterBar(this);

    values = {

        id: getId(this.attrs),

        className: concat(METER_BAR, getClassName(this.attrs)),

        value: (this.attrs.ww && this.attrs.ww.value) ?
            this.attrs.ww.value : 0,

        color: (this.attrs.ww && this.attrs.ww.color) ?
            this.attrs.ww.color : '',

        style: () => {

            let list: string[] = [];

            if (this.values.color)
                list.push(`background-color:${this.values.color}`);

            if (this.values.value)
                list.push(`width:${this.values.value}%`);

            return list.join(';');

        }

    }

    /**
     * setValue sets the value of the MeterBar.
     */
    setValue(value: number): MeterBar {

        this.values.value = value;
        this.view.invalidate();
        return this;

    }

    /**
     * increase the value by the specified amount.
     */
    increase(value: number): MeterBar {

        this.values.value = this.values.value + value;
        this.view.invalidate();
        return this;

    }

    /**
     * decrease the value by the specified amount.
     */
    decrease(value: number): MeterBar {

        this.values.value = this.values.value - value;
        this.view.invalidate();
        return this;

    }

    /**
     * setColor of the MeterBar.
     */
    setColor(color: string): MeterBar {

        this.values.color = color;
        this.view.invalidate();
        return this;

    }

}
