import * as $wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/self/layout/grid/Grid';;
import {
    ButtonMenu
} from '@package/self/menu/button-menu';;
import {
    MenuItem
} from '@package/self/menu';;
import {
    ButtonMenuPage
} from '../';



export class Main extends $wml.AppView < ButtonMenuPage > {

    constructor(context: ButtonMenuPage) {

        super(context);

        this.template = (___context: ButtonMenuPage, ___view: $wml.AppView < ButtonMenuPage > ) =>
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
                    'size': 6
                }
            }, [$wml.node('p', {
                html: {},
                wml: {}
            }, [$wml.widget(ButtonMenu, {
                html: {},
                wml: {},
                ww: {
                    'text': `Click Me`
                }
            }, [$wml.widget(MenuItem, {
                html: {},
                wml: {}
            }, [$wml.node('a', {
                html: {
                    'href': `#`,
                    'onclick': ___context.onClick(`You clicked one`)
                },
                wml: {}
            }, [$wml.text(`One`)], ___view)], ___view), $wml.widget(MenuItem, {
                html: {},
                wml: {}
            }, [$wml.node('a', {
                html: {
                    'href': `#`,
                    'onclick': ___context.onClick(`You clicked two`)
                },
                wml: {}
            }, [$wml.text(`Two`)], ___view)], ___view), $wml.widget(MenuItem, {
                html: {},
                wml: {}
            }, [$wml.node('a', {
                html: {
                    'href': `#`,
                    'onclick': ___context.onClick(`You clicked three`)
                },
                wml: {}
            }, [$wml.text(`Three`)], ___view)], ___view)], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}