import * as wml from '@quenk/wml';
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
    view: wml.View;
    values: {
        class: {
            root: string;
        };
    };
}
export declare class Row extends Component<GridAttrs> {
    view: wml.View;
    values: {
        class: {
            root: string;
        };
    };
}
export declare class Column extends Component<ColumnAttrs> {
    view: wml.View;
    values: {
        class: {
            root: string;
        };
    };
}
