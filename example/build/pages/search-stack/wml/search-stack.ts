import * as ___wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/wml-widgets/layout/grid/Grid';;
import {
    SearchStack
} from '@package/wml-widgets/control/search-stack/SearchStack';;
import {
    SearchStackPage,
    Result
} from '../';



export class Main extends ___wml.AppView < SearchStackPage > {

    constructor(___context: SearchStackPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < SearchStackPage > ) =>
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
                    'id': `text`
                }
            }, [___wml.domify(___context.values.text())], ___view), ___wml.text(`.`)], ___view), ___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.widget(SearchStack, {
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