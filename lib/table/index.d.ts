import { Attrs, ContentProvider, Renderable } from '@quenk/wml';
import { AllSelectedEvent } from './AllSelectedEvent';
import { CellClickedEvent } from './CellClickedEvent';
import { RowClickedEvent } from './RowClickedEvent';
import { RowSelectedEvent } from './RowSelectedEvent';
import { HeadingClickedEvent } from './HeadingClickedEvent';
export { Table } from './Table';
export { CellClickedEvent, RowClickedEvent, HeadingClickedEvent, AllSelectedEvent };
export { Cell } from './Cell';
export declare const ASC_ARROW = "⇧";
export declare const DESC_ARROW = "⇩";
/**
 * Comparable represents those types that we know how to compare.
 */
export declare type Comparable = string | number | boolean;
/**
 * SortingStrategy is a function that can indicate the rank of
 * a to b.
 */
export declare type SortingStrategy = (a: Comparable, b: Comparable) => number;
/**
 * Column (old name for Column)
 * @deprecated
 */
export interface Column<D> {
    name: string;
    heading: string;
    hidden?: boolean;
    sortAs?: string;
    fragment?: CellFragment<D>;
    strategy?: SortingStrategy;
}
/**
 * CellFragment is a wml function that renders the DOM for a table cell.
 */
export declare type CellFragment<D> = (datum: any, name: string, row: D) => ContentProvider;
/**
 * Delegate is the interface that receives Table events.
 */
export interface Delegate<D> {
    onAllSelected(e: AllSelectedEvent<D>): void;
    onCellClicked<A>(e: CellClickedEvent<A, D>): void;
    onHeadingClicked(e: HeadingClickedEvent): void;
    onRowClicked(e: RowClickedEvent<D>): void;
    onRowSelected(e: RowSelectedEvent<D>): void;
}
export interface TableAttrs<D> extends Attrs {
    ww: {
        class?: string;
        selectable?: boolean;
        headingClass?: string;
        rowClass?: string;
        cellClass?: string;
        columns: Column<D>[];
        data: D[];
        delegate?: Delegate<D>;
        empty?: Renderable;
        onAllSelected?: (e: AllSelectedEvent<D>) => void;
        onCellClicked?: <A>(e: CellClickedEvent<A, D>) => void;
        onHeadingClicked?: (e: HeadingClickedEvent) => void;
        onRowClicked?: (e: RowClickedEvent<D>) => void;
        onRowSelected?: (e: RowSelectedEvent<D>) => void;
    };
}
export declare const dateSort: (a: string, b: string) => 0 | 1 | -1;
export declare const stringSort: (a: string, b: string) => 0 | 1 | -1;
export declare const naturalSort: (a?: any, b?: any) => 0 | 1 | -1;
export declare const numberSort: (a: any, b: any) => 0 | 1 | -1;
