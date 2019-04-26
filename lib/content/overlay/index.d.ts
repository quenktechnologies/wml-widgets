import { View, Component } from '@quenk/wml';
import { HTMLElementAttrs, WidgetAttrs } from '../../';
export declare const OVERLAY = "ww-overlay";
/**
 * OverlayAttrs
 */
export interface OverlayAttrs extends HTMLElementAttrs {
    /**
     * onClick handler.
     */
    onClick?: () => void;
}
/**
 * Overlay
 */
export declare class Overlay extends Component<WidgetAttrs<OverlayAttrs>> {
    view: View;
    values: {
        wml: {
            id: string;
        };
        id: string;
        className: string;
        onclick: () => void;
    };
    /**
     * close the overlay.
     */
    close(): void;
}
