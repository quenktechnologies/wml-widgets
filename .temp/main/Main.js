import { View, Widget } from '@quenk/wml/lib/runtime';
import main from './wml/main.wml';

/**
 * Main area for content in the layout.
 */
class Main extends Widget {

    constructor(attrs, children) {

        super(attrs, children);
        this.view = new View(main, this);

    }

    /**
     * setContent replaces the content of this Main view.
     * @param {Renderable} r
     */
    setContent(r) {

        var root = this.view.findById('root');

        while (root.lastChild)
            root.removeChild(root.lastChild);

        root.appendChild(r.render());


    }

    render() {

        return this.view.render();

    }

}
export default Main
