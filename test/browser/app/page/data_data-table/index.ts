import * as wml from '@quenk/wml';
import { Main } from './wml/table';
import { HeadingClickedEvent, DataTable } from '../../../../../lib/data/table';
import { users } from './data';

const columns = [

    { name: 'index', heading: '#' },
    { name: 'name', heading: 'Name' },
    { name: 'gender', heading: 'Gender' },
    { name: 'email', heading: 'Email' },
    { name: 'balance', heading: 'Balance' },

];

export interface User {

    [key: string]: number | string

    index: number,
    name: string,
    balance: string

}

export class DataTablePage {

    view: wml.View = new Main(this);

    values = {

        users,
        columns,

        sortedOn: <string[]>[],

        sort: (e: HeadingClickedEvent) => {

            let mTable = this.view.findById('sortable');

            if (mTable.isJust()) {

                let t = <DataTable<string | number, User>>mTable.get();

                if (this.values.sortedOn.indexOf(e.column) > -1) {
                    t.reverse();
                    this.values.sortedOn = [];
                } else {
                    t.sort(e.column);
                    this.values.sortedOn = [e.column];
                }

            }

        }

    }

}

export default new DataTablePage();
