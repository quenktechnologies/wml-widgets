import * as ___wml from '@quenk/wml';
import {
    App
} from '../app';;
import {
    Menu,
    Link,
    Header,
    SubMenu
} from '@package/self/nav/menu';



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
            }, [], ___view), ___wml.widget(Header, {
                html: {},
                wml: {},
                ww: {
                    'text': `Layout`
                }
            }, [], ___view), ___wml.widget(SubMenu, {
                html: {},
                wml: {}
            }, [___wml.widget(Link, {
                html: {},
                wml: {
                    'group': `links`
                },
                ww: {
                    'name': `panel`,
                    'href': `#/panel`,
                    'onClick': ___context.navigate,
                    'active': (___context.page === `panel`),
                    'text': `Panels`
                }
            }, [], ___view), ___wml.widget(Link, {
                html: {},
                wml: {
                    'group': `links`
                },
                ww: {
                    'name': `list-group`,
                    'href': `#/list-group`,
                    'onClick': ___context.navigate,
                    'active': (___context.page === `list-group`),
                    'text': `List Group`
                }
            }, [], ___view)], ___view), ___wml.widget(Header, {
                html: {},
                wml: {},
                ww: {
                    'text': `Table`
                }
            }, [], ___view), ___wml.widget(SubMenu, {
                html: {},
                wml: {}
            }, [___wml.widget(Link, {
                html: {},
                wml: {
                    'group': `links`
                },
                ww: {
                    'name': `table`,
                    'href': `#/table`,
                    'onClick': ___context.navigate,
                    'active': (___context.page === `table`),
                    'text': `Table`
                }
            }, [], ___view)], ___view), ___wml.widget(Header, {
                html: {},
                wml: {},
                ww: {
                    'text': `Control`
                }
            }, [], ___view), ___wml.widget(SubMenu, {
                html: {},
                wml: {}
            }, [___wml.widget(Link, {
                html: {},
                wml: {
                    'group': `links`
                },
                ww: {
                    'name': `text-field`,
                    'href': `#/text-field`,
                    'onClick': ___context.navigate,
                    'active': (___context.page === `text-field`),
                    'text': `Text Field`
                }
            }, [], ___view), ___wml.widget(Link, {
                html: {},
                wml: {
                    'group': `links`
                },
                ww: {
                    'name': `date`,
                    'href': `#/date`,
                    'onClick': ___context.navigate,
                    'active': (___context.page === `date`),
                    'text': `Date`
                }
            }, [], ___view), ___wml.widget(Link, {
                html: {},
                wml: {
                    'group': `links`
                },
                ww: {
                    'name': `select`,
                    'href': `#/select`,
                    'onClick': ___context.navigate,
                    'active': (___context.page === `select`),
                    'text': `Select`
                }
            }, [], ___view), ___wml.widget(Link, {
                html: {},
                wml: {
                    'group': `links`
                },
                ww: {
                    'name': `autocomplete`,
                    'href': `#/autocomplete`,
                    'onClick': ___context.navigate,
                    'active': (___context.page === `autocomplete`),
                    'text': `Autocomplete`
                }
            }, [], ___view), ___wml.widget(Link, {
                html: {},
                wml: {
                    'group': `links`
                },
                ww: {
                    'name': `button-select`,
                    'href': `#/button-select`,
                    'onClick': ___context.navigate,
                    'active': (___context.page === `button-select`),
                    'text': `Button Select`
                }
            }, [], ___view), ___wml.widget(Link, {
                html: {},
                wml: {
                    'group': `links`
                },
                ww: {
                    'name': `checkbox`,
                    'href': `#/checkbox`,
                    'onClick': ___context.navigate,
                    'active': (___context.page === `checkbox`),
                    'text': `Checkbox`
                }
            }, [], ___view), ___wml.widget(Link, {
                html: {},
                wml: {
                    'group': `links`
                },
                ww: {
                    'name': `switch`,
                    'href': `#/switch`,
                    'onClick': ___context.navigate,
                    'active': (___context.page === `switch`),
                    'text': `Switch`
                }
            }, [], ___view), ___wml.widget(Link, {
                html: {},
                wml: {
                    'group': `links`
                },
                ww: {
                    'name': `tabs`,
                    'href': `#/tabs`,
                    'onClick': ___context.navigate,
                    'active': (___context.page === `tabs`),
                    'text': `Tabs`
                }
            }, [], ___view), ___wml.widget(Link, {
                html: {},
                wml: {
                    'group': `links`
                },
                ww: {
                    'name': `stack`,
                    'href': `#/stack`,
                    'onClick': ___context.navigate,
                    'active': (___context.page === `stack`),
                    'text': `Stack`
                }
            }, [], ___view), ___wml.widget(Link, {
                html: {},
                wml: {
                    'group': `links`
                },
                ww: {
                    'name': `search-stack`,
                    'href': `#/search-stack`,
                    'onClick': ___context.navigate,
                    'active': (___context.page === `search-stack`),
                    'text': `Search Stack`
                }
            }, [], ___view)], ___view), ___wml.widget(Header, {
                html: {},
                wml: {},
                ww: {
                    'text': `App`
                }
            }, [], ___view), ___wml.widget(SubMenu, {
                html: {},
                wml: {}
            }, [___wml.widget(Link, {
                html: {},
                wml: {
                    'group': `links`
                },
                ww: {
                    'name': `busy-indicator`,
                    'href': `#/busy-indicator`,
                    'onClick': ___context.navigate,
                    'active': (___context.page === `busy-indicator`),
                    'text': `Busy Indicator`
                }
            }, [], ___view)], ___view), ___wml.widget(Header, {
                html: {},
                wml: {},
                ww: {
                    'text': `Nav`
                }
            }, [], ___view), ___wml.widget(SubMenu, {
                html: {},
                wml: {}
            }, [___wml.widget(Link, {
                html: {},
                wml: {
                    'group': `links`
                },
                ww: {
                    'name': `breadcrumbs`,
                    'href': `#/breadcrumbs`,
                    'onClick': ___context.navigate,
                    'active': (___context.page === `breadcrumbs`),
                    'text': `BreadCrumbs`
                }
            }, [], ___view)], ___view), ___wml.widget(Header, {
                html: {},
                wml: {},
                ww: {
                    'text': `Menu`
                }
            }, [], ___view), ___wml.widget(SubMenu, {
                html: {},
                wml: {}
            }, [___wml.widget(Link, {
                html: {},
                wml: {
                    'group': `links`
                },
                ww: {
                    'name': `menu`,
                    'href': `#/menu`,
                    'onClick': ___context.navigate,
                    'active': (___context.page === `menu`),
                    'text': `Menu`
                }
            }, [], ___view), ___wml.widget(Link, {
                html: {},
                wml: {
                    'group': `links`
                },
                ww: {
                    'name': `button-menu`,
                    'href': `#/button-menu`,
                    'onClick': ___context.navigate,
                    'active': (___context.page === `button-menu`),
                    'text': `Button Menu`
                }
            }, [], ___view)], ___view)], ___view);

    }

}