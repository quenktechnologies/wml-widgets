import { View, Component } from '@quenk/wml';
import { StylableAttrs, WidgetAttrs } from '../../../';
export declare const CARET = "ww-caret";
/**
 * CaretAttrs
 */
export interface CaretAttrs extends StylableAttrs {
}
export declare class Caret extends Component<WidgetAttrs<CaretAttrs>> {
    view: View;
    values: {
        root: {
            class: string;
        };
    };
}
