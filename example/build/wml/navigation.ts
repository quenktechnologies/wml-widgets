import * as ___wml from '@quenk/wml';
import {
    App
} from '../app';;
import {
    Nav
} from '../../../lib/content/nav';;
import {
    Item
} from '../../../lib/content/nav/item';;
import {
    NavHeader
} from '../../../lib/content/nav/nav-header';;
import {
    Link
} from '../../../lib/content/nav/link';



export class Navigation extends ___wml.AppView < App > {

    constructor(___context: App) {

        super(___context);

        this.template = (___view: ___wml.AppView < App > ) =>
            ___wml.widget(Nav, {
                html: {},
                wml: {},
                ww: {
                    'vertical': true
                }
            }, [___wml.widget(Item, {
                html: {},
                wml: {}
            }, [___wml.widget(Link, {
                html: {},
                wml: {
                    'group': `links`
                },
                ww: {
                    'active': (___context.page === `home`),
                    'name': `home`,
                    'href': `#`,
                    'onClick': ___context.navigate,
                    'text': `Home`
                }
            }, [], ___view)], ___view), ___wml.map(___context.links, function _map(items, section: string) {
                return ___wml.widget(Item, {
                    html: {},
                    wml: {}
                }, [___wml.widget(NavHeader, {
                    html: {},
                    wml: {},
                    ww: {
                        'text': ___context.displayName(section)
                    }
                }, [], ___view), ___wml.widget(Nav, {
                    html: {},
                    wml: {},
                    ww: {
                        'vertical': true
                    }
                }, [___wml.map(___context.sort(items), function _map(_, name: string) {
                    return ___wml.widget(Item, {
                        html: {},
                        wml: {}
                    }, [___wml.widget(Link, {
                        html: {},
                        wml: {
                            'group': `links`
                        },
                        ww: {
                            'name': name,
                            'href': `#/${name}`,
                            'onClick': ___context.navigate,
                            'active': (___context.page === `${name}`),
                            'text': ___context.displayName(name)
                        }
                    }, [], ___view)], ___view)
                }, function otherwise() {
                    return document.createDocumentFragment();
                })], ___view)], ___view)
            }, function otherwise() {
                return document.createDocumentFragment();
            })], ___view);

    }

}