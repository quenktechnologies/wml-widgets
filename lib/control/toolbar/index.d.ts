import { View, Component } from '@quenk/wml';
import { WidgetAttrs, StylableAttrs } from '../../';
import { ToolbarAttrs } from '.';
export declare const TOOLBAR = "ww-toolbar";
export declare const TOOLBAR_COMPAT = "-toolbar-compat";
/**
 * ToolbarAttrs
 */
export interface ToolbarAttrs extends StylableAttrs {
}
/**
 * Toolbar provides a widget for grouping related controls into a
 * single row.
 */
export declare class Toolbar extends Component<WidgetAttrs<ToolbarAttrs>> {
    view: View;
    values: {
        root: {
            class: string;
        };
    };
}
