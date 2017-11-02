import * as wml from '@quenk/wml';
import { Main } from './wml/busy-indicator';
import { Page } from '../Page';

export class BusyIndicatorPage extends Page {

    view: wml.View = new Main(this);

}
