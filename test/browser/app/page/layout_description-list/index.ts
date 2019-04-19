import * as wml from '@quenk/wml';
import { Main } from './wml/description-list';

export class DescriptionListPage {

    view: wml.View = new Main(this);

}

export default new DescriptionListPage();
