import { View, Component } from '@quenk/wml';
import { HTMLElementAttrs } from '../../';
export declare const CARET = "ww-caret";
/**
 * CaretAttrs
 */
export interface CaretAttrs extends HTMLElementAttrs {
}
/**
 * Caret
 */
export declare class Caret extends Component<CaretAttrs> {
    view: View;
    values: {
        root: {
            id: string;
            className: string;
        };
    };
}
