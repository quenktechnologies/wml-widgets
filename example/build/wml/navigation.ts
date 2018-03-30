import * as ___wml from '@quenk/wml';
import {
    App
} from '../app';;
import {
    Menu,
    Link,
    Header,
    SubMenu
} from '../../../lib/nav/menu';



export class Navigation extends ___wml.AppView < App > {

    constructor(___context: App) {

        super(___context);

        this.template = (___view: ___wml.AppView < App > ) =>
            ___wml.widget(Menu, {
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
            }, [], ___view), ___wml.map(___context.links, function _map(items, section: string) {
                return ___wml.box(___wml.widget(Header, {
                    html: {},
                    wml: {},
                    ww: {
                        'text': ___context.displayName(section)
                    }
                }, [], ___view), ___wml.widget(SubMenu, {
                    html: {},
                    wml: {}
                }, [___wml.map(___context.sort(items), function _map(_, name: string) {
                    return ___wml.widget(Link, {
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
                    }, [], ___view)
                }, function otherwise() {
                    return document.createDocumentFragment();
                })], ___view))
            }, function otherwise() {
                return document.createDocumentFragment();
            })], ___view);

    }

}