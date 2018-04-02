import * as ___wml from '@quenk/wml';
import {
    GridLayout,
    Row,
    Column
} from '../../../../../lib/layout/grid-layout';;
import {
    Panel,
    PanelHeader,
    PanelBody,
    PanelFooter
} from '../../../../../lib/layout/panel';;
import {
    Fragment
} from '../../../../../lib/layout/fragment';;
import {
    PanelPage
} from '../';



export class Main extends ___wml.AppView < PanelPage > {

    constructor(___context: PanelPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < PanelPage > ) =>
            ___wml.widget(GridLayout, {
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
            }, [___wml.widget(PanelBody, {
                html: {},
                wml: {}
            }, [___wml.text(`PanelBody only.`)], ___view)], ___view)], ___view), ___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'size': 4
                }
            }, [___wml.widget(Panel, {
                html: {},
                wml: {}
            }, [___wml.widget(PanelHeader, {
                html: {},
                wml: {}
            }, [___wml.text(`With PanelHeader`)], ___view), ___wml.widget(PanelBody, {
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
            }, [___wml.widget(PanelHeader, {
                html: {},
                wml: {}
            }, [___wml.text(`With PanelFooter`)], ___view), ___wml.widget(PanelBody, {
                html: {},
                wml: {}
            }, [___wml.text(`Lorem impsum dilium net set.`)], ___view), ___wml.widget(PanelFooter, {
                html: {},
                wml: {}
            }, [___wml.text(`Meh foot.`)], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}