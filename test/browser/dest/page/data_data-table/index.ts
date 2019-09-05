import * as wml from '@quenk/wml';
import { CellClickedEvent, DataTable } from '../../../../../lib/data/table';
import { Main } from './wml/table';
import { users } from './data';
import { getById } from '../../../../../lib/util';

const columns = [

    { name: 'index', heading: '#', sort: 'yes' },
    { name: 'name', heading: 'Name', sort: 'yes' },
    { name: 'gender', heading: 'Gender', sort: 'yes' },
    { name: 'email', heading: 'Email', sort: 'yes' },
    { name: 'balance', heading: 'Balance', sort: 'yes' },

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

        id: 'table',
        users,
        columns,

        onCellClicked: (e: CellClickedEvent) => {

            let mDT =
                getById<DataTable<number | string, User>>(this.view, this.values.id);

            if (mDT.isNothing()) return;

            let dt = mDT.get();

            dt.getCell(e.column, e.row).cells.forEach(c => {
                c.style.backgroundColor = 'red';
                c.style.color = '#fff';
            });

        }

    }

}

export default new DataTablePage();
