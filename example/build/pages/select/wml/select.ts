import * as ___wml from '@quenk/wml';
import {
    GridLayout,
    Row,
    Column
} from '../../../../../lib/layout/grid-layout';;
import {
    Select
} from '../../../../../lib/control/select';;
import {
    SelectPage,
    Result
} from '../';



export class Main extends ___wml.AppView < SelectPage > {

    constructor(___context: SelectPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < SelectPage > ) =>
            ___wml.widget(GridLayout, {
                html: {},
                wml: {}
            }, [___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'size': 6
                }
            }, [___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.text(`You selected: `), ___wml.node('b', {
                html: {},
                wml: {
                    'id': ___context.values.autocomplete.name
                }
            }, [___wml.text(`(nothing)`)], ___view), ___wml.text(`.`)], ___view), ___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.widget(Select, {
                html: {},
                wml: {
                    'id': ___context.values.autocomplete.id
                },
                ww: {
                    'name': ___context.values.autocomplete.name,
                    'stringifier': (r: Result) => r.value,
                    'onSearch': ___context.values.autocomplete.onSearch,
                    'onSelect': ___context.values.autocomplete.onSelect
                }
            }, [], ___view)], ___view)], ___view)], ___view), ___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'size': 6
                }
            }, [___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.text(`You selected: `), ___wml.node('b', {
                html: {},
                wml: {
                    'id': ___context.values.native.name
                }
            }, [___wml.text(`(nothing)`)], ___view), ___wml.text(`.`)], ___view), ___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.widget(Select, {
                html: {},
                wml: {
                    'id': ___context.values.native.id
                },
                ww: {
                    'name': ___context.values.native.name,
                    'readOnly': true,
                    'stringifier': (r: Result) => r.value,
                    'options': ___context.values.native.options,
                    'onSearch': ___context.values.native.onSearch,
                    'onSelect': ___context.values.native.onSelect
                }
            }, [], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}