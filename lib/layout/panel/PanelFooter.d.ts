import * as wml from '@quenk/wml';
import { Component } from '@quenk/wml';
import { WidgetAttrs } from '../..';
import { PanelFooterAttrs } from '.';
/**
 * PanelFooter part of the panel for summary content etc.
 */
export declare class PanelFooter extends Component<WidgetAttrs<PanelFooterAttrs>> {
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
