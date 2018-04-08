import * as wml from '@quenk/wml';
import * as views from './wml/toolbar';
import { Page } from '../Page';

export class ToolbarPage extends Page {

    view: wml.View = new views.Main(this);

}
