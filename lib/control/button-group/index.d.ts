import { View, Content, Component } from '@quenk/wml';
import { WidgetAttrs, HTMLElementAttrs } from '../../';
export declare const BUTTON_GROUP = "ww-button-group";
/**
 * ButtonGroupAttrs
 */
export interface ButtonGroupAttrs extends HTMLElementAttrs {
    /**
   * content can be specified instead of the children attribute.
   */
    content?: Content[];
}
/**
 * ButtonGroup groups multiple buttons into one element.
 */
export declare class ButtonGroup extends Component<WidgetAttrs<ButtonGroupAttrs>> {
    view: View;
    values: {
        root: {
            id: string;
            className: string;
        };
    };
}
