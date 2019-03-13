import { View, Component } from '@quenk/wml';
import { WidgetAttrs } from '../../';
export declare const LABEL = "ww-label";
/**
 * LabelAttrs
 */
export interface LabelAttrs {
    /**
     * for value
     */
    for?: string;
    /**
     * className for the label.
     */
    className?: string;
    /**
     * text for the label.
     */
    text?: string;
}
/**
 * Label
 */
export declare class Label extends Component<WidgetAttrs<LabelAttrs>> {
    view: View;
    values: {
        label: {
            className: string;
            for: string;
            text: import("@quenk/wml").Content[];
        };
    };
}
