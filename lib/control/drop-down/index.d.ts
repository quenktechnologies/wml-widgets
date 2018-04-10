import * as hidden from '../../content/state/hidden';
import { View, Attrs, Template, Component } from '@quenk/wml';
export declare const DROP_DOWN = "ww-drop-down-menu";
export declare const DROP_DOWN_TOGGLE = "ww-drop-down-menu__toggle";
export declare const DROP_DOWN_CONTENT = "ww-drop-down__content";
/**
 * ButtonTemplate provides the template for rendering the button part.
 */
export declare type ButtonTemplate = (b: DropDown) => Template;
/**
 * DropDownMenuAttrs
 */
export interface DropDownMenuAttrs extends Attrs {
    ww?: {
        /**
         * class styles for the root element (ul).
         */
        class?: string;
        /**
         * buttonText for the button.
         */
        buttonText?: string;
        /**
         * buttonTemplate for rendering the button.
         */
        buttonTemplate?: ButtonTemplate;
        /**
         * autoClose when true, will automatically hide the content.
         * Defaults to true.
         */
        autoClose?: boolean;
    };
}
/**
 * DropDown provides a component for displaying a pop up menu.
 *
 *
 *    +--------+
 *    |  Menu  |
 *    +--------+
 *    +-------------------------+
 *    |                         |
 *    | ----------------------- |
 *    |                         |
 *    | ----------------------- |
 *    |                         |
 *    | ----------------------- |
 *    |                         |
 *    +-------------------------+
 */
export declare class DropDown extends Component<DropDownMenuAttrs> implements hidden.Hidable {
    view: View;
    isHidden: hidden.IsHidden;
    hide: hidden.Hide<DropDown>;
    show: hidden.Show<DropDown>;
    toggle: hidden.Toggle<DropDown>;
    values: {
        root: {
            id: string;
            class: string;
        };
        button: {
            text: string;
            class: string;
            template: () => ButtonTemplate;
        };
        toggle: {
            class: string;
            onClick: () => void;
        };
        content: {
            id: string;
            class: string;
            autoClose: boolean;
            render: () => (Element | Node | HTMLElement)[];
        };
    };
    handleEvent(e: Event): void;
}
