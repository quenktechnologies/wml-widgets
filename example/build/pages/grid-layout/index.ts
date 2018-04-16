import * as wml from '@quenk/wml';
import * as views from './wml/grid-layout';
import { Page } from '../Page';

export class GridLayoutPage extends Page {

    view: wml.View = new views.Main(this);

  values = {

    root: {

      class : 'grid-layout-example'

    }

  }

}
