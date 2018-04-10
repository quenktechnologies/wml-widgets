import * as wml from '@quenk/wml';
import { Component } from '@quenk/wml';
import { WidgetAttrs } from '../..';
import { PanelHeaderAttrs } from '.';
export declare class PanelHeader extends Component<WidgetAttrs<PanelHeaderAttrs>> {
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
