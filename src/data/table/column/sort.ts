import { Record } from '@quenk/noni/lib/data/record';
import { Type } from '@quenk/noni/lib/data/type';
import { getDefault } from '@quenk/noni/lib/data/record/path';
import {
    Sorter,
    date as dateSort,
    string as stringSort,
    number as numberSort,
    natural as naturalSort
} from '@quenk/noni/lib/data/array/sort';

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
export class SortRequest<R> {
    constructor(
        public column: ColumnId,
        public data: R[],
        public key: SortKey
    ) {}
}

/**
 * sortById sorts a dataset by a column using the columns id.
 *
 * Data is only sorted by one column at a time.
 */
export const sortById = <C, R extends Record<C>>(
    cols: Column<C, R>[],
    key: SortKey,
    data: Dataset<R>,
    id: ColumnId
): [R[], SortKey] => {
    let spec = cols[id];

    let [current, original] = data;

    if (spec === undefined) return [current, key];

    if (!spec.sort) return [current, key];

    if (key[0] === id) {
        return [current.reverse(), <SortKey>[key[0], key[1] * -1]];
    } else {
        let strategy = getSortStrategy(<SortStrategy<Type>>spec.sort);

        let alias = spec.alias ? spec.alias : spec.name;

        return [doSort(original.slice(), strategy, alias), [id, -1]];
    }
};

const getSortStrategy = (s: SortStrategy<Type>): Sorter<Type> => {
    if (typeof s === 'function') return s;

    if (s === 'date') return dateSort;

    if (s === 'number') return numberSort;

    if (s === 'string') return stringSort;

    return naturalSort;
};

const doSort = <C, R extends Record<C>>(
    data: R[],
    s: Sorter<C>,
    alias: string
) => data.sort((a, b) => s(<C>getAny(alias, a), <C>getAny(alias, b)));

const getAny = <C>(path: string, src: Record<C>) =>
    getDefault(path, src, undefined);
