import { View, Component } from '@quenk/wml';
import { HTMLElementAttrs } from '../../';
export declare const CLOSE_BUTTON = "ww-close-button";
/**
 * CloseButtonAttrs
 */
export interface CloseButtonAttrs extends HTMLElementAttrs {
    /**
     * onClick handler.
     */
    onClick?: () => void;
}
/**
 * CloseButton used to display the "x" on dialogs etc.
 */
export declare class CloseButton extends Component<CloseButtonAttrs> {
    view: View;
    values: {
        id: string;
        className: string;
        wml: {
            id: string;
        };
        onclick: () => void;
    };
}
