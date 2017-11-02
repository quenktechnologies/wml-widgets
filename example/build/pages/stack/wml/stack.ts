import * as $wml from '@quenk/wml';
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



export class Main extends $wml.AppView < StackPage > {

    constructor(context: StackPage) {

        super(context);

        this.template = (___context: StackPage, ___view: $wml.AppView < StackPage > ) =>
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
                    'size': 4
                }
            }, [$wml.node('p', {
                html: {},
                wml: {}
            }, [$wml.text(`Members: `), $wml.node('b', {
                html: {},
                wml: {
                    'id': `selected`
                }
            }, [$wml.domify(___context.values.text)], ___view), $wml.text(`.`)], ___view), $wml.node('p', {
                html: {},
                wml: {}
            }, [$wml.widget(Stack, {
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