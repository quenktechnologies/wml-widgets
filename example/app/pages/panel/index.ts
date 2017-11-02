import * as wml from '@quenk/wml';
import { Page } from '../Page';
import { Main } from './wml/panel';

export class PanelPage extends Page {

    view: wml.View = new Main(this);

}
