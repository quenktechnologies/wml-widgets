import * as ___wml from '@quenk/wml';
import {
    Item as ItemContext
} from '../Item';;
import {
    BreadCrumbs as BreadCrumbsContext
} from '../BreadCrumbs';

export class BreadCrumbs extends ___wml.AppView < BreadCrumbsContext > {

    constructor(___context: BreadCrumbsContext) {

        super(___context);

        this.template = (___view: ___wml.AppView < BreadCrumbsContext > ) =>
            ___wml.node('ol', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

};
export class Item extends ___wml.AppView < ItemContext > {

    constructor(___context: ItemContext) {

        super(___context);

        this.template = (___view: ___wml.AppView < ItemContext > ) =>
            ___wml.node('li', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}