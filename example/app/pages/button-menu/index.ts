import * as wml from '@quenk/wml';
import * as views from './wml/button-menu'
import { ButtonMenu } from '../../../../lib/menu/button-menu';
import { Page } from '../Page';

export class ButtonMenuPage extends Page {

    view: wml.View = new views.Main(this);

    onClick = (msg: string) => (e: Event) => {

        e.preventDefault();
        alert(msg);

    }

}





























