import * as wml from '@quenk/wml';
import * as views from './wml/well'

export class WellPage {

    view: wml.View = new views.Main(this);

    values = {    }

}

export default new WellPage();
