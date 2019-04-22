import * as wml from '@quenk/wml';
import { Field } from '../../../../../lib/data/property-list';
import { Main } from './wml/property-list';

interface Data {

    [key: string]: string

}

const data: Data = {


    name: 'London Beta',

    age: '37',

    balance: '5000'

}

const money = (s: string) => `$${s}`;

const fields: Field<string, Data>[] = [

    { name: 'name', heading: 'Name' },
    { name: 'age', heading: 'age' },
    { name: 'balance', heading: 'Balance', format: money }

];

export class PropertyListPage {

    view: wml.View = new Main(this);

    data = data;

    fields = fields;

}

export default new PropertyListPage();
