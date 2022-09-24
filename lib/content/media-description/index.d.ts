import { View, Component } from '@quenk/wml';
import { HTMLElementAttrs } from '../../';
export declare const MEDIA_DESCRIPTION = "ww-media-description";
export declare const MEDIA_DESCRIPTION_MEDIA = "ww-media-description__media";
export declare const MEDIA_DESCRIPTION_DESCRIPTION = "ww-media-description__description";
/**
 * MediaDescriptionAttrs
 */
export interface MediaDescriptionAttrs extends HTMLElementAttrs {
}
/**
 * MediaDescription
 */
export declare class MediaDescription extends Component<MediaDescriptionAttrs> {
    view: View;
    values: {
        id: string;
        className: string;
    };
}
/**
 * MediaAttrs
 */
export interface MediaAttrs extends HTMLElementAttrs {
}
/**
 * Media
 */
export declare class Media extends Component<MediaAttrs> {
    view: View;
    values: {
        id: string;
        className: string;
    };
}
/**
 * DescriptionAttrs
 */
export interface DescriptionAttrs extends HTMLElementAttrs {
}
/**
 * Description
 */
export declare class Description extends Component<DescriptionAttrs> {
    view: View;
    values: {
        id: string;
        className: string;
    };
}
