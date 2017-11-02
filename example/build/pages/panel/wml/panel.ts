import * as $wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/self/layout/grid/Grid';;
import {
    Panel,
    Header,
    Body,
    Footer
} from '@package/self/layout/panel/Panel';;
import {
    Fragment
} from '@package/self/layout/fragment/Fragment';;
import {
    PanelPage
} from '../';



export class Main extends $wml.AppView < PanelPage > {

    constructor(context: PanelPage) {

        super(context);

        this.template = (___context: PanelPage, ___view: $wml.AppView < PanelPage > ) =>
            $wml.widget(Grid, {
                html: {},
                wml: {}
            }, [$wml.widget(Row, {
                html: {},
                wml: {}
            }, [$wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'size': 4
                }
            }, [$wml.widget(Panel, {
                html: {},
                wml: {}
            }, [$wml.widget(Body, {
                html: {},
                wml: {}
            }, [$wml.text(`Body only.`)], ___view)], ___view)], ___view), $wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'size': 4
                }
            }, [$wml.widget(Panel, {
                html: {},
                wml: {}
            }, [$wml.widget(Header, {
                html: {},
                wml: {}
            }, [$wml.text(`With Header`)], ___view), $wml.widget(Body, {
                html: {},
                wml: {}
            }, [$wml.text(`Lorem impsum dilium net set.`)], ___view)], ___view)], ___view), $wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'size': 4
                }
            }, [$wml.widget(Panel, {
                html: {},
                wml: {}
            }, [$wml.widget(Header, {
                html: {},
                wml: {}
            }, [$wml.text(`With Footer`)], ___view), $wml.widget(Body, {
                html: {},
                wml: {}
            }, [$wml.text(`Lorem impsum dilium net set.`)], ___view), $wml.widget(Footer, {
                html: {},
                wml: {}
            }, [$wml.text(`Meh foot.`)], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}