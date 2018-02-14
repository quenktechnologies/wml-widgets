import * as names from '@package/wml-widgets/common/names';
import * as views from './wml/divider';
import * as wml from '@quenk/wml';

/**
 * Divider
 */
export class Divider extends wml.Component<wml.Attrs> {

    view: wml.View = new views.Main(this);

  values = {

    class : {

      root : names.MENU_DIVIDER

    }

  }

}
