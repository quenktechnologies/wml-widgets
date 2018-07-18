import * as ___wml from '@quenk/wml';
import {
    GridLayout,
    Row,
    Column
} from '../../../../../lib/layout/grid-layout';;
import {
    Select
} from '../../../../../lib/control/native/select';;
import {
    NativeSelectPage
} from '../';



export class Main extends ___wml.AppView < NativeSelectPage > {

    constructor(___context: NativeSelectPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < NativeSelectPage > ) =>
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