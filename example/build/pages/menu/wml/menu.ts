import * as ___wml from '@quenk/wml';
import {
    PageExample
} from '../../../page-example';;
import {
    Menu,
    Item,
    Divider
} from '../../../../../lib/control/menu';;
import {
    Link
} from '../../../../../lib/content/nav/link';;
import {
    MenuPage
} from '../';



export class Main extends ___wml.AppView < MenuPage > {

    constructor(___context: MenuPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < MenuPage > ) =>
            ___wml.widget(PageExample, {
                html: {},
                wml: {}
            }, [___wml.widget(Menu, {
                html: {},
                wml: {}
            }, [___wml.node('h6', {
                html: {},
                wml: {}
            }, [___wml.text(`Menu`)], ___view), ___wml.widget(Item, {
                html: {},
                wml: {}
            }, [___wml.widget(Link, {
                html: {},
                wml: {},
                ww: {
                    'disabled': true,
                    'text': `Back`
                }
            }, [], ___view)], ___view), ___wml.widget(Item, {
                html: {},
                wml: {}
            }, [___wml.widget(Link, {
                html: {},
                wml: {},
                ww: {
                    'disabled': true,
                    'text': `Refresh`
                }
            }, [], ___view)], ___view), ___wml.widget(Divider, {
                html: {},
                wml: {}
            }, [], ___view), ___wml.widget(Item, {
                html: {},
                wml: {}
            }, [___wml.node('a', {
                html: {
                    'href': `#/menu`
                },
                wml: {}
            }, [___wml.text(`Quit`)], ___view)], ___view)], ___view)], ___view);

    }

}