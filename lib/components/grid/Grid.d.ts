import { Component, Attrs } from '@quenk/wml-runtime';
import * as views from './wml/grid';
export interface GridAttrs extends Attrs {
    ww?: {
        class?: string;
    };
}
export interface ColumnAttrs extends Attrs {
    ww?: {
        size?: 'string';
        width?: number;
        offset?: number;
        class?: string;
    };
}
/**
 * Container
 */
export declare class Container extends Component<GridAttrs> {
    view: views.Container<this>;
}
export declare class Row extends Component<GridAttrs> {
    view: views.Row<this>;
}
export declare class Column extends Component<ColumnAttrs> {
    view: views.Column<this>;
    _getClass(): string;
}
