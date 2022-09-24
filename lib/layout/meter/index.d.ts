import { View, Component } from '@quenk/wml';
import { HTMLElementAttrs } from '../../';
export declare const METER = "ww-meter";
export declare const METER_BAR = "ww-meter__bar";
/**
 * MeterAttrs
 */
export interface MeterAttrs extends HTMLElementAttrs {
}
/**
 * Meter
 */
export declare class Meter extends Component<MeterAttrs> {
    view: View;
    values: {
        id: string;
        className: string;
    };
}
/**
 * MeterBarAttrs
 */
export interface MeterBarAttrs extends HTMLElementAttrs {
    /**
     * value
     */
    value: number;
    /**
     * color
     */
    color: string;
}
/**
 * MeterBar
 */
export declare class MeterBar extends Component<MeterBarAttrs> {
    view: View;
    values: {
        id: string;
        className: string;
        value: number;
        color: string;
        style: () => string;
    };
    /**
     * setValue sets the value of the MeterBar.
     */
    setValue(value: number): MeterBar;
    /**
     * increase the value by the specified amount.
     */
    increase(value: number): MeterBar;
    /**
     * decrease the value by the specified amount.
     */
    decrease(value: number): MeterBar;
    /**
     * setColor of the MeterBar.
     */
    setColor(color: string): MeterBar;
}
