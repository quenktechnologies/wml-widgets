import { View, Component } from '@quenk/wml';
import { HTMLElementAttrs } from '../../';
export declare const LABEL = "ww-label";
/**
 * LabelAttrs
 */
export interface LabelAttrs extends HTMLElementAttrs {
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
export declare class Label extends Component<LabelAttrs> {
    view: View;
    values: {
        label: {
            className: string;
            for: string;
            text: import("@quenk/wml").Content[];
        };
    };
}
