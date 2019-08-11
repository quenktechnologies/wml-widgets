import { View, Component } from '@quenk/wml';
import { WidgetAttrs, HTMLElementAttrs } from '../../';
export declare const PROMPT = "ww-prompt";
export declare const PROMPT_CLOSE = "ww-prompt__close";
export declare const PROMPT_SAVE = "ww-prompt__save";
/**
 * PromptAttrs
 */
export interface PromptAttrs extends HTMLElementAttrs {
    /**
     * title of thee prompt.
     */
    title?: string;
    /**
     * closeText displayed in the close button.
     */
    closeText?: string;
    /**
     * saveText displayed in the save butotn.
     */
    saveText?: string;
    /**
     * disabled if true will disable the save button.
     */
    disabled?: boolean;
    /**
     * onSave handler.
     */
    onSave: () => void;
    /**
     * onCancel handler.
     */
    onCancel: () => void;
}
/**
 * Prompt displays a dialog to the user suitable for collecting data
 * input.
 */
export declare class Prompt extends Component<WidgetAttrs<PromptAttrs>> {
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
            close: {
                text: string;
                className: string;
                onClick: () => void;
            };
            save: {
                text: string;
                wml: {
                    id: string;
                };
                className: string;
                disabled: boolean;
                onClick: () => void;
            };
        };
    };
    close(): Prompt;
    /**
     * enable saving.
     */
    enable(): Prompt;
    /**
     * disable saving.
     */
    disable(): Prompt;
}
/**
 * close the Modal in a view.
 */
export declare const close: (view: View, id: string) => import("@quenk/noni/lib/data/maybe").Maybe<void>;
