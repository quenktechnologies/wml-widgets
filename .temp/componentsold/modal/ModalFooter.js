import { View, Widget } from '@quenk/wml/lib/runtime';
import footer from './wml/modal_footer.wml';

/**
 * ModalFooter
 */
class ModalFooter extends Widget {

    render() {

        return (new View(footer, this)).render();

    }

}

export default ModalFooter
