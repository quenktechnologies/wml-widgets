import { View, Widget } from '@quenk/wml/lib/runtime';
import list_group from './list_group.wml';

/**
 * ListGroup
 */
class ListGroup extends Widget {

    render() {

        return View.render(list_group, this);

    }

}

export default ListGroup
