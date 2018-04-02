import * as wml from '@quenk/wml';
import { Component } from '@quenk/wml';
import { WidgetAttrs, StylableAttrs } from '../../';
export declare const GRID_LAYOUT = "container-fluid";
export declare const COLUMN = "ww-column";
export declare const ROW = "row";
/**
 * GridLayoutAttrs
 */
export interface GridLayoutAttrs extends StylableAttrs {
}
export interface ColumnAttrs extends StylableAttrs {
    size?: number;
}
/**
 * GridLayout
 */
export declare class GridLayout extends Component<WidgetAttrs<GridLayoutAttrs>> {
    view: wml.View;
    values: {
        class: {
            root: string;
        };
    };
}
export declare class Row extends Component<WidgetAttrs<StylableAttrs>> {
    view: wml.View;
    values: {
        class: {
            root: string;
        };
    };
}
export declare class Column extends Component<WidgetAttrs<ColumnAttrs>> {
    view: wml.View;
    values: {
        class: {
            root: string;
        };
    };
}
