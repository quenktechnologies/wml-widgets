import * as names from '@package/self/common/names';
import * as views from './wml/item';
import * as wml from '@quenk/wml';
import { concat } from '@package/self/common/util';
import { ItemClickedEvent } from './ItemClickedEvent';

export interface Attrs extends wml.Attrs {

    ww?: {

        name?: string,
        active?: boolean,
        onClick?: (e: ItemClickedEvent) => void,

    }

}

/**
 * Item wraps content in a navigation list.
 *
 * Items should not have any siblings that are not other Items.
 */
export class Item extends wml.Component<Attrs> {

    view: wml.View = new views.Main(this);

    values = {

        id: {

            root: 'root'

        },
        class: {

            root: concat(names.NAV_LIST_ITEM,
                (this.attrs.ww && this.attrs.ww.active) ? names.ACTIVE : null)

        }

    }

    /**
     * activate this nav list Item.
     */
    activate(): void {

        this.view.findById(this.values.id.root)
            .map((w: Element) => {
                w.classList.remove(names.ACTIVE);
                w.classList.add(names.ACTIVE);
            });

    }

    /**
     * inactivate this nav list item.
     */
    inactivate(): void {

        this.view.findById(this.values.id.root)
            .map((w: Element) => w.classList.remove(names.ACTIVE));


    }


}
