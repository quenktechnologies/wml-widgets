import * as wml from '@quenk/wml';
import * as views from './wml/input-group'

export class InputGroupPage {

    view: wml.View = new views.Main(this);

}

export default new InputGroupPage()
