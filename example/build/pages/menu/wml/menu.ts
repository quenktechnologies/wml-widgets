import * as ___wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/wml-widgets/layout/grid/Grid';;
import {
    Menu,
    MenuItem,
    Divider,
    Header
} from '@package/wml-widgets/menu';;
import {
    MenuPage
} from '../';



export class Main extends ___wml.AppView < MenuPage > {

    constructor(___context: MenuPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < MenuPage > ) =>
            ___wml.widget(Grid, {
                html: {},
                wml: {}
            }, [___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {}
            }, [___wml.widget(Menu, {
                html: {},
                wml: {}
            }, [___wml.widget(Header, {
                html: {},
                wml: {},
                ww: {
                    'text': `Heading`
                }
            }, [], ___view), ___wml.widget(MenuItem, {
                html: {},
                wml: {},
                ww: {
                    'disabled': true,
                    'text': `Back`
                }
            }, [], ___view), ___wml.widget(MenuItem, {
                html: {},
                wml: {},
                ww: {
                    'text': `Refresh`
                }
            }, [], ___view), ___wml.widget(Divider, {
                html: {},
                wml: {}
            }, [], ___view), ___wml.widget(MenuItem, {
                html: {},
                wml: {}
            }, [___wml.node('a', {
                html: {
                    'href': `#/menu`
                },
                wml: {}
            }, [___wml.text(`Quit`)], ___view)], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}