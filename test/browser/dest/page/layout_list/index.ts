import * as wml from '@quenk/wml';
import { Main } from './wml/list';

export class ListLayoutPage {

    view: wml.View = new Main(this);

    items: { [key:string]: boolean } = {

        'This is the first item.': false,

        'This is the second item.': true,

        'This is the third item.': false

    }

}

export default new ListLayoutPage();
