import { View, Component } from '@quenk/wml';
import { HTMLElementAttrs, WidgetAttrs } from '../../';
export declare const CLOSE = "ww-close";
/**
 * CloseAttrs
 */
export interface CloseAttrs extends HTMLElementAttrs {
}
/**
 * Close
 */
export declare class Close extends Component<WidgetAttrs<CloseAttrs>> {
    view: View;
    values: {
        root: {
            id: string;
            className: string;
        };
    };
}
