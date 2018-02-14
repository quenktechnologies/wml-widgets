import * as wml from '@quenk/wml';
import { Page } from '../Page';
import { Main } from './wml/table';
import { users } from './data';
import { Cell, CellClickedEvent, Table } from '@package/wml-widgets/table';

const columns = [

    { name: 'index', heading: '#' },
    { name: 'name', heading: 'Name' },
    { name: 'balance', heading: 'Balance' }

];

export interface User {

    index: number,
    name: string,
    balance: string

}

export class TablePage extends Page {

    view: wml.View = new Main(this);

    values = {

        users,
        columns,
        onCellClicked: <A>(e: CellClickedEvent<A, User>) => {

            let span = document.createElement('span');
            span.appendChild(document.createTextNode(`You clicked ${e.column}${e.rowNumber}!`));

            e.cell.setContent({ render: () => span });

        }

    }

}
