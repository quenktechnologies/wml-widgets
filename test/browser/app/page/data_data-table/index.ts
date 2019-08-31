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

const sortColumns = [

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

        users,
        columns,
        sortColumns

    }

}

export default new DataTablePage();
