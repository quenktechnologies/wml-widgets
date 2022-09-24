import { View, Content, Component } from '@quenk/wml';
import { HTMLElementAttrs } from '../../';
export declare const BUTTON_GROUP = "ww-button-group";
export declare const BUTTON_GROUP_BUTTON = "ww-button-group__button";
export declare const BUTTON_GROUP_COMPAT = "ww-button-group-compat";
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
export declare class ButtonGroup extends Component<ButtonGroupAttrs> {
    view: View;
    values: {
        root: {
            id: string;
            className: string;
        };
    };
}
