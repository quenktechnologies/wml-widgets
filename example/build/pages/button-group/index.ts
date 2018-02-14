import * as wml from '@quenk/wml';
import * as views from './wml/button-group'
import { Page } from '../Page';

export class ButtonGroupPage extends Page {

    view: wml.View = new views.Main(this);

}
