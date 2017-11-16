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
export interface Column<C, R> {
    name: string;
    heading: string;
    hidden?: boolean;
    sortAs?: string;
    fragment?: CellFragment<C, R>;
    strategy?: SortingStrategy;
}
/**
 * CellFragment is a wml function that renders the DOM for a table cell.
 */
export declare type CellFragment<C, R> = (datum: C) => (name: string) => (row: R) => ContentProvider;
/**
 * Delegate is the interface that receives Table events.
 */
export interface Delegate<C, R> {
    onAllSelected(e: AllSelectedEvent<R>): void;
    onCellClicked(e: CellClickedEvent<C, R>): void;
    onHeadingClicked(e: HeadingClickedEvent): void;
    onRowClicked(e: RowClickedEvent<R>): void;
    onRowSelected(e: RowSelectedEvent<R>): void;
}
export interface TableAttrs<C, R> extends Attrs {
    ww: {
        class?: string;
        selectable?: boolean;
        headingClass?: string;
        rowClass?: string;
        cellClass?: string;
        columns: Column<C, R>[];
        data: R[];
        delegate?: Delegate<C, R>;
        empty?: Renderable;
        onAllSelected?: (e: AllSelectedEvent<R>) => void;
        onCellClicked?: (e: CellClickedEvent<C, R>) => void;
        onHeadingClicked?: (e: HeadingClickedEvent) => void;
        onRowClicked?: (e: RowClickedEvent<R>) => void;
        onRowSelected?: (e: RowSelectedEvent<R>) => void;
    };
}
export declare const dateSort: (a: string, b: string) => 0 | 1 | -1;
export declare const stringSort: (a: string, b: string) => 0 | 1 | -1;
export declare const naturalSort: (a?: any, b?: any) => 0 | 1 | -1;
export declare const numberSort: (a: any, b: any) => 0 | 1 | -1;
