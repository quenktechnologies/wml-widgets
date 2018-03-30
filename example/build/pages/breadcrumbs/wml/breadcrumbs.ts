import * as ___wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '../../../../../lib/layout/grid/Grid';;
import {
    BreadCrumbs
} from '../../../../../lib/nav/breadcrumbs/BreadCrumbs';;
import {
    Item
} from '../../../../../lib/nav/breadcrumbs/Item';;
import {
    Link
} from '../../../../../lib/nav/link/Link';;
import {
    BreadCrumbsPage
} from '../';



export class Main extends ___wml.AppView < BreadCrumbsPage > {

    constructor(___context: BreadCrumbsPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < BreadCrumbsPage > ) =>
            ___wml.widget(Grid, {
                html: {},
                wml: {}
            }, [___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {}
            }, [___wml.widget(BreadCrumbs, {
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
            }, [], ___view)], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}