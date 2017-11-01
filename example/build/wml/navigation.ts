import * as $wml from '@quenk/wml';
import {
    App
} from '../app';;
import {
    List
} from '@package/self/nav/list/List';;
import {
    Item
} from '@package/self/nav/list/Item';;
import {
    Link
} from '@package/self/nav/link/Link';;
import {
    Text
} from '@package/self/nav/list/Text';



export class Navigation extends $wml.AppView < App > {

    constructor(context: App) {

        super(context);

        this.template = (___context: App, ___view: $wml.AppView < App > ) =>
            $wml.widget(List, {
                html: {},
                wml: {}
            }, [$wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Link, {
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
            }, [], ___view)], ___view), $wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Text, {
                html: {},
                wml: {},
                ww: {
                    'text': `Layout`
                }
            }, [], ___view), $wml.widget(List, {
                html: {},
                wml: {}
            }, [$wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Link, {
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
            }, [], ___view)], ___view)], ___view)], ___view), $wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Text, {
                html: {},
                wml: {},
                ww: {
                    'text': `Table`
                }
            }, [], ___view), $wml.widget(List, {
                html: {},
                wml: {}
            }, [$wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Link, {
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
            }, [], ___view)], ___view)], ___view)], ___view), $wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Text, {
                html: {},
                wml: {},
                ww: {
                    'text': `Control`
                }
            }, [], ___view), $wml.widget(List, {
                html: {},
                wml: {}
            }, [$wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Link, {
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
            }, [], ___view)], ___view), $wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Link, {
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
            }, [], ___view)], ___view), $wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Link, {
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
            }, [], ___view)], ___view), $wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Link, {
                html: {},
                wml: {
                    'group': `links`
                },
                ww: {
                    'name': `search`,
                    'href': `#/search`,
                    'onClick': ___context.navigate,
                    'active': (___context.page === `search`),
                    'text': `Search`
                }
            }, [], ___view)], ___view), $wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Link, {
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
            }, [], ___view)], ___view), $wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Link, {
                html: {},
                wml: {
                    'group': `links`
                },
                ww: {
                    'name': `text-area`,
                    'href': `#/text-area`,
                    'onClick': ___context.navigate,
                    'active': (___context.page === `text-area`),
                    'text': `TextArea`
                }
            }, [], ___view)], ___view), $wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Link, {
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
            }, [], ___view)], ___view), $wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Link, {
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
            }, [], ___view)], ___view), $wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Link, {
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
            }, [], ___view)], ___view), $wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Link, {
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
            }, [], ___view)], ___view), $wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Link, {
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
            }, [], ___view)], ___view)], ___view)], ___view), $wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Text, {
                html: {},
                wml: {},
                ww: {
                    'text': `App`
                }
            }, [], ___view), $wml.widget(List, {
                html: {},
                wml: {}
            }, [$wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Link, {
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
            }, [], ___view)], ___view)], ___view)], ___view), $wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Text, {
                html: {},
                wml: {},
                ww: {
                    'text': `Nav`
                }
            }, [], ___view), $wml.widget(List, {
                html: {},
                wml: {}
            }, [$wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Link, {
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
            }, [], ___view)], ___view)], ___view)], ___view), $wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Text, {
                html: {},
                wml: {},
                ww: {
                    'text': `Menu`
                }
            }, [], ___view), $wml.widget(List, {
                html: {},
                wml: {}
            }, [$wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Link, {
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
            }, [], ___view)], ___view), $wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Link, {
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
            }, [], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}