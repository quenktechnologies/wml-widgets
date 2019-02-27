import * as wml from '@quenk/wml';
import * as views from './wml/horizontal';

export class HorizontalLayoutPage {

    view: wml.View = new views.Main(this);

}

export default new HorizontalLayoutPage();
