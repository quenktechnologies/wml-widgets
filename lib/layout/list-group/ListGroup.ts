import * as wml from '@quenk/wml';
import * as views from './wml/list-group';
import * as names from '@package/self/common/names';
import { ListGroupAttrs } from './ListGroupAttrs';

/**
 * ListGroup is used to create a vertical list of content.
 *
 * Children must be ListGroupItems.
 */
export class ListGroup extends wml.Component<ListGroupAttrs> {

    view: wml.View = new views.Main(this);

    values = {

      root: {

        class: names.LIST_GROUP

      }

    }

}

