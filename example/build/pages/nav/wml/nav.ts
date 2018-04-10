import * as ___wml from '@quenk/wml';
import {
    Nav
} from '../../../../../lib/content/nav';;
import {
    Item
} from '../../../../../lib/content/nav/item';;
import {
    Link
} from '../../../../../lib/content/nav/link';;
import {
    PageExample
} from '../../../page-example';;
import {
    NavPage
} from '../';



export class Main extends ___wml.AppView < NavPage > {

    constructor(___context: NavPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < NavPage > ) =>
            ___wml.widget(PageExample, {
                html: {},
                wml: {}
            }, [___wml.widget(Nav, {
                html: {},
                wml: {}
            }, [___wml.map(___context.links, function _map(_, key: string) {
                return ___wml.widget(Item, {
                    html: {},
                    wml: {}
                }, [___wml.widget(Link, {
                    html: {},
                    wml: {
                        'id': key,
                        'group': `links`
                    },
                    ww: {
                        'name': key,
                        'onClick': ___context.navigate,
                        'text': key
                    }
                }, [], ___view)], ___view)
            }, function otherwise() {
                return document.createDocumentFragment();
            })], ___view)], ___view);

    }

}