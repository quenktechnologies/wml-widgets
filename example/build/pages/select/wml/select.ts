import * as $wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/self/layout/grid/Grid';;
import {
    Select
} from '@package/self/control/select/Select';;
import {
    SelectPage
} from '../';



export class Main extends $wml.AppView < SelectPage > {

    constructor(context: SelectPage) {

        super(context);

        this.template = (___context: SelectPage, ___view: $wml.AppView < SelectPage > ) =>
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
            }, [$wml.text(`You selected: `), $wml.node('b', {
                html: {},
                wml: {
                    'id': `selected`
                }
            }, [$wml.text(`(None)`)], ___view), $wml.text(`.`)], ___view), $wml.node('p', {
                html: {},
                wml: {}
            }, [$wml.widget(Select, {
                html: {},
                wml: {
                    'id': `select`
                },
                ww: {
                    'name': `select`,
                    'options': ___context.values.options,
                    'onChange': ___context.onChange
                }
            }, [], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}