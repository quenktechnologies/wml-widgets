import { View } from '@quenk/wml';
import { Style } from '../../content/style';
import { ControlAttrs, Event, AbstractControl } from '../';
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
export interface ButtonSelectAttrs<O, V> extends ControlAttrs<V> {
    /**
     * options to display
     */
    options: Option<O>[];
    /**
     * style in style to use.
     */
    style?: Style;
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
             * id of the root element
             */
            id: string;
            /**
             * className of the root element.
             */
            className: string;
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
             * click is applied to the value of an option's value when
             * it is clicked by the user.
             */
            click: (n: number) => void;
            /**
             * getClassNames for an options' button.
             */
            getClassNames: (n: number) => string;
            /**
             * getStyle
             */
            getStyle: () => Style;
            /**
             * getActive
             */
            getActive: (n: number) => boolean;
        };
    };
}
/**
 * ButtonSelect
 */
export declare class ButtonSelect<V> extends AbstractControl<V, ButtonSelectAttrs<V, V>> {
    view: View;
    values: {
        root: {
            id: string;
            className: string;
        };
        buttons: {
            current: number;
            options: Option<V>[];
            click: (idx: number) => void;
            getStyle: () => Style;
            getActive: (n: number) => boolean;
            getClassNames: (n: number) => string;
        };
    };
}
/**
 * MultiButtonSelect
 */
export declare class MultiButtonSelect<V> extends AbstractControl<V[], ButtonSelectAttrs<V, V[]>> {
    view: View;
    values: {
        root: {
            id: string;
            className: string;
        };
        buttons: {
            values: number[];
            options: Option<V>[];
            click: (n: number) => void;
            getStyle: () => Style;
            getActive: (n: number) => boolean;
            getClassNames: (n: number) => string;
        };
    };
}
