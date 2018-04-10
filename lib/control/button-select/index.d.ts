import { View } from '@quenk/wml';
import { ControlAttrs, Event, GenericControl } from '../';
export declare const BUTTON_SELECT = "ww-button-select";
export declare const BUTTON_SELECT_OPTION = "ww-button-select__option";
/**
 * Option provides the information for rendering button select options.
 */
export interface Option<V> {
    /**
     * value provided when the option's button has been clicked.
     */
    value: V;
    /**
     * title displayed for the button.
     */
    title: string;
    /**
     * class allows for a class name to specified on the rendered button.
     */
    class?: string;
}
/**
 * ButtonSelectAttrs
 */
export interface ButtonSelectAttrs<O, V> extends ControlAttrs<V> {
    /**
     * options to display
     */
    options: Option<O>[];
    /**
     * style in style to use.
     */
    style?: string;
    /**
     * onChange handler.
     */
    onChange?: (e: ButtonChangedEvent<V>) => void;
}
/**
 * ButtonChangedEvent
 */
export declare class ButtonChangedEvent<V> extends Event<V> {
}
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
            class: string;
        };
        /**
         * buttons values.
         */
        buttons: {
            /**
             * options used to display the buttons
             */
            options: Option<V>[];
            /**
             * isActive tests whether an option's button
             * should be displayed active or not.
             */
            isActive: (v: V) => boolean;
            /**
             * click is applied to the value of an option's value when
             * it is clicked by the user.
             */
            click: (v: V) => void;
            /**
             * getClass for an options' button.
             */
            getClass: (opt: Option<V>) => string;
        };
    };
}
/**
 * ButtonSelect
 */
export declare class ButtonSelect<V> extends GenericControl<V, ButtonSelectAttrs<V, V>> implements ButtonSelectInterface<V> {
    view: View;
    values: {
        root: {
            class: string;
        };
        buttons: {
            value: V;
            options: Option<V>[];
            isActive: (v: V) => boolean;
            click: (value: V) => void;
            getClass: (o: Option<V>) => string;
        };
    };
}
/**
 * MultiButtonSelect
 */
export declare class MultiButtonSelect<V> extends GenericControl<V[], ButtonSelectAttrs<V, V[]>> implements ButtonSelectInterface<V> {
    view: View;
    values: {
        root: {
            class: string;
        };
        buttons: {
            value: V[];
            options: Option<V>[];
            isActive: (v: V) => boolean;
            click: (v: V) => void;
            getClass: (o: Option<V>) => string;
        };
    };
}
