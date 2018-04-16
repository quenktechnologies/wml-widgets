import { View } from '@quenk/wml';
import { LayoutAttrs, GenericLayout } from '../';
export declare const GRID_LAYOUT = "ww-grid-layout";
export declare const GRID_LAYOUT_ROW = "ww-grid-layout-row";
export declare const GRID_LAYOUT_COLUMN = "ww-grid-layout-column";
/**
 * GridLayoutAttrs
 */
export interface GridLayoutAttrs extends LayoutAttrs {
}
/**
 * RowAttrs
 */
export interface RowAttrs extends LayoutAttrs {
}
/**
 * ColumnAttrs
 */
export interface ColumnAttrs extends LayoutAttrs {
    /**
     * span indicates the length of the row a Column should span.
     */
    span?: number;
}
/**
 * GridLayout
 */
export declare class GridLayout extends GenericLayout<GridLayoutAttrs> {
    view: View;
    values: {
        content: {
            id: string;
            class: string;
        };
    };
}
export declare class Row extends GenericLayout<RowAttrs> {
    view: View;
    values: {
        content: {
            id: string;
            class: string;
        };
    };
}
export declare class Column extends GenericLayout<ColumnAttrs> {
    view: View;
    values: {
        content: {
            id: string;
            class: string;
        };
    };
}
