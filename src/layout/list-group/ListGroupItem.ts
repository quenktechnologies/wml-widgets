import * as views from './wml/list-group-item';
import * as wml from '@quenk/wml';
import * as names from '@package/self/common/names';
import { ListGroupItemAttrs } from './ListGroupItemAttrs';

/**
 * ListGroupItem 
 */
export class ListGroupItem extends wml.Component<ListGroupItemAttrs> {

    view: wml.View = new views.Main(this);

    values = {

        root: {

            class: names.LIST_GROUP_ITEM

        }

    }

}
