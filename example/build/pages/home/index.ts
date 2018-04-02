import * as wml from '@quenk/wml';
import { Page } from '../Page';
import { Main } from './wml/home';

export class HomePage extends Page {

    view = new Main(this);

}
