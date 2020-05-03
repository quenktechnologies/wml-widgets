
import { View } from '@quenk/wml';

import { concat } from '../../util';
import { getId, getClassName, WidgetAttrs } from '../../';
import { ControlAttrs, Event, AbstractControl } from '../';
import { ButtonSelectView } from './wml/button-select';

///className:begin
export const BUTTON_SELECT = 'ww-button-select';
export const BUTTON_SELECT_OPTION = 'ww-button-select__option';
///className:end

/**
 * Option provides the information for rendering button select options.
 */
export interface Option<T> {

    /**
     * value provided when the option's button has been clicked.
     */
    value: T,

    /**
     * text displayed for the button.
     */
    text: string,

    /**
     * className to add to the rendered button.
     */
    className?: string

}

/**
 * ButtonSelectAttrs
 */
export interface ButtonSelectAttrs<TOption, TValue>
    extends
    ControlAttrs<TValue> {

    /**
     * options to display
     */
    options: Option<TOption>[],

    /**
     * onChange handler.
     */
    onChange?: (e: ButtonChangedEvent<TValue>) => void

}

/**
 * @private
 */
export interface ButtonSelectWidget<TOption, TValue> {

    attrs: WidgetAttrs<ButtonSelectAttrs<TOption, TValue>>,

    values: {

        id: string,

        className: string,

        button: ButtonSection<TOption, TValue>

    }

}

/**
 * ButtonChangedEvent
 */
export class ButtonChangedEvent<V> extends Event<V>{ }

/**
 * @private
 */
export class ButtonSelectValues<TOption, TValue> {

    constructor(
        public ref: ButtonSelectWidget<TOption, TValue>,
        public button: ButtonSection<TOption, TValue>) { }

    id = getId(this.ref.attrs);

    className = concat(BUTTON_SELECT, getClassName(this.ref.attrs));

}

/**
 * @private
 */
export class ButtonSection<TOption, TValue> {

    constructor(
        public ref: ButtonSelectWidget<TOption, TValue>,
        public onClick: (idx: number) => void) { }

    current = getCurrent(this.ref.attrs);

    selected = <number[]>[];

    options = (this.ref.attrs.ww && this.ref.attrs.ww.options) ?
        this.ref.attrs.ww.options : [];

    isActive = (n: number) => this.ref.values.button.current === n;

    getClassNames = (n: number) =>
        concat(BUTTON_SELECT_OPTION,
            <string>this.ref.values.button.options[n].className);

}

/**
 * @private
 */
export class MultiButtonSection<V>
    extends
    ButtonSection<V, V[]> {

    constructor(
        public ref: MultiButtonSelect<V>,
        public onClick: (idx: number) => void) { super(ref, onClick); }

    selected = getSelected(this.ref);

    isActive = (n: number) => this.ref.values.button.selected.indexOf(n) > -1;

}

/**
 * ButtonSelect
 */
export class ButtonSelect<V>
    extends
    AbstractControl<V, ButtonSelectAttrs<V, V>> {

    view: View = new ButtonSelectView(this);

    values: ButtonSelectValues<V, V> = new ButtonSelectValues(this,
        new ButtonSection(this, (idx: number) => {

            this.values.button.current = idx;

            if ((this.attrs.ww && this.attrs.ww.onChange))
                this.attrs.ww.onChange(
                    new ButtonChangedEvent(<string>this.attrs.ww.name,
                        this.values.button.options[idx].value));

            this.view.invalidate();

        }));

}

/**
 * MultiButtonSelect
 */
export class MultiButtonSelect<V>
    extends
    AbstractControl<V[], ButtonSelectAttrs<V, V[]>> {

    view: View = new ButtonSelectView(this);

    values: ButtonSelectValues<V, V[]> = new ButtonSelectValues(this,
        new MultiButtonSection(this, (n: number) => {

            let selected = this.values.button.selected;
            let pos = selected.indexOf(n);

            if (pos > -1)
                selected.splice(pos, 1);
            else
                selected.push(n);

            if (this.attrs.ww && this.attrs.ww.onChange)
                this.attrs.ww.onChange(new ButtonChangedEvent(
                    <string>this.attrs.ww.name,
                    selected.map(n => this.values.button.options[n].value)));

            this.view.invalidate();

        }));

}

const getCurrent = <TOption, TValue>
    (attrs: WidgetAttrs<ButtonSelectAttrs<TOption, TValue>>) => {

    if ((attrs.ww != null) &&
        (attrs.ww.value != null) &&
        (attrs.ww.options != null)) {

        return attrs.ww.options.reduce((p, c, k) =>
            (<TValue><unknown>c.value) ===
                (<{ value: TValue }>attrs.ww).value ? k : p, -1);

    }

    return -1;

}

const getSelected = <V>(that: MultiButtonSelect<V>): number[] => {

    if (that.attrs &&
        that.attrs.ww &&
        that.attrs.ww.value &&
        that.attrs.ww.options) {

        let { value, options } = that.attrs.ww;

        return value.map(v => options.reduce((p, c, i) =>
            (p > -1) ? p : (c.value === v) ? i : p, -1));

    } else {

        return [];

    }

}
