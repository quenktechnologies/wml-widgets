import * as names from '@package/self/common/names';
import * as views from './wml/breadcrumbs';
import { Component, Attrs } from '@quenk/wml';

export interface ItemAttrs extends Attrs {

    ww?: {

        class?: string,

    }

}

/**
 * Item for breadcrumb lists.
 */
export class Item extends Component<ItemAttrs>{

    view = new views.Item(this);

  values  = {

    class : {

      root: names.BREAD_CRUMBS_ITEM

    }

  }

}
