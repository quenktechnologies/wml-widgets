import { View, Component } from '@quenk/wml';
import { StylableAttrs, WidgetAttrs } from '../../../';
export declare const CLOSE = "ww-close";
/**
 * CloseAttrs
 */
export interface CloseAttrs extends StylableAttrs {
}
export declare class Close extends Component<WidgetAttrs<CloseAttrs>> {
    view: View;
    values: {
        root: {
            class: string;
        };
    };
}
