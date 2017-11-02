import * as views from './wml/grid';
import { Component, Attrs } from '@quenk/wml';
export interface GridAttrs extends Attrs {
    ww?: {
        class?: string;
    };
}
export interface ColumnAttrs extends Attrs {
    ww?: {
        size?: number;
        class?: string;
    };
}
/**
 * Grid
 */
export declare class Grid extends Component<GridAttrs> {
    view: views.Grid;
    values: {
        class: {
            root: string;
        };
    };
}
export declare class Row extends Component<GridAttrs> {
    view: views.Row;
    values: {
        class: {
            root: string;
        };
    };
}
export declare class Column extends Component<ColumnAttrs> {
    view: views.Column;
    values: {
        class: {
            root: string;
        };
    };
}
