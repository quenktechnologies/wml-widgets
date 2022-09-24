import { View } from '@quenk/wml';
import { ControlAttrs, Event, AbstractControl } from '../';
export declare const BUTTON_SELECT = "ww-button-select";
export declare const BUTTON_SELECT_OPTION = "ww-button-select__option";
/**
 * Option provides the information for rendering button select options.
 */
export interface Option<T> {
    /**
     * value provided when the option's button has been clicked.
     */
    value: T;
    /**
     * text displayed for the button.
     */
    text: string;
    /**
     * className to add to the rendered button.
     */
    className?: string;
}
/**
 * ButtonSelectAttrs
 */
export interface ButtonSelectAttrs<TOption, TValue> extends ControlAttrs<TValue> {
    /**
     * options to display
     */
    options: Option<TOption>[];
    /**
     * onChange handler.
     */
    onChange?: (e: ButtonChangedEvent<TValue>) => void;
}
/**
 * @private
 */
export interface ButtonSelectWidget<TOption, TValue> {
    attrs: ButtonSelectAttrs<TOption, TValue>;
    values: {
        id: string;
        className: string;
        button: ButtonSection<TOption, TValue>;
    };
}
/**
 * ButtonChangedEvent
 */
export declare class ButtonChangedEvent<V> extends Event<V> {
}
/**
 * @private
 */
export declare class ButtonSelectValues<TOption, TValue> {
    ref: ButtonSelectWidget<TOption, TValue>;
    button: ButtonSection<TOption, TValue>;
    constructor(ref: ButtonSelectWidget<TOption, TValue>, button: ButtonSection<TOption, TValue>);
    id: string;
    className: string;
}
/**
 * @private
 */
export declare class ButtonSection<TOption, TValue> {
    ref: ButtonSelectWidget<TOption, TValue>;
    onClick: (idx: number) => void;
    constructor(ref: ButtonSelectWidget<TOption, TValue>, onClick: (idx: number) => void);
    current: number;
    selected: number[];
    options: Option<TOption>[];
    isActive: (n: number) => boolean;
    getClassNames: (n: number) => string;
}
/**
 * @private
 */
export declare class MultiButtonSection<V> extends ButtonSection<V, V[]> {
    ref: MultiButtonSelect<V>;
    onClick: (idx: number) => void;
    constructor(ref: MultiButtonSelect<V>, onClick: (idx: number) => void);
    selected: number[];
    isActive: (n: number) => boolean;
}
/**
 * ButtonSelect
 */
export declare class ButtonSelect<V> extends AbstractControl<V, ButtonSelectAttrs<V, V>> {
    view: View;
    values: ButtonSelectValues<V, V>;
}
/**
 * MultiButtonSelect
 */
export declare class MultiButtonSelect<V> extends AbstractControl<V[], ButtonSelectAttrs<V, V[]>> {
    view: View;
    values: ButtonSelectValues<V, V[]>;
}
