import * as wml from '@quenk/wml';
import * as views from './wml/drop-down-menu'
import { Page } from '../Page';

export class DropDownMenuPage extends Page {

    view: wml.View = new views.Main(this);

    onClick = (msg: string) => (e: Event) => {

        e.preventDefault();
        alert(msg);

    }

}





























