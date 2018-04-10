import * as ___wml from '@quenk/wml';
import {
    PageExample
} from '../../../page-example';;
import {
    Toolbar
} from '../../../../../lib/control/toolbar';;
import {
    Button
} from '../../../../../lib/control/button';;
import {
    ButtonGroup
} from '../../../../../lib/control/button-group';;
import {
    ToolbarPage
} from '../';



export class Main extends ___wml.AppView < ToolbarPage > {

    constructor(___context: ToolbarPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < ToolbarPage > ) =>
            ___wml.widget(PageExample, {
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
            }, [], ___view)], ___view)], ___view);

    }

}