import * as ___wml from '@quenk/wml';
import {
    PageExample
} from '../../../page-example';;
import {
    Breadcrumb,
    Item
} from '../../../../../lib/content/nav/breadcrumb';;
import {
    Link
} from '../../../../../lib/content/nav/link';;
import {
    BreadcrumbPage
} from '../';



export class Main extends ___wml.AppView < BreadcrumbPage > {

    constructor(___context: BreadcrumbPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < BreadcrumbPage > ) =>
            ___wml.widget(PageExample, {
                html: {},
                wml: {}
            }, [___wml.widget(Breadcrumb, {
                html: {},
                wml: {}
            }, [___wml.widget(Item, {
                html: {},
                wml: {}
            }, [___wml.widget(Link, {
                html: {},
                wml: {},
                ww: {
                    'text': `One`
                }
            }, [], ___view)], ___view), ___wml.widget(Item, {
                html: {},
                wml: {}
            }, [___wml.widget(Link, {
                html: {},
                wml: {},
                ww: {
                    'text': `Two`
                }
            }, [], ___view)], ___view), ___wml.widget(Item, {
                html: {},
                wml: {}
            }, [___wml.widget(Link, {
                html: {},
                wml: {},
                ww: {
                    'text': `Three`
                }
            }, [], ___view)], ___view), ___wml.widget(Item, {
                html: {},
                wml: {},
                ww: {
                    'active': true
                }
            }, [___wml.text(`

	Four

     `)], ___view)], ___view)], ___view);

    }

}