import { Component, Attrs } from '@quenk/wml-runtime';
import { Main } from './wml/busy_indicator';

/**
 * BusyIndicator provides a 'hamburger' menu button.
 */
export class BusyIndicator extends Component<Attrs> {

    view = new Main(this);

}

export default BusyIndicator
