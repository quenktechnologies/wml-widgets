import { View, Component } from '@quenk/wml';
import { HTMLElementAttrs, WidgetAttrs } from '../../';
export declare const IMAGE = "ww-image";
/**
 * ImageAttrs
 */
export interface ImageAttrs extends HTMLElementAttrs {
    /**
     * src
     */
    src?: string;
    /**
     * alt
     */
    alt?: string;
    /**
     * block
     */
    block?: boolean;
}
/**
 * Image
 */
export declare class Image extends Component<WidgetAttrs<ImageAttrs>> {
    view: View;
    values: {
        wml: {
            id: string;
        };
        id: string;
        className: string;
        src: string;
        alt: string;
    };
}
