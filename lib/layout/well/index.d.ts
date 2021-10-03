import { View } from '@quenk/wml';
import { LayoutAttrs, AbstractLayout } from '..';
export declare const WELL = "ww-well";
/**
 * WellAttrs
 */
export interface WellAttrs extends LayoutAttrs {
}
/**
 * Well provides a rectangular container for visually seperating
 * content by context.
 */
export declare class Well extends AbstractLayout<WellAttrs> {
    view: View;
    values: {
        /**
         * root values.
         */
        content: {
            id: string | undefined;
            wml: {
                id: string;
            };
            className: string;
        };
    };
}
