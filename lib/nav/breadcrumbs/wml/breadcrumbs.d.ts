import * as $wml from '@quenk/wml';
import { Item as ItemContext } from '../Item';
import { BreadCrumbs as BreadCrumbsContext } from '../BreadCrumbs';
export declare class BreadCrumbs extends $wml.AppView<BreadCrumbsContext> {
    constructor(context: BreadCrumbsContext);
}
export declare class Item extends $wml.AppView<ItemContext> {
    constructor(context: ItemContext);
}
