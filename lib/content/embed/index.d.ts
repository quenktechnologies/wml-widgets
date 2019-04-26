import { View, Component } from '@quenk/wml';
import { HTMLElementAttrs, WidgetAttrs } from '../../';
export declare const EMBED = "ww-embed";
/**
 * EmbedAttrs
 */
export interface EmbedAttrs extends HTMLElementAttrs {
}
/**
 * Embed
 */
export declare class Embed extends Component<WidgetAttrs<EmbedAttrs>> {
    view: View;
    values: {
        wml: {
            id: string;
        };
        id: string;
        className: string;
    };
}
