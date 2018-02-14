import * as ___wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/wml-widgets/layout/grid/Grid';;
import {
    Button
} from '@package/wml-widgets/control/button';;
import {
    ButtonGroup
} from '@package/wml-widgets/control/button-group';;
import {
    ButtonGroupPage
} from '../';



export class Main extends ___wml.AppView < ButtonGroupPage > {

    constructor(___context: ButtonGroupPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < ButtonGroupPage > ) =>
            ___wml.widget(Grid, {
                html: {},
                wml: {}
            }, [___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {}
            }, [___wml.widget(ButtonGroup, {
                html: {},
                wml: {}
            }, [___wml.widget(Button, {
                html: {},
                wml: {},
                ww: {
                    'text': `one`
                }
            }, [], ___view), ___wml.widget(Button, {
                html: {},
                wml: {},
                ww: {
                    'text': `three`
                }
            }, [], ___view), ___wml.widget(Button, {
                html: {},
                wml: {},
                ww: {
                    'text': `four`
                }
            }, [], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}