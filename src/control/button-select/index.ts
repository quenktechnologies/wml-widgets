import * as views from './wml/button-select';
import { View } from '@quenk/wml';
import { Style } from '../../content/style';
import { concat } from '../../util';
import { getId, getClassName, WidgetAttrs } from '../../';
import { ControlAttrs, Event, AbstractControl } from '../';

///className:begin
export const BUTTON_SELECT = 'ww-button-select';
export const BUTTON_SELECT_OPTION = 'ww-button-select__option';
///className:end

/**
 * Option provides the information for rendering button select options.
 */
export interface Option<V> {

    /**
     * value provided when the option's button has been clicked.
     */
    value: V,

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
export interface ButtonSelectAttrs<O, V> extends ControlAttrs<V> {

    /**
     * options to display
     */
    options: Option<O>[],

    /**
     * style in style to use.
     */
    style?: Style,

    /**
     * onChange handler.
     */
    onChange?: (e: ButtonChangedEvent<V>) => void

}

/**
 * ButtonChangedEvent
 */
export class ButtonChangedEvent<V> extends Event<V>{ }

/**
 * ButtonSelectInterface 
 */
export interface ButtonSelectInterface<V> {

    /**
     * values available to the View's template.
     */
    values: {

        /**
         * root element values.
         */
        root: {

            /**
             * id of the root element
             */
            id: string,

            /**
             * className of the root element.
             */
            className: string

        },

        /**
         * buttons values.
         */
        buttons: {

            /**
             * options used to display the buttons
             */
            options: Option<V>[],

            /**            
             * click is applied to the value of an option's value when 
             * it is clicked by the user.
             */
            click: (n: number) => void,

            /**
             * getClassNames for an options' button.
             */
            getClassNames: (n: number) => string

            /**
             * getStyle
             */
            getStyle: () => Style,

            /**
             * getActive
             */
            getActive: (n: number) => boolean

        }

    }

}

/**
 * ButtonSelect
 */
export class ButtonSelect<V>
    extends
    AbstractControl<V, ButtonSelectAttrs<V, V>> {

    view: View = new views.Main(this);

    values = {

        root: {

            id: getId(this.attrs),

            className: concat(BUTTON_SELECT, getClassName(this.attrs))

        },
        buttons: {

            current: getCurrent(this.attrs),

            options: (this.attrs.ww && this.attrs.ww.options) ?
                this.attrs.ww.options : [],

            click: (idx: number) => {

                this.values.buttons.current = idx;

                if ((this.attrs.ww && this.attrs.ww.onChange))
                    this.attrs.ww.onChange(
                        new ButtonChangedEvent(<string>this.attrs.ww.name,
                            this.values.buttons.options[idx].value));

                this.view.invalidate();

            },
            getStyle: () => (this.attrs.ww && this.attrs.ww.style) ?
                this.attrs.ww.style : Style.Default,

            getActive: (n: number) => this.values.buttons.current === n,

            getClassNames: (n: number) =>
                concat(BUTTON_SELECT_OPTION,
                    <string>this.values.buttons.options[n].className)

        }

    }

}

/**
 * MultiButtonSelect
 */
export class MultiButtonSelect<V>
    extends AbstractControl<V[], ButtonSelectAttrs<V, V[]>> {

    view: View = new views.Main(this);

    values = {

        root: {

            id: getId(this.attrs),

            className: concat(BUTTON_SELECT, getClassName(this.attrs))

        },
        buttons: {

            values: <number[]>[],

            options: (this.attrs.ww && this.attrs.ww.options) ?
                this.attrs.ww.options : [],


            click: (n: number) => {

                let values = this.values.buttons.values;
                let pos = values.indexOf(n);

                if (pos > -1)
                    values.splice(pos, 1);
                else
                    values.push(n);

                if (this.attrs.ww && this.attrs.ww.onChange)
                    this.attrs.ww.onChange(new ButtonChangedEvent(
                        <string>this.attrs.ww.name,
                        values.map(n => this.values.buttons.options[n].value)));

                this.view.invalidate();

            },

            getStyle: () => (this.attrs.ww && this.attrs.ww.style) ?
                this.attrs.ww.style : Style.Default,

            getActive: (n: number) => this.values.buttons.values.indexOf(n) > -1,

            getClassNames: (n: number) =>
                concat(BUTTON_SELECT_OPTION,
                    <string>this.values.buttons.options[n].className)

        }

    }

}

const getCurrent = <V>(attrs: WidgetAttrs<ButtonSelectAttrs<V, V>>) => {

    if ((attrs.ww != null) &&
        (attrs.ww.value != null) &&
        (attrs.ww.options != null)) {

        return attrs.ww.options.reduce((p, c, k) =>
            c.value === (<{ value: V }>attrs.ww).value ? k : p, -1);

    }

    return -1;

}
