import { View, Component } from '@quenk/wml';
import { HTMLElementAttrs } from '../../';
export declare const INPUT_GROUP = "ww-input-group";
export declare const INPUT_GROUP_ADDON = "ww-input-group__addon";
export declare const INPUT_GROUP_BUTTON_ADDON = "ww-input-group__button-addon";
/**
 * InputGroupAttrs
 */
export interface InputGroupAttrs extends HTMLElementAttrs {
}
/**
 * InputGroup allows an input to be wrapped together with other controls to
 * appear as one.
 *
 * This is useful for creating inputs that may have related fields that should
 * be modified when changed. For example, entering an amount and currency in the
 * same place.
 *
 *  +--------------------------------+
 *  | TTD ^ | 5000.00                |
 *  +--------------------------------+
 */
export declare class InputGroup extends Component<InputGroupAttrs> {
    view: View;
    values: {
        id: string;
        className: string;
    };
}
/**
 * AddOnAttrs
 */
export interface AddOnAttrs extends HTMLElementAttrs {
    /**
     * button if true, will use the css classes for button addons.
     */
    button?: boolean;
}
/**
 * AddOn is used to attach the extra text or control to the input.
 */
export declare class AddOn extends Component<AddOnAttrs> {
    view: View;
    values: {
        id: string;
        className: string;
    };
}
