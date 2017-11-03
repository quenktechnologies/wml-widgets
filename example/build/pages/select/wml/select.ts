import * as ___wml from '@quenk/wml';
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



export class Main extends ___wml.AppView < SelectPage > {

    constructor(context: SelectPage) {

        super(context);

        this.template = (___context: SelectPage, ___view: ___wml.AppView < SelectPage > ) =>
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
            }, [___wml.text(`You selected: `), ___wml.node('b', {
                html: {},
                wml: {
                    'id': `selected`
                }
            }, [___wml.text(`(None)`)], ___view), ___wml.text(`.`)], ___view), ___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.widget(Select, {
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