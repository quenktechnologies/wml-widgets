import * as wml from '@quenk/wml';
import { Page } from '../Page';
import { Main } from './wml/list-layout';

export class ListLayoutPage extends Page {

    view: wml.View = new Main(this);

}
