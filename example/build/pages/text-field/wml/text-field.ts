import * as ___wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/self/layout/grid/Grid';;
import {
    TextField
} from '@package/self/control/text-field/TextField';;
import {
    TextFieldPage
} from '../';



export class Main extends ___wml.AppView < TextFieldPage > {

    constructor(context: TextFieldPage) {

        super(context);

        this.template = (___context: TextFieldPage, ___view: ___wml.AppView < TextFieldPage > ) =>
            ___wml.widget(Grid, {
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
            }, [___wml.text(`The value of the input is:`)], ___view), ___wml.node('p', {
                html: {},
                wml: {
                    'id': `content`
                }
            }, [___wml.domify(`(Nothing)`)], ___view), ___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.widget(TextField, {
                html: {},
                wml: {
                    'id': `text`
                },
                ww: {
                    'name': `text`,
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
            }, [___wml.text(`The one uses rows to render a text area:`)], ___view), ___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.widget(TextField, {
                html: {},
                wml: {},
                ww: {
                    'name': `text`,
                    'rows': 3,
                    'onChange': ___context.onChange
                }
            }, [], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}