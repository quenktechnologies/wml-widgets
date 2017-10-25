import * as $wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/self/layout/grid/Grid';;
import {
    Panel,
    Header,
    Body
} from '@package/self/layout/panel/Panel';;
import {
    App
} from '../app';



export class Main extends $wml.AppView < App > {

    constructor(context: App) {

        super(context);

        this.template = (___context: App, ___view: $wml.AppView < App > ) =>
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
                    size: 4
                }
            }, [$wml.widget(Panel, {
                html: {},
                wml: {}
            }, [$wml.widget(Header, {
                html: {},
                wml: {}
            }, [$wml.text(`Funding`)], ___view), $wml.widget(Body, {
                html: {},
                wml: {}
            }, [$wml.text(`$742.00`)], ___view)], ___view)], ___view), $wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    size: 4
                }
            }, [$wml.widget(Panel, {
                html: {},
                wml: {}
            }, [$wml.widget(Header, {
                html: {},
                wml: {}
            }, [$wml.text(`Clients`)], ___view), $wml.widget(Body, {
                html: {},
                wml: {}
            }, [$wml.text(`3`)], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}