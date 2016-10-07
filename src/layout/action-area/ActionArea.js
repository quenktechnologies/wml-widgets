import { View, Widget } from 'wmljs/lib/runtime';
import action_area from './wml/action_area.wml';

/**
 * ActionArea
 */
class ActionArea extends Widget {

    constructor(attrs, children) {

        super(attrs, children);

        this.view = new View(action_area, this);

    }

    noop() {

    }

    render() {

        return this.view.render();

    }

}

export default ActionArea
