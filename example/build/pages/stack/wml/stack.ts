import * as ___wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/self/layout/grid/Grid';;
import {
    Stack
} from '@package/self/control/stack';;
import {
    StackPage
} from '../';



export class Main extends ___wml.AppView < StackPage > {

    constructor(___context: StackPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < StackPage > ) =>
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
                    'size': 4
                }
            }, [___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.text(`Members: `), ___wml.node('b', {
                html: {},
                wml: {
                    'id': `selected`
                }
            }, [___wml.domify(___context.values.text)], ___view), ___wml.text(`.`)], ___view), ___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.widget(Stack, {
                html: {},
                wml: {},
                ww: {
                    'name': `stack`,
                    'value': ___context.values.values,
                    'decorator': ___context.values.decorator,
                    'onChange': ___context.onChange
                }
            }, [], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}