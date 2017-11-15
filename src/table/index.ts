import { Attrs, ContentProvider, Renderable } from '@quenk/wml';
import { AllSelectedEvent } from './AllSelectedEvent';
import { CellClickedEvent } from './CellClickedEvent';
import { RowClickedEvent } from './RowClickedEvent';
import { RowSelectedEvent } from './RowSelectedEvent';
import { HeadingClickedEvent } from './HeadingClickedEvent';

export { Table } from './Table';
export { CellClickedEvent, RowClickedEvent, HeadingClickedEvent, AllSelectedEvent };
export { Cell } from './Cell';

export const ASC_ARROW = '\u21e7';

export const DESC_ARROW = '\u21e9';

/**
 * Comparable represents those types that we know how to compare.
 */
export type Comparable
    = string
    | number
    | boolean
    ;

/**
 * SortingStrategy is a function that can indicate the rank of
 * a to b.
 */
export type SortingStrategy = (a: Comparable, b: Comparable) => number;

/**
 * Column (old name for Column)
 * @deprecated
 */
export interface Column<D> {
    name: string;
    heading: string;
    hidden?: boolean;
    sortAs?: string;
    fragment?: CellFragment<D>
    strategy?: SortingStrategy;
}

/**
 * CellFragment is a wml function that renders the DOM for a table cell.
 */
export type CellFragment<D> = <A>(datum: A)=>(name: string)=>( row: D) => ContentProvider;

/**
 * Delegate is the interface that receives Table events.
 */
export interface Delegate<D> {

    onAllSelected(e: AllSelectedEvent<D>): void;
    onCellClicked<A>(e: CellClickedEvent<A,D>): void;
    onHeadingClicked(e: HeadingClickedEvent): void;
    onRowClicked(e: RowClickedEvent<D>): void;
    onRowSelected(e: RowSelectedEvent<D>): void;

}

export interface TableAttrs<D> extends Attrs {

    ww: {

        class?: string,
        selectable?: boolean
        headingClass?: string,
        rowClass?: string,
        cellClass?: string,
        columns: Column<D>[],
        data: D[],
        delegate?: Delegate<D>,
        empty?: Renderable,
        onAllSelected?: (e: AllSelectedEvent<D>) => void,
        onCellClicked?: <A>(e: CellClickedEvent<A,D>) => void,
        onHeadingClicked?: (e: HeadingClickedEvent) => void,
        onRowClicked?: (e: RowClickedEvent<D>) => void,
        onRowSelected?: (e: RowSelectedEvent<D>) => void

    }

}

export const dateSort = (a: string, b: string) => {
    let na = new Date(a).getTime();
    let nb = new Date(b).getTime();
    return na > nb ? -1 : na < nb ? 1 : 0;
};

export const stringSort = (a: string, b: string) => {

    let la = String(a).replace(/\s+/, '').toLowerCase();
    let lb = String(b).replace(/\s+/, '').toLowerCase();

    return (la > lb) ? -1 : (la < lb) ? 1 : 0;

};

export const naturalSort = (a: any = '', b: any = '') => {

    //Source: http://stackoverflow.com/questions/4340227/sort-mixed-alpha-numeric-array
    var reA = /[^a-zA-Z]/g;
    var reN = /[^0-9]/g;
    var AInt = parseInt(a, 10);
    var BInt = parseInt(b, 10);

    if (isNaN(AInt) && isNaN(BInt)) {
        var aA = a.replace(reA, '');
        var bA = b.replace(reA, '');
        if (aA === bA) {
            var aN = parseInt(a.replace(reN, ''), 10);
            var bN = parseInt(b.replace(reN, ''), 10);
            return aN === bN ? 0 : aN > bN ? -1 : 1;
        } else {
            return aA > bA ? -1 : 1;
        }
    } else if (isNaN(AInt)) { //A is not an Int
        return -1; //to make alphanumeric sort first return -1 here
    } else if (isNaN(BInt)) { //B is not an Int
        return 1; //to make alphanumeric sort first return 1 here
    } else {
        return AInt > BInt ? -1 : 1;
    }

};

export const numberSort = (a: any, b: any) => {

    let na = parseFloat(a);
    let nb = parseFloat(b);

    na = (isNaN(a)) ? -Infinity : a;
    nb = (isNaN(b)) ? -Infinity : b;

    return (na > nb) ? -1 : (na < nb) ? 1 : 0;

};

