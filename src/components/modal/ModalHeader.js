import { View, Widget } from 'wmljs/lib/runtime';
import header from './wml/modal_header.wml';

/**
 * ModalHeader
 */
class ModalHeader extends Widget {

    render() {

        return (new View(header, this)).render();

    }

}

export default ModalHeader
