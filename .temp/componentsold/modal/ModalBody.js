import { View, Widget } from '@quenk/wml/lib/runtime';
import modal_body from './wml/modal_body.wml';

/**
 * ModalBody
 */
class ModalBody extends Widget {

    render() {

        return (new View(modal_body, this)).render();

    }

}

export default ModalBody
