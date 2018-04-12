import { View } from '@quenk/wml';
import { GenericLayout } from '..';
import { PanelAttrs } from '.';
/**
 * Panel provides a rectangular container for visually seperating
 * content by context.
 *
 * This class provides the containing, part that can be further
 * subdivided into a header, body and/or footer section.
 */
export declare class Panel extends GenericLayout<PanelAttrs> {
    view: View;
    /**
     * values
     */
    values: {
        content: {
            id: string;
            class: string;
        };
    };
}
