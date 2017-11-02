import * as $wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/self/layout/grid/Grid';;
import {
    Menu,
    MenuItem,
    Divider,
    Header
} from '@package/self/menu';;
import {
    MenuPage
} from '../';



export class Main extends $wml.AppView < MenuPage > {

    constructor(context: MenuPage) {

        super(context);

        this.template = (___context: MenuPage, ___view: $wml.AppView < MenuPage > ) =>
            $wml.widget(Grid, {
                html: {},
                wml: {}
            }, [$wml.widget(Row, {
                html: {},
                wml: {}
            }, [$wml.widget(Column, {
                html: {},
                wml: {}
            }, [$wml.widget(Menu, {
                html: {},
                wml: {}
            }, [$wml.widget(Header, {
                html: {},
                wml: {},
                ww: {
                    'text': `Heading`
                }
            }, [], ___view), $wml.widget(MenuItem, {
                html: {},
                wml: {},
                ww: {
                    'disabled': true,
                    'text': `Back`
                }
            }, [], ___view), $wml.widget(MenuItem, {
                html: {},
                wml: {},
                ww: {
                    'text': `Refresh`
                }
            }, [], ___view), $wml.widget(Divider, {
                html: {},
                wml: {}
            }, [], ___view), $wml.widget(MenuItem, {
                html: {},
                wml: {}
            }, [$wml.node('a', {
                html: {
                    'href': `#/menu`
                },
                wml: {}
            }, [$wml.text(`Quit`)], ___view)], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}