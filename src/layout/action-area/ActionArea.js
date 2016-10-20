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

    /**
     * setContent replaces the content of this view.
     * @param {Renderable} r
     */
    setContent(r) {

        var content = this.view.findById('content');

        while (content.lastChild)
            content.removeChild(content.lastChild);

        content.appendChild(r.render());

    }

    noop() {

    }

    render() {

        return this.view.render();

    }

}

export default ActionArea
