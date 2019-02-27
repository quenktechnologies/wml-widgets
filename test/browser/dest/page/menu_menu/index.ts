import * as wml from '@quenk/wml';
import { Main } from './wml/menu';

export class MenuPage {

    view: wml.View = new Main(this);

}

export default new MenuPage();
