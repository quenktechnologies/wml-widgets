import * as $wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/self/layout/grid/Grid';;
import {
    BreadCrumbs
} from '@package/self/nav/breadcrumbs/BreadCrumbs';;
import {
    Item
} from '@package/self/nav/breadcrumbs/Item';;
import {
    Link
} from '@package/self/nav/link/Link';;
import {
    BreadCrumbsPage
} from '../';



export class Main extends $wml.AppView < BreadCrumbsPage > {

    constructor(context: BreadCrumbsPage) {

        super(context);

        this.template = (___context: BreadCrumbsPage, ___view: $wml.AppView < BreadCrumbsPage > ) =>
            $wml.widget(Grid, {
                html: {},
                wml: {}
            }, [$wml.widget(Row, {
                html: {},
                wml: {}
            }, [$wml.widget(Column, {
                html: {},
                wml: {}
            }, [$wml.widget(BreadCrumbs, {
                html: {},
                wml: {}
            }, [$wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Link, {
                html: {},
                wml: {},
                ww: {
                    'text': `One`
                }
            }, [], ___view)], ___view), $wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Link, {
                html: {},
                wml: {},
                ww: {
                    'text': `Two`
                }
            }, [], ___view)], ___view), $wml.widget(Item, {
                html: {},
                wml: {}
            }, [$wml.widget(Link, {
                html: {},
                wml: {},
                ww: {
                    'text': `Three`
                }
            }, [], ___view)], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}