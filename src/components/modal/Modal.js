import { View, Widget } from 'wmljs/lib/runtime';
import modal from './wml/modal.wml';

/**
 * Modal
 * NOTE: Using this requires jQuery and boostrap plugin.
 */
class Modal extends Widget {

    constructor(attrs, children) {

        super(attrs, children);

        this.view = new View(modal, this);
        this.modal = null;

    }

    /**
     * put content on to this modal.
     * @param {Renderable} r
     */
    put(r) {

        var root = this.view.findById('root');

        while (root.lastChild)
            root.removeChild(root.lastChild);

        root.appendChild(r.render());

        this.modal.modal(this.attributes.read('wat:options', {
            backdrop: false,
            keyboard: true,
            fade: true,
            show: true
        }));

    }

    render() {

        var ret = this.view.render();

        this.modal = jQuery(ret);
        return ret;

    }

}

export default Modal
