import { Record } from '@quenk/noni/lib/data/record';
import { Sorter } from '@quenk/noni/lib/data/array/sort';
import { ColumnId } from '../event';
import { Column } from './';
/**
 * SortAlias type.
 *
 * This is a path that should be used instead of the name field when
 * retrieving a column's sort target.
 */
export type SortAlias = string;
/**
 * SortKey stores the column id and direction data has been sorted by.
 */
export type SortKey = [number, -1 | 1];
/**
 * SortStrategy is a function that can be used to sort data or a
 * string refernece to one.
 */
export type SortStrategy<C> = string | Sorter<C>;
/**
 * Dataset type.
 *
 * The left value is the data that is sorted and displayed while
 * the right is the original data untouched.
 */
export type Dataset<R> = [R[], R[]];
/**
 * SortDelegate type.
 *
 * This is a function that given a SortRequest will
 * provide a sorted copy of the data and a new sort key.
 */
export type SortDelegate<R> = (r: SortRequest<R>) => [R[], SortKey];
/**
 * SortRequest contains the info needed to preform a sort.
 */
export declare class SortRequest<R> {
    column: ColumnId;
    data: R[];
    key: SortKey;
    constructor(column: ColumnId, data: R[], key: SortKey);
}
/**
 * sortById sorts a dataset by a column using the columns id.
 *
 * Data is only sorted by one column at a time.
 */
export declare const sortById: <C, R extends Record<C>>(cols: Column<C, R>[], key: SortKey, data: Dataset<R>, id: ColumnId) => [R[], SortKey];
