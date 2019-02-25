import * as wml from '@quenk/wml';
import { Main } from './wml/table';

export class TableLayoutPage {

    view: wml.View = new Main(this);

}

export default new TableLayoutPage();
