import { View, Widget } from '@quenk/wml/lib/runtime';
import list_group_item from './wml/list_group_item';

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
