import { AbstractWidget } from '@quenk/wml/lib/runtime';
import { Main } from './wml/busy_indicator';

/**
 * BusyIndicator provides a 'hamburger' menu button.
 */
export class BusyIndicator extends AbstractWidget {

    view = new Main(this);

}

export default BusyIndicator
