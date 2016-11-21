import { View, Widget } from 'wmljs/lib/runtime';
import list_group_item from './list_group_item.wml';

/**
 * ListGroupItem
 */
class ListGroupItem extends Widget {

    constructor() {

        super(...arguments);

        this.view = new View(list_group_item, this);

    }

    getClass() {

        var cls = 'list-group';
        var variant = `list-group-item-${this.attributes.read('wat:variant', 'default')}`;

        return `${cls} ${variant}`;

    }

    render() {

        return this.view.render();

    }

}

export default ListGroupItem
