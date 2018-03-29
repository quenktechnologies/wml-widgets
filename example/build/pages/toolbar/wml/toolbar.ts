import * as ___wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/wml-widgets/layout/grid/Grid';;
import {
    Toolbar
} from '@package/wml-widgets/control/toolbar';;
import {
    Button
} from '@package/wml-widgets/control/button';;
import {
    ButtonGroup
} from '@package/wml-widgets/control/button-group';;
import {
    ToolbarPage
} from '../';



export class Main extends ___wml.AppView < ToolbarPage > {

    constructor(___context: ToolbarPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < ToolbarPage > ) =>
            ___wml.widget(Grid, {
                html: {},
                wml: {}
            }, [___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {}
            }, [___wml.widget(Toolbar, {
                html: {},
                wml: {}
            }, [___wml.widget(Button, {
                html: {},
                wml: {},
                ww: {
                    'text': `Start`
                }
            }, [], ___view), ___wml.widget(ButtonGroup, {
                html: {},
                wml: {}
            }, [___wml.widget(Button, {
                html: {},
                wml: {},
                ww: {
                    'text': `Up`
                }
            }, [], ___view), ___wml.widget(Button, {
                html: {},
                wml: {},
                ww: {
                    'text': `Down`
                }
            }, [], ___view), ___wml.widget(Button, {
                html: {},
                wml: {},
                ww: {
                    'text': `Reset`
                }
            }, [], ___view)], ___view), ___wml.widget(Button, {
                html: {},
                wml: {},
                ww: {
                    'text': `Stop`
                }
            }, [], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}