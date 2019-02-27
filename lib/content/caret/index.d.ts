import { View, Component } from '@quenk/wml';
import { HTMLElementAttrs, WidgetAttrs } from '../../';
export declare const CARET = "ww-caret";
/**
 * CaretAttrs
 */
export interface CaretAttrs extends HTMLElementAttrs {
}
/**
 * Caret
 */
export declare class Caret extends Component<WidgetAttrs<CaretAttrs>> {
    view: View;
    values: {
        root: {
            id: string;
            className: string;
        };
    };
}
