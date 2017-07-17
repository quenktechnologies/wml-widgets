import { AbstractWidget } from '@quenk/wml/lib/runtime';
import * as views from './wml/grid';
/**
 * Container
 */
export declare class Container extends AbstractWidget {
    view: views.Container;
}
export declare class Row extends AbstractWidget {
    view: views.Row;
}
export declare class Column extends AbstractWidget {
    view: views.Column;
    _getClass(): string;
}
