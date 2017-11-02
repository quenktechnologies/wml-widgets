import * as $wml from '@quenk/wml';
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



export class Main extends $wml.AppView < TextFieldPage > {

    constructor(context: TextFieldPage) {

        super(context);

        this.template = (___context: TextFieldPage, ___view: $wml.AppView < TextFieldPage > ) =>
            $wml.widget(Grid, {
                html: {},
                wml: {}
            }, [$wml.widget(Row, {
                html: {},
                wml: {}
            }, [$wml.widget(Column, {
                html: {},
                wml: {}
            }, [$wml.node('p', {
                html: {},
                wml: {}
            }, [$wml.text(`The value of the input is:`)], ___view), $wml.node('p', {
                html: {},
                wml: {
                    'id': `content`
                }
            }, [$wml.domify(`(Nothing)`)], ___view), $wml.node('p', {
                html: {},
                wml: {}
            }, [$wml.widget(TextField, {
                html: {},
                wml: {
                    'id': `text`
                },
                ww: {
                    'name': `text`,
                    'onChange': ___context.onChange
                }
            }, [], ___view)], ___view)], ___view)], ___view), $wml.widget(Row, {
                html: {},
                wml: {}
            }, [$wml.widget(Column, {
                html: {},
                wml: {}
            }, [$wml.node('p', {
                html: {},
                wml: {}
            }, [$wml.text(`The one uses rows to render a text area:`)], ___view), $wml.node('p', {
                html: {},
                wml: {}
            }, [$wml.widget(TextField, {
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