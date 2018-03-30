import * as ___wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '../../../../../lib/layout/grid/Grid';;
import {
    ButtonMenu
} from '../../../../../lib/menu/button-menu';;
import {
    MenuItem
} from '../../../../../lib/menu';;
import {
    ButtonMenuPage
} from '../';



export class Main extends ___wml.AppView < ButtonMenuPage > {

    constructor(___context: ButtonMenuPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < ButtonMenuPage > ) =>
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
                    'size': 6
                }
            }, [___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.widget(ButtonMenu, {
                html: {},
                wml: {},
                ww: {
                    'text': `Click Me`
                }
            }, [___wml.widget(MenuItem, {
                html: {},
                wml: {}
            }, [___wml.node('a', {
                html: {
                    'href': `#`,
                    'onclick': ___context.onClick(`You clicked one`)
                },
                wml: {}
            }, [___wml.text(`One`)], ___view)], ___view), ___wml.widget(MenuItem, {
                html: {},
                wml: {}
            }, [___wml.node('a', {
                html: {
                    'href': `#`,
                    'onclick': ___context.onClick(`You clicked two`)
                },
                wml: {}
            }, [___wml.text(`Two`)], ___view)], ___view), ___wml.widget(MenuItem, {
                html: {},
                wml: {}
            }, [___wml.node('a', {
                html: {
                    'href': `#`,
                    'onclick': ___context.onClick(`You clicked three`)
                },
                wml: {}
            }, [___wml.text(`Three`)], ___view)], ___view)], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}