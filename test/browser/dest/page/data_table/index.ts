import * as wml from '@quenk/wml';
import { Main } from './wml/table';
import { users } from './data';

const columns = [

    { name: 'index', heading: '#' },
    { name: 'name', heading: 'Name' },
    { name: 'gender', heading: 'Gender' },
    { name: 'email', heading: 'Email' },
    { name: 'balance', heading: 'Balance' },

];

export interface User {

    index: number,
    name: string,
    balance: string

}

export class DataTablePage {

    view: wml.View = new Main(this);

    values = {

        users,
        columns,

    }

}

export default new DataTablePage();
