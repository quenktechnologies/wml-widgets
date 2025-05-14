import * as wml from '@quenk/wml';
import { Main } from './wml/nav';

export class NavPage {
    view: wml.View = new Main(this);
}

export default new NavPage();
