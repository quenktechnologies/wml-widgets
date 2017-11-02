import * as wml from '@quenk/wml';
import { Page } from '../Page';
import { Main } from './wml/breadcrumbs';

export class BreadCrumbsPage extends Page {

    view: wml.View = new Main(this);

}
