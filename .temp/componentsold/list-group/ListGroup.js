import { View, Widget } from '@quenk/wml/lib/runtime';
import list_group from './wml/list_group';

/**
 * ListGroup
 */
class ListGroup extends Widget {

    render() {

        return View.render(list_group, this);

    }

}

export default ListGroup
