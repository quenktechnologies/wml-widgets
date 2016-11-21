import { View, Widget } from 'wmljs/lib/runtime';
import * as Class from 'wat-classes';
import overlay from './overlay.wml';

/**
 * Overlay
 */
class Overlay extends Widget {

    constructor(attrs, children) {

        super(attrs, children);

        this.view = new View(overlay, this);

    }

    render() {

        return this.view.render();

    }

}
export default Overlay
