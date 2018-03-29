import * as wml from '@quenk/wml';
import { ToolbarAttrs } from '.';
/**
 * Toolbar provides a widget for grouping related controls into a
 * single row.
 */
export declare class Toolbar extends wml.Component<ToolbarAttrs> {
    view: wml.View;
    values: {
        root: {
            class: string;
        };
    };
}
