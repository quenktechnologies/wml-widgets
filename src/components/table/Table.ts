import property from 'property-seek';
import { Component, Attrs } from '@quenk/wml-runtime';
import { noop } from 'wml-widgets-common/util';
import { TableView } from './wml/table';

const ASC_ARROW = '\u21e7';
const DESC_ARROW = '\u21e9';

export const dateSort = (a, b) => {
    a = new Date(a).getTime();
    b = new Date(b).getTime();
    return a > b ? -1 : a < b ? 1 : 0;
};

export const stringSort = (a, b) => {

    if (typeof a === 'string')
        a = a.replace(/\s+/, '').toLowerCase();

    if (typeof b === 'string')
        b = b.replace(/\s+/, '').toLowerCase();

    return (a > b) ? -1 : (a < b) ? 1 : 0;

};

export const naturalSort = (a, b) => {

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

export const numberSort = (a, b) => {

    a = parseFloat(a);
    b = parseFloat(b);

    a = (isNaN(a)) ? -Infinity : a;
    b = (isNaN(b)) ? -Infinity : b;

    return (a > b) ? -1 : (a < b) ? 1 : 0;

};

export class HeadingClickedEvent<A> {

    constructor(
        public name: string,
        public field: Field,
        public table: Table<A>) { }

}

export class RowClickedEvent<A> {

    constructor(
        public value: A,
        public index: number,
        public data: A[],
        public table: Table<A>) { }

}

export class RowSelectedEvent<A> extends RowClickedEvent<A> { }

export class CellClickedEvent<V, A>{

    constructor(
        public value: V,
        public name: string,
        public index: number,
        public object: A,
        public table: Table<A>) { }

}

export type Comparable
    = string
    | number
    | boolean;

export interface Field {

    name: string;
    heading: string;
    hidden?: boolean;
    sortAs?: string;
    strategy?: (a: Comparable, b: Comparable) => number;

}

export interface TableModel {

    allSelected(): void;
    headingClicked<A>(e: HeadingClickedEvent<A>): void;
    rowClicked<A>(e: RowClickedEvent<A>): void;
    rowSelected<A>(e: RowSelectedEvent<A>): void;

}

export class DefaultTableModel implements TableModel {
    allSelected(): void { }
    headingClicked<A>(_e: HeadingClickedEvent<A>): void { }
    rowClicked<A>(_e: RowClickedEvent<A>): void { }
    rowSelected<A>(_e: RowSelectedEvent<A>): void { }
}

export class SortTableModel extends DefaultTableModel {

    headingClicked<A>(e: HeadingClickedEvent<A>) { e.table.sort(e.name); }

}

export interface TableAttrs<D> extends Attrs {

    ww?: {

        selectable?: boolean,
        headingClass?: string,
        rowClass?: string,
        cellClass?: string,
        fields: Field[],
        data: D[]

    }

}

export class Table<D> extends Component<TableAttrs<D>> {

    originalData: D[];
    data: D[];
    sortedOn: string = '';
    arrow: string = '';
    view = new TableView(this);
    model: TableModel;

    constructor(a, c) {

        super(a, c);

        this.originalData = a.read('ww:data', []);
        this.data = this.originalData.slice();
        this.model = a.read('ww:model', new DefaultTableModel());

    }

    sort(name) {

        var data;
        var body = this.view.findById('body');
        var head = this.view.findById('head');
        var field = this.attributes.read('ww:fields', []).reduce((p, c) => p ? p : (c.name === name ? c : null));
        var sortOn;
        var strategy;

        if (!field)
            throw new Error(`Table#sort: unknown field '${name}'`);

        sortOn = field.sortOn || name;
        strategy = field.strategy || stringSort;

        if (this.sortedOn === name) {

            this.data = this.data.reverse();
            this.arrow = (this.arrow === ASC_ARROW) ? DESC_ARROW : ASC_ARROW;

        } else {

            this.arrow = DESC_ARROW;
            this.data = this
                .originalData
                .slice()
                .sort((a, b) => strategy(property(sortOn, a), property(sortOn, b)));

        }

        this.sortedOn = name;
        this.view.invalidate();

    }

}
