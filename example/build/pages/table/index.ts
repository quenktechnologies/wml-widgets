import * as wml from '@quenk/wml';
import { Page } from '../Page';
import { Main } from './wml/table';
import { users } from './data';

const fields = [

    { name: 'index', heading: '#' },
    { name: 'name', heading: 'Name' },
    { name: 'balance', heading: 'Balance' }

];

export class TablePage extends Page {

    view: wml.View = new Main(this);

    values = {

        users,
        fields

    }

}
