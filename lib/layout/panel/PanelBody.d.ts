import * as wml from '@quenk/wml';
import { Component } from '@quenk/wml';
import { WidgetAttrs } from '../..';
import { PanelBodyAttrs } from '.';
/**
 * PanelBody part of a Panel for containing the main content.
 */
export declare class PanelBody extends Component<WidgetAttrs<PanelBodyAttrs>> {
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
