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
                    group: `links`
                },
                ww: {
                    active: (___context.page === `home`),
                    name: `home`,
                    onClick: ___context.navigate,
                    text: `Home`
                }
            }, [], ___view)], ___view), $wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Text, {
                html: {},
                wml: {},
                ww: {
                    text: `Layout`
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
                    group: `links`
                },
                ww: {
                    name: `panels`,
                    onClick: ___context.navigate,
                    active: (___context.page === `panels`),
                    text: `Panels`
                }
            }, [], ___view)], ___view)], ___view)], ___view), $wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Link, {
                html: {},
                wml: {
                    group: `links`
                },
                ww: {
                    name: `tables`,
                    onClick: ___context.navigate,
                    active: (___context.page === `tables`),
                    text: `Tables`
                }
            }, [], ___view)], ___view)], ___view);

    }

}