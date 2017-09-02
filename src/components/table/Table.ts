import property from 'property-seek';
import { Component, Attrs, Content, View } from '@quenk/wml-runtime';
import { noop } from 'wml-widgets-common/util';
import { TableView } from './wml/table';

const ASC_ARROW = '\u21e7';
const DESC_ARROW = '\u21e9';

export const dateSort = (a: string, b: string) => {
    let na = new Date(a).getTime();
    let nb = new Date(b).getTime();
    return na > nb ? -1 : na < nb ? 1 : 0;
};

export const stringSort = (a: string, b: string) => {

    let la = a.replace(/\s+/, '').toLowerCase();
    let lb = b.replace(/\s+/, '').toLowerCase();

    return (la > lb) ? -1 : (la < lb) ? 1 : 0;

};

export const naturalSort = (a: any, b: any) => {

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

export class HeadingClickedEvent<D> {

    constructor(
        public name: string,
        public field: Field<D>,
        public table: Table<D>) { }

}

export class RowClickedEvent<D> {

    constructor(
        public value: D,
        public index: number | string,
        public data: D[],
        public table: Table<D>) { }

}

export class RowSelectedEvent<D> extends RowClickedEvent<D> { }

export class CellClickedEvent<D>{

    constructor(
        public value: CellContent,
        public name: string,
        public index: number | string,
        public row: D,
        public table: Table<D>) { }

}

export type Comparable
    = string
    | number
    | boolean;

export interface SortingStrategy {

    (a: Comparable, b: Comparable): number;

}

export interface Field<D> {
    name: string;
    heading: string;
    hidden?: boolean;
    sortAs?: string;
    fragment?: CellFragment<D>
    strategy?: SortingStrategy;
}

export interface CellFragment<D> {

    (view: View, datum: CellContent, name: string, row: D, field: Field<D>): Content
}

export type CellContent
    = boolean
    | number
    | string
    ;

export interface TableModel {

    allSelected(): void;
    cellClickedEvent<D>(e: CellClickedEvent<D>): void;
    headingClicked<D>(e: HeadingClickedEvent<D>): void;
    rowClicked<D>(e: RowClickedEvent<D>): void;
    rowSelected<D>(e: RowSelectedEvent<D>): void;

}

export class DefaultTableModel implements TableModel {
    allSelected(): void { }
    cellClickedEvent<D>(_e: CellClickedEvent<D>): void { }
    headingClicked<D>(_e: HeadingClickedEvent<D>): void { }
    rowClicked<D>(_e: RowClickedEvent<D>): void { }
    rowSelected<D>(_e: RowSelectedEvent<D>): void { }
}

export class SortTableModel extends DefaultTableModel {

    headingClicked<D>(e: HeadingClickedEvent<D>) { e.table.sort(e.name); }

}

export interface TableAttrs<D> extends Attrs {

    ww: {

        selectable?: boolean,
        headingClass?: string,
        rowClass?: string,
        cellClass?: string,
        fields: Field<D>[],
        data: D[],
        model?: TableModel

    }

}

export class Table<D> extends Component<TableAttrs<D>> {

    originalData: D[] = this.attributes.read('ww:data', []);
    data: D[] = this.originalData.slice();
    sortedOn: string = '';
    arrow: string = '';
    view = new TableView(this);
    model: TableModel = this.attributes.read('ww:model', new DefaultTableModel());

    sort(name: string): void {

        var data;
        var body = this.view.findById('body');
        var head = this.view.findById('head');
        var field = this.attributes.read('ww:fields', []).reduce((p, c) => p ? p : (c.name === name ? c : null));
        var sortOn: string;
        var strategy: SortingStrategy;

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
                .sort((a, b) => strategy(<Comparable>property(sortOn, a), <Comparable>property(sortOn, b)));

        }

        this.sortedOn = name;
        this.view.invalidate();

    }

}
