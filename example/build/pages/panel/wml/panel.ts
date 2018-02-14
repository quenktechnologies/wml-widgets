import * as ___wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/wml-widgets/layout/grid/Grid';;
import {
    Panel,
    Header,
    Body,
    Footer
} from '@package/wml-widgets/layout/panel';;
import {
    Fragment
} from '@package/wml-widgets/layout/fragment/Fragment';;
import {
    PanelPage
} from '../';



export class Main extends ___wml.AppView < PanelPage > {

    constructor(___context: PanelPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < PanelPage > ) =>
            ___wml.widget(Grid, {
                html: {},
                wml: {}
            }, [___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'size': 4
                }
            }, [___wml.widget(Panel, {
                html: {},
                wml: {}
            }, [___wml.widget(Body, {
                html: {},
                wml: {}
            }, [___wml.text(`Body only.`)], ___view)], ___view)], ___view), ___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'size': 4
                }
            }, [___wml.widget(Panel, {
                html: {},
                wml: {}
            }, [___wml.widget(Header, {
                html: {},
                wml: {}
            }, [___wml.text(`With Header`)], ___view), ___wml.widget(Body, {
                html: {},
                wml: {}
            }, [___wml.text(`Lorem impsum dilium net set.`)], ___view)], ___view)], ___view), ___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'size': 4
                }
            }, [___wml.widget(Panel, {
                html: {},
                wml: {}
            }, [___wml.widget(Header, {
                html: {},
                wml: {}
            }, [___wml.text(`With Footer`)], ___view), ___wml.widget(Body, {
                html: {},
                wml: {}
            }, [___wml.text(`Lorem impsum dilium net set.`)], ___view), ___wml.widget(Footer, {
                html: {},
                wml: {}
            }, [___wml.text(`Meh foot.`)], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}