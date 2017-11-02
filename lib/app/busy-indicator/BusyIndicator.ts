import * as wml from '@quenk/wml';
import { Main } from './wml/busy_indicator';

/**
 * BusyIndicator provides a 'hamburger' menu button.
 */
export class BusyIndicator extends wml.Component<wml.Attrs> {

    view = new Main(this);

  values = {

    class : 'loading'

  }

}
