import { View, Component } from '@quenk/wml';
import { Style } from '../../content/style';
import { HTMLElementAttrs, WidgetAttrs } from '../../';
export { Style };
export declare const TAG = "ww-tag";
/**
 * TagAttrs
 */
export interface TagAttrs extends HTMLElementAttrs {
    /**
     * text to display in the tag.
     */
    text?: string;
    /**
     * style to apply to the tag.
     */
    style?: Style;
    /**
     * onClick handler.
     */
    onClick?: () => void;
}
/**
 * Tag
 */
export declare class Tag extends Component<WidgetAttrs<TagAttrs>> {
    view: View;
    values: {
        wml: {
            id: string;
        };
        id: string;
        className: string;
        onclick: (_: Event) => void;
        content: import("@quenk/wml").Content[];
    };
}
