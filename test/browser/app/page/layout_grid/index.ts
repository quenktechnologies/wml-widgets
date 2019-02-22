import * as wml from '@quenk/wml';
import * as views from './wml/grid';

export class GridLayoutPage {

    view: wml.View = new views.Main(this);

    values = {

        root: {

            className: 'grid-layout-example'

        }

    }

}

export default new GridLayoutPage();
