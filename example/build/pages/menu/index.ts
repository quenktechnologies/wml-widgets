import * as wml from '@quenk/wml';
import { Page } from '../Page';
import { Main } from './wml/menu';

export class MenuPage extends Page {

    view: wml.View = new Main(this);

}