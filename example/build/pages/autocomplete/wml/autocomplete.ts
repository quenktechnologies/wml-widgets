import * as ___wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/wml-widgets/layout/grid/Grid';;
import {
    Autocomplete
} from '@package/wml-widgets/control/autocomplete';;
import {
    AutocompletePage,
    Result
} from '../';



export class Main extends ___wml.AppView < AutocompletePage > {

    constructor(___context: AutocompletePage) {

        super(___context);

        this.template = (___view: ___wml.AppView < AutocompletePage > ) =>
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
                    'size': 6
                }
            }, [___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.text(`You selected: `), ___wml.node('b', {
                html: {},
                wml: {
                    'id': `selected`
                }
            }, [___wml.text(`(nothing)`)], ___view), ___wml.text(`.`)], ___view), ___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.widget(Autocomplete, {
                html: {},
                wml: {
                    'id': ___context.values.id
                },
                ww: {
                    'name': ___context.values.name,
                    'stringifier': (r: Result) => r.value,
                    'onSearch': ___context.onSearch,
                    'onSelect': ___context.onSelect
                }
            }, [], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}