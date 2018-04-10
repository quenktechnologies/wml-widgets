import * as views from './wml/button-select';
import * as style from '../../content/style';
import * as active from '../../content/state/active';
import { View } from '@quenk/wml';
import { Maybe } from 'afpl/lib/monad/Maybe';
import { concat } from '../../util';
import { ControlAttrs, Event, GenericControl } from '../';

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
     * title displayed for the button.
     */
    title: string,

    /**
     * class allows for a class name to specified on the rendered button.
     */
    class?: string

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
    style?: string,

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
             * class of the root element.
             */
            class: string

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
             * isActive tests whether an option's button
             * should be displayed active or not.
             */
            isActive: (v: V) => boolean,

            /**
             * click is applied to the value of an option's value when 
             * it is clicked by the user.
             */
            click: (v: V) => void,

            /**
             * getClass for an options' button.
             */
            getClass: (opt: Option<V>) => string

        }

    }

}

/**
 * ButtonSelect
 */
export class ButtonSelect<V> extends GenericControl<V, ButtonSelectAttrs<V, V>>
    implements ButtonSelectInterface<V> {

    view: View = new views.Main(this);

    values = {

        root: {

            class: BUTTON_SELECT

        },
        buttons: {

            value: this.attrs.ww.value,

            options: this.attrs.ww.options,

            isActive: (v: V) => this.values.buttons.value === v,

            click: (value: V) => {

                this.values.buttons.value = value;

                if (this.attrs.ww.onChange)
                    this.attrs.ww.onChange(new ButtonChangedEvent(this.attrs.ww.name, value));

                this.view.invalidate();

            },
            getClass: (o: Option<V>) =>
                concat(BUTTON_SELECT_OPTION, o.class, (this.attrs.ww.style) ?
                    this.attrs.ww.style :
                    style.DEFAULT, this.values.buttons.isActive(o.value) ? active.ACTIVE : '')

        }

    }

}

/**
 * MultiButtonSelect
 */
export class MultiButtonSelect<V>
    extends GenericControl<V[], ButtonSelectAttrs<V, V[]>>
    implements ButtonSelectInterface<V> {

    view: View = new views.Main(this);

    values = {

        root: {

            class: BUTTON_SELECT

        },
        buttons: {

            value: this.attrs.ww.value || [],

            options: this.attrs.ww.options,

            isActive: (v: V) => this.values.buttons.value.indexOf(v) > -1,

            click: (v: V) => {

                this.values.buttons.value =
                    Maybe
                        .fromArray(this.values.buttons.value)
                        .map(value => {

                            let pos = value.indexOf(v);

                            if (pos > -1)
                                value.splice(pos, 1);
                            else
                                value.push(v);

                            if (this.attrs.ww.onChange)
                                this.attrs.ww.onChange(
                                    new ButtonChangedEvent(this.attrs.ww.name, value.slice()));

                            this.view.invalidate();

                            return value;

                        })
                        .orJust(() => [v])
                        .get();

            },
            getClass: (o: Option<V>) =>
                concat(BUTTON_SELECT_OPTION, o.class, (this.attrs.ww.style) ?
                    this.attrs.ww.style :
                    style.DEFAULT, this.values.buttons.isActive(o.value) ? active.ACTIVE : '')

        }

    }

}
