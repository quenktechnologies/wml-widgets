import { View, Component } from '@quenk/wml';
import { HTMLElementAttrs, WidgetAttrs } from '../../';
export declare const THUMBNAIL = "ww-thumbnail";
export declare const THUMBNAIL_CAPTION = "ww-thumbnail__caption";
/**
 * ThumbnailAttrs
 */
export interface ThumbnailAttrs extends HTMLElementAttrs {
    /**
     * href
     */
    href?: string;
    /**
     * onClick handler.
     */
    onClick?: () => void;
}
/**
 * Thumbnail
 */
export declare class Thumbnail extends Component<WidgetAttrs<ThumbnailAttrs>> {
    view: View;
    values: {
        id: string;
        className: string;
        href: string;
        onclick: (e: Event) => void;
    };
}
/**
 * CaptionAttrs
 */
export interface CaptionAttrs extends HTMLElementAttrs {
}
/**
 * Caption
 */
export declare class Caption extends Component<WidgetAttrs<CaptionAttrs>> {
    view: View;
    values: {
        id: string;
        className: string;
    };
}
