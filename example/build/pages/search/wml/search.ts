import * as ___wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/self/layout/grid/Grid';;
import {
    Search
} from '@package/self/control/search/Search';;
import {
    SearchPage,
    Result
} from '../';



export class Main extends ___wml.AppView < SearchPage > {

    constructor(context: SearchPage) {

        super(context);

        this.template = (___context: SearchPage, ___view: ___wml.AppView < SearchPage > ) =>
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
            }, [___wml.widget(Search, {
                html: {},
                wml: {
                    'id': ___context.values.id
                },
                ww: {
                    'name': ___context.values.name,
                    'decorator': (r: Result) => r.value,
                    'onChange': ___context.onChange,
                    'onSelect': ___context.onSelect
                }
            }, [], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}