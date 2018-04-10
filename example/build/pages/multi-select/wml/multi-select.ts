import * as ___wml from '@quenk/wml';
import {
    GridLayout,
    Row,
    Column
} from '../../../../../lib/layout/grid-layout';;
import {
    MultiSelect
} from '../../../../../lib/control/multi-select';;
import {
    MultiSelectPage,
    Result
} from '../';



export class Main extends ___wml.AppView < MultiSelectPage > {

    constructor(___context: MultiSelectPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < MultiSelectPage > ) =>
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
                    'id': `text`
                }
            }, [___wml.domify(___context.values.text())], ___view), ___wml.text(`.`)], ___view), ___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.widget(MultiSelect, {
                html: {},
                wml: {
                    'id': ___context.values.id
                },
                ww: {
                    'name': ___context.values.name,
                    'value': ___context.values.selected,
                    'decorator': (r: Result) => r.label,
                    'onChange': ___context.onChange,
                    'onSearch': ___context.onSearch
                }
            }, [], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}