import { View } from '@quenk/wml';
import { LayoutAttrs, AbstractLayout } from '../';
export declare const GRID_LAYOUT = "ww-grid-layout";
export declare const GRID_LAYOUT_ROW = "ww-grid-layout__row";
export declare const GRID_LAYOUT_COLUMN = "ww-grid-layout__column";
/**
 * GridAttrs
 */
export interface GridAttrs extends LayoutAttrs {
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
    /**
     * offset the column location in the row by the provided number
     * of columns (max 12).
     */
    offset?: number;
}
/**
 * GridLayout
 */
export declare class GridLayout extends AbstractLayout<GridAttrs> {
    view: View;
    values: {
        content: {
            id: string | undefined;
            wml: {
                id: string;
            };
            className: () => string;
        };
    };
}
/**
 * Row
 */
export declare class Row extends AbstractLayout<RowAttrs> {
    view: View;
    values: {
        content: {
            id: string | undefined;
            wml: {
                id: string;
            };
            className: () => string;
        };
    };
}
/**
 * Column
 */
export declare class Column extends AbstractLayout<ColumnAttrs> {
    view: View;
    values: {
        content: {
            id: string | undefined;
            wml: {
                id: string;
            };
            className: () => string;
        };
    };
}
