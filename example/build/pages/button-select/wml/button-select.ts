import * as ___wml from '@quenk/wml';
import {
    GridLayout,
    Row,
    Column
} from '../../../../../lib/layout/grid-layout';;
import {
    ButtonSelect,
    MultiButtonSelect
} from '../../../../../lib/control/button-select';;
import {
    ButtonSelectPage
} from '../';



export class Main extends ___wml.AppView < ButtonSelectPage > {

    constructor(___context: ButtonSelectPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < ButtonSelectPage > ) =>
            ___wml.widget(GridLayout, {
                html: {},
                wml: {}
            }, [___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {}
            }, [___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.text(`You selected: `), ___wml.node('b', {
                html: {},
                wml: {
                    'id': `select-content`
                }
            }, [___wml.text(`(None)`)], ___view), ___wml.text(`.`)], ___view), ___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.widget(ButtonSelect, {
                html: {},
                wml: {
                    'id': `select`
                },
                ww: {
                    'name': `select`,
                    'style': `-primary`,
                    'options': ___context.values.options,
                    'onChange': ___context.onChange
                }
            }, [], ___view)], ___view)], ___view)], ___view), ___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {}
            }, [___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.text(`You can also use MultiButtonSelect instead: `), ___wml.node('b', {
                html: {},
                wml: {
                    'id': `multi-content`
                }
            }, [___wml.text(`(None)`)], ___view), ___wml.text(`.`)], ___view), ___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.widget(MultiButtonSelect, {
                html: {},
                wml: {
                    'id': `multi`
                },
                ww: {
                    'name': `multi`,
                    'style': `-primary`,
                    'options': ___context.values.options,
                    'onChange': ___context.onChangeMulti
                }
            }, [], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}