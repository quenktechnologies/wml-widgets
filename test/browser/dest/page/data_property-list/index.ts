import * as wml from '@quenk/wml';

import { Field, DataContext } from '../../../../../lib/data/property-list';
import { Main, BoldDataView } from './wml/property-list';

export interface Data {

    [key: string]: string

}

const data: Data = {

    name: 'London Beta',

    age: '37',

    balance: '5000'

}

const money = (s: string) => `$${s}`;

const dataFragment = (c: DataContext<string, Data>) => new BoldDataView(c);

const fields: Field<string, Data>[] = [

    { name: 'name', heading: 'Name', dataFragment },
    { name: 'age', heading: 'age' },
    { name: 'balance', heading: 'Balance', format: money }

];

export class PropertyListPage {

    view: wml.View = new Main(this);

    data = data;

    fields = fields;

}

export default new PropertyListPage();
