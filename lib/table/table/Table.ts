import * as names from '@package/self/common/names';
import * as view from './wml/table';
import { concat } from '@package/self/common/util';
import { Component, Attrs, View, ContentProvider, Renderable } from '@quenk/wml';
import { get } from 'property-seek';
import { CellClickedEvent } from './CellClickedEvent';
import { RowClickedEvent } from './RowClickedEvent';
import { RowSelectedEvent } from './RowSelectedEvent';
import { HeadingClickedEvent } from './HeadingClickedEvent';

const ASC_ARROW = '\u21e7';
const DESC_ARROW = '\u21e9';

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

export type Comparable
    = string
    | number
    | boolean
    ;

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

    (datum: any, name: string, row: D, field: Field<D>): ContentProvider

}

export interface TableModel<D> {

    allSelected(): void;
    cellClicked<A>(e: CellClickedEvent<D, A>): void;
    headingClicked(e: HeadingClickedEvent<D>): void;
    rowClicked(e: RowClickedEvent<D>): void;
    rowSelected(e: RowSelectedEvent<D>): void;

}

export class DefaultTableModel<D> implements TableModel<D> {

    constructor(public table: Table<D>) { }
    allSelected(): void { }
    cellClicked<A>(_e: CellClickedEvent<D, A>): void { }
    headingClicked(_e: HeadingClickedEvent<D>): void { }
    rowClicked(_e: RowClickedEvent<D>): void { }
    rowSelected(_e: RowSelectedEvent<D>): void { }

}

export class SortTableModel<D> extends DefaultTableModel<D> {

    headingClicked<D>(e: HeadingClickedEvent<D>) { this.table.sort(e.name); }

}

export interface TableAttrs<D> extends Attrs {

    ww: {

        class?: string,
        selectable?: boolean
        headingClass?: string,
        rowClass?: string,
        cellClass?: string,
        fields: Field<D>[],
        data: D[],
        model?: TableModel<D>,
        empty?: Renderable

    }

}

/**
 * Table provides a smarter html table.
 */
export class Table<D> extends Component<TableAttrs<D>> {

    originalData: D[] = this.attrs.ww.data;

    view: View = new view.Table(this);

    model: TableModel<D> = this.attrs.ww.model ?
        this.attrs.ww.model :
        new SortTableModel(this);

    values = {

        id: {

            root: 'root',

        },
        class: {

            root: concat(names.TABLE, this.attrs.ww.class),
            row: this.attrs.ww.rowClass || '',
            cell: this.attrs.ww.cellClass || '',
            heading: this.attrs.ww.headingClass || ''

        },
        fragment: {

            empty: this.attrs.ww.empty

        },
        options: {

            selectable: this.attrs.ww.selectable

        },
        sortedOn: '',
        data: this.originalData.slice(),
        fields: this.attrs.ww.fields,
        arrow: ''

    }

    sort(name: string): void {

        let fields = this.attrs.ww ? this.attrs.ww.fields ? this.attrs.ww.fields : [] : [];
        let field = fields.reduce((p, c) => p ? p : (c.name === name ? c : null));
        let sortOn: string;
        let strategy: SortingStrategy;

        if (!field)
            throw new Error(`Table#sort: unknown field '${name}'`);

        sortOn = field.sortAs || name;
        strategy = field.strategy || stringSort;

        if (this.values.sortedOn === name) {

            this.values.data = this.values.data.reverse();
            this.values.arrow = (this.values.arrow === ASC_ARROW) ? DESC_ARROW : ASC_ARROW;

        } else {

            this.values.arrow = DESC_ARROW;
            this.values.data = this
                .originalData
                .slice()
                .sort((a, b) => strategy(<Comparable>get(sortOn, a), <Comparable>get(sortOn, b)));

        }

        this.values.sortedOn = name;
        this.view.invalidate();

    }

    /**
     * update the data the table displays
     */
    update(data: D[]): void {

        this.originalData = data.slice();
        this.values.data = data.slice();
        (this.values.sortedOn === '') ? this.view.invalidate() : this.sort(this.values.sortedOn);

    }

}
