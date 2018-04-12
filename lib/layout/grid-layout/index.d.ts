import { View } from '@quenk/wml';
import { LayoutAttrs, GenericLayout } from '../';
export declare const GRID_LAYOUT = "container-fluid";
export declare const COLUMN = "ww-column";
export declare const ROW = "row";
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
    size?: number;
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
