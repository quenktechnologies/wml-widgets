import * as names from '@package/self/common/names';
import * as view from './wml/table';
import { concat } from '@package/self/common/util';
import { Component, View, Renderable, Maybe } from '@quenk/wml';
import { get } from 'property-seek';
import { CellClickedEvent } from './CellClickedEvent';
import { RowClickedEvent } from './RowClickedEvent';
import { RowSelectedEvent } from './RowSelectedEvent';
import { HeadingClickedEvent } from './HeadingClickedEvent';
import { AllSelectedEvent } from './AllSelectedEvent';
import { SortDelegate } from './SortDelegate';
import { Cell } from './Cell';
import {
    ASC_ARROW,
    DESC_ARROW,
    stringSort,
    TableAttrs,
    SortingStrategy,
    Delegate,
    Column,
    Comparable
} from '.';

/**
 * Table provides a smarter html table.
 *
 * @todo split sort and select api into own table widgets.
 */
export class Table<D> extends Component<TableAttrs<D>> {

    originalData: D[] = this.attrs.ww.data;

    view: View = new view.Table(this);

    delegate: Delegate<D> = this.attrs.ww.delegate ?
        this.attrs.ww.delegate : new SortDelegate(this);

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

            empty: <Renderable>this.attrs.ww.empty

        },
        options: {

            selectable: this.attrs.ww.selectable

        },
        table: {

            thead: {

                th: {

                    onclick: (field: string) => () =>
                        this.delegate.onHeadingClicked(new HeadingClickedEvent(field)),

                    onSelect: () =>
                        this.delegate.onAllSelected(new AllSelectedEvent(this.originalData))

                }

            },

            tbody: {

                tr: {

                    class: this.attrs.ww.rowClass,

                    onclick: (row: D, index: number, data: D[]) => () =>
                        this.delegate.onRowClicked(new RowClickedEvent(row, index, data)),

                    onSelect: (row: D, index: number, data: D[]) => () =>
                        this.delegate.onRowSelected(new RowSelectedEvent(row, index, data))

                },
                td: {

                    id: (column: string, rowNumber: number) => `${column},${rowNumber}`,

                    class: this.attrs.ww.cellClass,

                    onclick: <V>(value: V, column: string, rowData: D, rowNumber: number) =>
                        (e: Event) =>
                            this
                                .delegate
                                .onCellClicked(
                                new CellClickedEvent(
                                  value, column, rowData, rowNumber, new Cell(<HTMLElement>e.target)))

                }

            }

        },
        sortedOn: '',
        data: this.originalData.slice(),
        columns: <Column<D>[]>this.attrs.ww.columns,
        arrow: ''

    }

    sort(name: string): void {

        let columns = this.attrs.ww ? this.attrs.ww.columns ? this.attrs.ww.columns : [] : [];
        let field = columns.reduce((p, c) => p ? p : (c.name === name ? c : null));
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

    /**
     * cellAt produces a Cell instance for the coordinates passed (if found).
     */
    cellAt(column: string, row: number): Maybe<Cell> {

        return this
            .view
            .findById(`${column}${row}`)
            .map((e: HTMLElement) => new Cell(e));

    }

}
