import * as $wml from '@quenk/wml';
import {
    Item as ItemContext
} from '../Item';;
import {
    BreadCrumbs as BreadCrumbsContext
} from '../BreadCrumbs';

export class BreadCrumbs extends $wml.AppView < BreadCrumbsContext > {

    constructor(context: BreadCrumbsContext) {

        super(context);

        this.template = (___context: BreadCrumbsContext, ___view: $wml.AppView < BreadCrumbsContext > ) =>
            $wml.node('ol', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);

    }

};
export class Item extends $wml.AppView < ItemContext > {

    constructor(context: ItemContext) {

        super(context);

        this.template = (___context: ItemContext, ___view: $wml.AppView < ItemContext > ) =>
            $wml.node('li', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);

    }

}