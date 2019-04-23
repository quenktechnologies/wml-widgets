import { View, Component } from '@quenk/wml';
import { HTMLElementAttrs, WidgetAttrs } from '../../';
export declare const CLOSE = "ww-close";
/**
 * CloseAttrs
 */
export interface CloseAttrs extends HTMLElementAttrs {
    /**
     * onClick handler
     */
    onClick: () => void;
}
/**
 * Close
 */
export declare class Close extends Component<WidgetAttrs<CloseAttrs>> {
    view: View;
    values: {
        id: string;
        className: string;
        onClick: () => void;
    };
}
