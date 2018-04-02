import * as wml from '@quenk/wml';
import * as views from './wml/horizontal-layout';
import { Page } from '../Page';

export class HorizontalLayoutPage extends Page {

    view: wml.View = new views.Main(this);

}
