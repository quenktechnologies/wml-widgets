import * as wml from '@quenk/wml';
import { WidgetAttrs } from '../../';
import { Component } from '@quenk/wml';
import { PanelAttrs } from '.';
/**
 * Panel provides a rectangular container for visually seperating
 * content by context.
 *
 * This class provides the containing, part that can be further
 * subdivided into a header, body and/or footer section.
 */
export declare class Panel extends Component<WidgetAttrs<PanelAttrs>> {
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
