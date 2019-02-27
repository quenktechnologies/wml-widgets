import * as wml from '@quenk/wml';
import * as views from './wml/button-group'

export class ButtonGroupPage  {

    view: wml.View = new views.Main(this);

}

export default new ButtonGroupPage()
