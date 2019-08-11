import { View, Component } from '@quenk/wml';
import { WidgetAttrs, HTMLElementAttrs } from '../../';
export declare const INFORM = "ww-inform";
export declare const INFORM_OK = "ww-inform__ok";
/**
 * InformAttrs
 */
export interface InformAttrs extends HTMLElementAttrs {
    /**
     * title of the confirm.
     */
    title?: string;
    /**
     * buttonText
     */
    buttonText?: string;
    /**
     * onClose handler.
     */
    onClose: () => void;
}
/**
 * Inform displays a message to the user.
 */
export declare class Inform extends Component<WidgetAttrs<InformAttrs>> {
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
            ok: {
                text: string;
                wml: {
                    id: string;
                };
                className: string;
                onClick: () => void;
            };
        };
    };
    close(): Inform;
}
