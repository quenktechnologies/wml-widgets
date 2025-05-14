import * as wml from '@quenk/wml';
import { Main } from './wml/panel';

export class PanelPage {
    view: wml.View = new Main(this);
}

export default new PanelPage();
