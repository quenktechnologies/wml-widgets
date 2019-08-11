import { View, Component } from '@quenk/wml';
import { WidgetAttrs, HTMLElementAttrs } from '../../';
export declare const CONFIRM = "ww-confirm";
export declare const CONFIRM_NO = "ww-confirm__no";
export declare const CONFIRM_YES = "ww-prompt__yes";
/**
 * Primary indicates whether the yes or no button should be highlighted.
 */
export declare enum Primary {
    No = "no",
    Yes = "yes"
}
/**
 * ConfirmAttrs
 */
export interface ConfirmAttrs extends HTMLElementAttrs {
    /**
     * title of the confirm.
     */
    title?: string;
    /**
     * primary
     */
    primary?: Primary;
    /**
     * noText
     */
    noText?: string;
    /**
     * yesText
     */
    yesText?: string;
    /**
     * onYes handler.
     */
    onYes: () => void;
    /**
     * onNo handler.
     */
    onNo: () => void;
}
/**
 * Confirm displays a dialog for confirming an action.
 */
export declare class Confirm extends Component<WidgetAttrs<ConfirmAttrs>> {
    view: View;
    values: {
        id: string;
        className: string;
        wml: {
            id: string;
        };
        header: {
            title: string;
        };
        footer: {
            no: {
                text: string;
                className: string;
                onClick: () => void;
            };
            yes: {
                text: string;
                wml: {
                    id: string;
                };
                className: string;
                onClick: () => void;
            };
        };
    };
    close(): Confirm;
}
