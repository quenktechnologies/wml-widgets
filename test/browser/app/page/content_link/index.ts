import * as wml from '@quenk/wml';
import * as views from './views';

export class LinkPage {

    view: wml.View = new views.Main(this);

    values = {

        onClick: () => alert('You clicked me?')

    }

}

export default new LinkPage();
