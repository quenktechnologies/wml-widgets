import * as wml from '@quenk/wml';
import { Page } from '../Page';
import { Main } from './wml/breadcrumb';

export class BreadcrumbPage extends Page {

    view: wml.View = new Main(this);

}
