import { View, Component } from '@quenk/wml';
import { Style } from '../../content/style';
import { HTMLElementAttrs, WidgetAttrs } from '../../';
export { Style };
export declare const ALERT = "ww-alert";
/**
 * AlertAttrs
 */
export interface AlertAttrs extends HTMLElementAttrs {
    /**
     * text to display in the alert.
     */
    text?: string;
    /**
     * style to apply to the alert.
     */
    style?: Style;
    /**
     * closable if true will provide a button to close the alert.
     */
    closable?: boolean;
}
/**
 * Alert is used for displaying important messages to users.
 */
export declare class Alert extends Component<WidgetAttrs<AlertAttrs>> {
    view: View;
    values: {
        wml: {
            id: string;
        };
        id: string;
        className: string;
        closable: boolean;
        content: import("@quenk/wml").Content[];
    };
    /**
     * close the alert.
     */
    close(): void;
}
