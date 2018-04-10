import * as ___wml from '@quenk/wml';
import {
    PageExample
} from '../../../page-example';;
import {
    DropDown
} from '../../../../../lib/control/drop-down';;
import {
    Menu,
    Item
} from '../../../../../lib/control/menu';;
import {
    DropDownPage
} from '../';



export class Main extends ___wml.AppView < DropDownPage > {

    constructor(___context: DropDownPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < DropDownPage > ) =>
            ___wml.widget(PageExample, {
                html: {},
                wml: {}
            }, [___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.widget(DropDown, {
                html: {},
                wml: {},
                ww: {
                    'buttonText': `Click Me`
                }
            }, [___wml.widget(Menu, {
                html: {},
                wml: {}
            }, [___wml.widget(Item, {
                html: {},
                wml: {}
            }, [___wml.node('a', {
                html: {
                    'href': `#`,
                    'onclick': ___context.onClick(`You clicked one`)
                },
                wml: {}
            }, [___wml.text(`One`)], ___view)], ___view), ___wml.widget(Item, {
                html: {},
                wml: {}
            }, [___wml.node('a', {
                html: {
                    'href': `#`,
                    'onclick': ___context.onClick(`You clicked two`)
                },
                wml: {}
            }, [___wml.text(`Two`)], ___view)], ___view), ___wml.widget(Item, {
                html: {},
                wml: {}
            }, [___wml.node('a', {
                html: {
                    'href': `#`,
                    'onclick': ___context.onClick(`You clicked three`)
                },
                wml: {}
            }, [___wml.text(`Three`)], ___view)], ___view)], ___view)], ___view), ___wml.widget(DropDown, {
                html: {},
                wml: {},
                ww: {
                    'buttonText': `Me Too`,
                    'autoClose': false
                }
            }, [___wml.node('h1', {
                html: {},
                wml: {}
            }, [___wml.text(`Any flow content can go here!`)], ___view)], ___view)], ___view)], ___view);

    }

}