import { View, Component } from '@quenk/wml';
import { WidgetAttrs, HTMLElementAttrs } from '../../';
export declare const TOOLBAR = "ww-toolbar";
export declare const TOOLBAR_COMPAT = "-toolbar-compat";
/**
 * ToolbarAttrs
 */
export interface ToolbarAttrs extends HTMLElementAttrs {
}
/**
 * Toolbar provides a widget for grouping related controls into a
 * single row.
 */
export declare class Toolbar extends Component<WidgetAttrs<ToolbarAttrs>> {
    view: View;
    values: {
        root: {
            id: string;
            className: string;
        };
    };
}
