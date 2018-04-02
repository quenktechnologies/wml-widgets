import * as wml from '@quenk/wml';
import { WidgetAttrs, StylableAttrs } from '../../';
/**
 * HorizontalLayoutAttrs
 */
export interface HorizontalLayoutAttrs extends StylableAttrs {
}
/**
 * HorizontalLayout uses the css flexbox to provide a container
 * where all items are laid out in a single row.
 */
export declare class HorizontalLayout extends wml.Component<WidgetAttrs<HorizontalLayoutAttrs>> {
    view: wml.View;
    /**
     * values
     */
    values: {
        root: {
            class: string;
        };
    };
}
