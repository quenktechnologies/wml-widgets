import { View, Component } from '@quenk/wml';
import { Style } from '../../content/style';
import { Size } from '../../content/size';
import { HTMLElementAttrs, WidgetAttrs } from '../../';
export { Style };
export declare const DISPLAY_FIELD = "ww-display-field";
export declare const DISPLAY_FIELD_CONTENT = "ww-display-field__content";
/**
 * DisplayFieldAttrs
 */
export interface DisplayFieldAttrs extends HTMLElementAttrs {
    /**
     * size modifier.
     */
    size?: Size;
    /**
     * style modifier.
     */
    style?: Style;
    /**
     * block scope this button.
     */
    block?: boolean;
    /**
     * onClick handler.
     */
    onClick?: () => void;
}
/**
 * DisplayField is used to display a value in a text field like box.
 */
export declare class DisplayField extends Component<WidgetAttrs<DisplayFieldAttrs>> {
    view: View;
    values: {
        wml: {
            id: string;
        };
        id: string;
        className: string;
        onclick: (e: Event) => void;
        content: {
            className: string;
        };
    };
}
