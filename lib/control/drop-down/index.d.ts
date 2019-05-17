import * as hidden from '../../content/state/hidden';
import * as style from '../../content/style';
import { View, Fun, Component } from '@quenk/wml';
import { Style } from '../../content/style';
import { WidgetAttrs, HTMLElementAttrs } from '../../';
export declare const DROP_DOWN = "ww-drop-down-menu";
export declare const DROP_DOWN_TOGGLE = "ww-drop-down-menu__toggle";
export declare const DROP_DOWN_CONTENT = "ww-drop-down__content";
/**
 * ButtonTemplate provides the template for rendering the button part.
 */
export declare type ButtonTemplate = (b: DropDown) => Fun;
/**
 * DropDownMenuAttrs
 */
export interface DropDownMenuAttrs extends HTMLElementAttrs {
    /**
     * buttonClassName
     */
    buttonClassName?: string;
    /**
     * buttonText for the button.
     */
    buttonText?: string;
    /**
     * buttonStyle for the button.
     */
    buttonStyle?: Style;
    /**
     * buttonTemplate for rendering the button.
     */
    buttonTemplate?: ButtonTemplate;
    /**
     * autoClose when true, will automatically hide the content.
     * Defaults to true.
     */
    autoClose?: boolean;
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
export declare class DropDown extends Component<WidgetAttrs<DropDownMenuAttrs>> implements hidden.Hidable {
    view: View;
    values: {
        root: {
            wml: {
                id: string;
            };
            id: string;
            className: string;
        };
        button: {
            text: string;
            style: style.Style;
            className: string;
            template: () => ButtonTemplate;
            onClick: () => void;
        };
        content: {
            wml: {
                id: string;
            };
            className: string;
            autoClose: boolean;
            render: () => import("@quenk/wml").Content[];
            hide: () => DropDown;
        };
    };
    isHidden(): boolean;
    hide(): DropDown;
    show(): DropDown;
    toggle(): DropDown;
    handleEvent(e: Event): void;
}
